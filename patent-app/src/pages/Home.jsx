import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Database, Brain, Globe } from 'lucide-react';

const Home = () => {
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-brand-primary text-xs font-semibold tracking-wider mb-6">
                            NEXT GEN AI INTERFACES
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                            Visualizing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Invisible</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Pioneering the future of high-dimensional data interaction and compute resource allocation through holographic interfaces and decentralized networks.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/patent-1" className="px-8 py-4 bg-brand-primary hover:bg-brand-blue-600 text-white rounded-lg font-medium transition-all hover:scale-105 flex items-center justify-center gap-2">
                                Explore Patent 1 <ChevronRight size={18} />
                            </Link>
                            <Link to="/patent-2" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all flex items-center justify-center">
                                Explore Patent 2
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-black/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-primary/50 transition-colors cursor-pointer"
                        >
                            <Link to="/patent-1" className="block h-full">
                                <div className="w-12 h-12 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                    <Brain size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Holographic Stewardship</h3>
                                <p className="text-slate-400">
                                    A revolutionary VR/AR interface for interacting with high-dimensional latent spaces, enabling intuitive data cleaning and stewardship beyond 2D limitations.
                                </p>
                                <div className="mt-6 flex items-center text-brand-primary font-medium text-sm group-hover:gap-2 transition-all">
                                    Read Abstract <ChevronRight size={16} />
                                </div>
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-accent/50 transition-colors cursor-pointer"
                        >
                            <Link to="/patent-2" className="block h-full">
                                <div className="w-12 h-12 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                    <Globe size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Decentralized Compute</h3>
                                <p className="text-slate-400">
                                    Optimizing computational resource allocation through a novel billing and distribution framework designed for the AI era.
                                </p>
                                <div className="mt-6 flex items-center text-brand-accent font-medium text-sm group-hover:gap-2 transition-all">
                                    Read Abstract <ChevronRight size={16} />
                                </div>
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
