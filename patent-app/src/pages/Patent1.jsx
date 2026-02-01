import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// In a real app, this would be imported or fetched
import patent1Raw from '../assets/Patent1.txt?raw';

const Patent1 = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        // Basic cleanup of raw text if needed
        setContent(patent1Raw);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            <Link to="/" className="inline-flex items-center text-sm text-brand-primary mb-8 hover:underline">
                <ChevronLeft size={16} /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-brand-primary/10 text-brand-primary">
                        <FileText size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Holographic Latent Space Stewardship Interface</h1>
                        <p className="text-slate-400">Patent No. US-XXXXXXX • Filed 2024</p>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none bg-white/5 p-8 rounded-2xl border border-white/10">
                    {/* 
              Rendering raw text preserving whitespace. 
              Ideally we'd build a markdown parser or section extractor here.
           */}
                    <pre className="whitespace-pre-wrap font-sans text-slate-300 text-base leading-relaxed">
                        {content || "Loading patent content..."}
                    </pre>
                </div>
            </motion.div>
        </div>
    );
};

export default Patent1;
