import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import patent2Raw from '../assets/Patent2.txt?raw';

const Patent2 = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(patent2Raw);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            <Link to="/" className="inline-flex items-center text-sm text-brand-accent mb-8 hover:underline">
                <ChevronLeft size={16} /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-brand-accent/10 text-brand-accent">
                        <FileText size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Decentralized Compute Billing & Optimization</h1>
                        <p className="text-slate-400">Patent No. US-YYYYYYY • Filed 2024</p>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none bg-white/5 p-8 rounded-2xl border border-white/10">
                    <pre className="whitespace-pre-wrap font-sans text-slate-300 text-base leading-relaxed">
                        {content || "Loading patent content..."}
                    </pre>
                </div>
            </motion.div>
        </div>
    );
};

export default Patent2;
