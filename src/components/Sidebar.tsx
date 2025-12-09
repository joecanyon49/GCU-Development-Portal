'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Info, Wrench, BookOpen, LayoutGrid, Menu, X, LogOut, Clock, Lock, Users } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../app/actions/auth';

const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Training', href: '/training', icon: BookOpen },
    { name: 'Contacts', href: '/contacts', icon: Users },
    { name: 'Tools', href: '/tools', icon: Wrench },
    { name: 'Workday', href: 'https://www.myworkday.com/wday/authgwy/gcu/login.htmld?returnTo=%2fgcu%2fd%2ftask%2f2998%242673.htmld', icon: Clock, external: true },
    { name: 'Asana', href: 'https://asana.com', icon: LayoutGrid, external: true },
    { name: 'About GCU Dev', href: '/about', icon: Info },
];

export default function Sidebar({ userName }: { userName?: string }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-gcu-purple rounded-lg md:hidden text-white shadow-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <AnimatePresence mode="wait">
                <motion.aside
                    initial={{ x: -300 }}
                    animate={{ x: isOpen ? 0 : 0 }} // Always visible on desktop, toggled on mobile
                    exit={{ x: -300 }}
                    className={clsx(
                        "fixed inset-y-0 left-0 z-40 w-64 bg-card/80 backdrop-blur-xl border-r border-card-border transform transition-transform duration-300 ease-in-out md:translate-x-0",
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex flex-col h-full p-6">
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-10 px-2">
                            <div className="w-10 h-10 bg-gcu-purple rounded-xl flex items-center justify-center shadow-lg shadow-gcu-purple/20 relative overflow-hidden shrink-0">
                                <Image
                                    src="/assets/gcu-icon-v2.png"
                                    alt="GCU Icon"
                                    fill
                                    className="object-contain p-1.5"
                                    priority
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white leading-tight">GCU Dev</h1>
                                <p className="text-xs text-gray-400">Portal</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className={clsx("flex-1 space-y-2", !userName && "opacity-50 pointer-events-none grayscale")}>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        className={clsx(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                            isActive
                                                ? "bg-gcu-purple text-white shadow-lg shadow-gcu-purple/25"
                                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon size={20} className={clsx("transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                                        <span className="font-medium relative z-10">{item.name}</span>

                                        {/* Active Indicator Glow */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 bg-gcu-purple rounded-xl -z-0"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Footer User Profile */}
                        <div className="mt-auto pt-6 border-t border-white/10">
                            <div className="flex items-center gap-3 px-2 mb-4">
                                <div className={clsx(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white",
                                    userName ? "bg-gradient-to-tr from-gcu-purple to-gcu-purple-light" : "bg-gray-700"
                                )}>
                                    {userName ? userName[0] : <Lock size={14} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">{userName ? `Hello, ${userName}` : 'Portal Locked'}</p>
                                    <p className="text-xs text-gray-500">{userName ? 'GCU Team' : 'Sign In Required'}</p>
                                </div>
                            </div>
                            {userName && (
                                <button
                                    onClick={() => logout()}
                                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                </motion.aside>
            </AnimatePresence>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
