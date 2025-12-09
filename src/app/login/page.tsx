'use client';

import { login } from '../actions/auth';
import { useActionState } from 'react';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const initialState = {
    error: '',
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-card border border-card-border rounded-3xl p-8 shadow-2xl shadow-black/50"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gcu-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gcu-purple-light">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Enter your access code to continue.</p>
                    </div>

                    <form action={formAction} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Access Code"
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gcu-purple/50 transition-all"
                                />
                            </div>
                        </div>

                        {state?.error && (
                            <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                                {state.error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-gcu-purple hover:bg-gcu-purple-light text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-gcu-purple/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Enter Portal <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                <p className="text-center text-gray-500 text-sm mt-8">
                    Authorized Personnel Only &copy; {new Date().getFullYear()} GCU
                </p>
            </div>
        </div>
    );
}
