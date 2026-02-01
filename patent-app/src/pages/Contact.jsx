import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, ExternalLink } from 'lucide-react';

const Contact = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center"
            >
                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-brand-primary/25">
                    <Mail className="text-white" size={32} />
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
                <p className="text-slate-400 mb-8 text-lg">
                    Interested in licensing this technology or discussing collaboration opportunities? We'd love to hear from you.
                </p>

                <form className="space-y-4 text-left max-w-md mx-auto">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                        <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors h-32" placeholder="Tell us about your interest..." />
                    </div>
                    <button type="button" className="w-full bg-white text-brand-dark font-bold py-4 rounded-lg hover:bg-slate-200 transition-colors">
                        Send Message
                    </button>
                </form>

                <div className="mt-12 flex justify-center gap-6 text-sm text-slate-500">
                    <a href="#" className="hover:text-brand-primary flex items-center gap-1 transition-colors">Email Support <ExternalLink size={12} /></a>
                    <a href="#" className="hover:text-brand-primary flex items-center gap-1 transition-colors">Documentation <ExternalLink size={12} /></a>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
