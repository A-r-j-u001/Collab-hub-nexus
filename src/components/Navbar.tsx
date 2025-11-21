import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { LogOut, Search, HardDrive } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                        <HardDrive className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        CollabHub
                    </span>
                </div>

                <div className="flex-1 max-w-md mx-8 hidden md:block">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search files..."
                            className="w-full bg-slate-800/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {user && (
                        <div className="flex items-center gap-3">
                            <img
                                src={user.picture}
                                alt={user.name}
                                className="w-8 h-8 rounded-full border-2 border-white/10"
                            />
                            <button
                                onClick={logout}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                                title="Sign out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
