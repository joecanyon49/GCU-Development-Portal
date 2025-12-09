'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight, Menu, CheckCircle, Check } from 'lucide-react';
import { handbookContent } from './content';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function HandbookPage() {
    const [activeSection, setActiveSection] = useState(handbookContent[0].id);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [completedSections, setCompletedSections] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('gcu_handbook_progress');
        if (saved) {
            setCompletedSections(JSON.parse(saved));
        }
    }, []);

    const toggleSectionCompletion = (id: string) => {
        const newCompleted = completedSections.includes(id)
            ? completedSections.filter(s => s !== id)
            : [...completedSections, id];

        setCompletedSections(newCompleted);
        localStorage.setItem('gcu_handbook_progress', JSON.stringify(newCompleted));
    };

    const activeContent = handbookContent.find(c => c.id === activeSection) || handbookContent[0];
    const isComplete = completedSections.includes(activeSection);
    const progressPercentage = Math.round((completedSections.length / handbookContent.length) * 100);

    return (
        <div className="h-screen w-full overflow-hidden flex flex-col md:flex-row bg-background">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-card-border sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <Link href="/training" className="text-gray-400 hover:text-white">
                        <ArrowLeft size={20} />
                    </Link>
                    <span className="font-bold text-white">Handbook</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white bg-gcu-purple rounded-lg"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-10 w-64 bg-card border-r border-card-border transform transition-transform duration-300 md:relative md:translate-x-0 md:block",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 h-full overflow-y-auto custom-scrollbar">
                    <div className="mb-8 hidden md:block">
                        <Link href="/training" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4">
                            <ArrowLeft size={16} /> Back to Training
                        </Link>
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            <BookOpen size={24} className="text-gcu-purple-light" />
                            Handbook
                        </h1>
                        {mounted && (
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>{completedSections.length}/{handbookContent.length} Completed</span>
                                    <span>{progressPercentage}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gcu-purple transition-all duration-500 ease-out"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <nav className="space-y-1">
                        {handbookContent.map((section) => {
                            const isSectionComplete = completedSections.includes(section.id);
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={clsx(
                                        "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group relative",
                                        activeSection === section.id
                                            ? "bg-gcu-purple text-white shadow-lg shadow-gcu-purple/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <span className={clsx("truncate pr-6", isSectionComplete && "text-gcu-purple-light")}>
                                        {section.title}
                                    </span>
                                    <div className="absolute right-3 flex items-center">
                                        {isSectionComplete && mounted ? (
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                                <CheckCircle size={12} />
                                            </div>
                                        ) : (activeSection === section.id && <ChevronRight size={16} />)}
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto scroll-smooth p-6 md:p-12">
                <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-ul:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: activeContent.content }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Completion Toggle */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <button
                            onClick={() => toggleSectionCompletion(activeSection)}
                            className={clsx(
                                "w-full md:w-auto px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 mb-8",
                                isComplete
                                    ? "bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30"
                                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <div className={clsx(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                isComplete ? "border-green-400 bg-green-400 text-black" : "border-gray-500"
                            )}>
                                {isComplete && <Check size={14} strokeWidth={4} />}
                            </div>
                            {isComplete ? "Completed" : "Mark as Complete"}
                        </button>

                        <div className="flex justify-between items-center">
                            {(() => {
                                const currentIndex = handbookContent.findIndex(c => c.id === activeSection);
                                const prev = handbookContent[currentIndex - 1];
                                const next = handbookContent[currentIndex + 1];

                                return (
                                    <>
                                        {prev ? (
                                            <button
                                                onClick={() => setActiveSection(prev.id)}
                                                className="text-sm text-gray-400 hover:text-white flex items-center gap-2"
                                            >
                                                <ArrowLeft size={16} /> Previous: {prev.title}
                                            </button>
                                        ) : <div />}

                                        {next ? (
                                            <button
                                                onClick={() => {
                                                    // Optional: Auto-complete on next? Maybe better to let user decide.
                                                    setActiveSection(next.id);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="text-sm text-gcu-purple-light hover:text-white flex items-center gap-2 font-medium"
                                            >
                                                Next: {next.title} <ChevronRight size={16} />
                                            </button>
                                        ) : <div />}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </main>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-0 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
