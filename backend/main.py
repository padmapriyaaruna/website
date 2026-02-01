import os
import shutil
from typing import List

# --- CHROMA DB / RENDER FIX ---
# Render's default SQLite is too old for Chroma.
# We override it with the binary we installed.
__import__('pysqlite3')
import sys
sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')
# ------------------------------

from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# LangChain / AI Imports
from langchain_groq import ChatGroq
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import RecursiveUrlLoader
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from bs4 import BeautifulSoup as Soup

# Load Environment Variables (PROD: Set these in Render Dashboard)
load_dotenv()

app = FastAPI(title="Patent RAG Chatbot API (Cloud)")

# CORS
# PROD_URL = "https://your-react-app.onrender.com"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
CHROMA_PATH = "chroma_db"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("WARNING: GROQ_API_KEY is missing. Chat will fail.")

# Initialize AI Components
# 1. LLM: Groq (Llama3-8b-8192 is free & fast)
llm = ChatGroq(
    temperature=0, 
    model_name="llama3-8b-8192", 
    api_key=GROQ_API_KEY
)

# 2. Embeddings: FastEmbed (Runs locally on CPU, no API key needed, lightweight)
embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")

# Global Retrieval Chain Placeholder
qa_chain = None

def get_qa_chain():
    """Lazily load the QA chain to ensure DB is ready."""
    global qa_chain
    if qa_chain is None and os.path.exists(CHROMA_PATH):
       vectorstore = Chroma(persist_directory=CHROMA_PATH, embedding_function=embeddings)
       retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
       
       prompt_template = """You are a helpful assistant for a patent website.
       Use the following pieces of context to answer the question at the end.
       If you don't know the answer, just say that you don't know, don't try to make up an answer.

       Context: {context}

       Question: {question}
       Answer:"""
       
       PROMPT = PromptTemplate(
           template=prompt_template, input_variables=["context", "question"]
       )

       qa_chain = RetrievalQA.from_chain_type(
           llm=llm,
           chain_type="stuff",
           retriever=retriever,
           chain_type_kwargs={"prompt": PROMPT}
       )
    return qa_chain


# --- Data Models ---
class CrawlRequest(BaseModel):
    url: str

class ChatRequest(BaseModel):
    query: str


# --- Endpoints ---

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Patent RAG Backend (Groq) is running"}

@app.post("/crawl")
async def crawl_and_index(request: CrawlRequest):
    global qa_chain
    url = request.url
    print(f"Starting crawl for: {url}")

    try:
        # 1. Load Data
        loader = RecursiveUrlLoader(
            url=url, 
            max_depth=2, 
            extractor=lambda x: Soup(x, "html.parser").text
        )
        data = loader.load()
        print(f"Loaded {len(data)} documents/pages.")

        # 2. Split Text
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_documents(data)
        print(f"Split into {len(chunks)} chunks.")

        # 3. Store in Vector DB (Chroma)
        if os.path.exists(CHROMA_PATH):
            shutil.rmtree(CHROMA_PATH)
        
        vectorstore = Chroma.from_documents(
            documents=chunks, 
            embedding=embeddings, 
            persist_directory=CHROMA_PATH
        )

        qa_chain = None
        get_qa_chain()

        return {"message": "Successfully indexed content", "chunks": len(chunks)}

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        chain = get_qa_chain()
        if not chain:
            raise HTTPException(status_code=400, detail="Knowledge base is empty. Please run /crawl first.")

        response = chain.invoke({"query": request.query})
        return {"answer": response["result"]}
        
    except Exception as e:
        print(f"Error in chat: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
