import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChatWidget from './ChatWidget';

const Layout = ({ children }) => {
    const { pathname } = useLocation();

    return (
        <div className="min-h-screen bg-brand-dark text-slate-200 selection:bg-brand-primary selection:text-white flex flex-col font-sans overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                        LATENT SPACE
                    </Link>
                    <div className="flex gap-8 text-sm font-medium text-slate-400">
                        <Link to="/" className={`hover:text-white transition-colors ${pathname === '/' ? 'text-white' : ''}`}>Home</Link>
                        <Link to="/patent-1" className={`hover:text-white transition-colors ${pathname === '/patent-1' ? 'text-white' : ''}`}>Holographic Interface</Link>
                        <Link to="/patent-2" className={`hover:text-white transition-colors ${pathname === '/patent-2' ? 'text-white' : ''}`}>Compute Optimization</Link>
                        <Link to="/contact" className={`hover:text-white transition-colors ${pathname === '/contact' ? 'text-white' : ''}`}>Contact</Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 bg-black/50">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Latent Space Innovations. All rights reserved.</p>
                    <p className="mt-2 text-xs">Protected by International Patent Law.</p>
                </div>
            </footer>

            {/* AI Widget */}
            <ChatWidget />
        </div>
    );
};

export default Layout;
