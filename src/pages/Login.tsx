import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { HardDrive, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
    const { login } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="glass-card p-8 md:p-12 max-w-md w-full mx-4 relative z-10 text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
                        <HardDrive className="w-12 h-12 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    CollabHub Nexus
                </h1>
                <p className="text-slate-400 mb-8 text-lg">
                    Secure, client-side file management powered by Google Drive.
                </p>

                <button
                    onClick={() => login()}
                    className="w-full py-4 px-6 bg-white text-slate-900 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-white/10"
                >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                    Sign in with Google
                    <ArrowRight className="w-5 h-5 ml-auto opacity-50" />
                </button>

                <p className="mt-6 text-sm text-slate-500">
                    By signing in, you agree to grant access to your Google Drive files for management within this app.
                </p>
            </div>
        </div>
    );
};
