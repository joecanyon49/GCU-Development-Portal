'use client';
// Force rebuild


import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Editor from '@/components/Editor';
import { Preview } from '@/components/Preview';
import { ProposalData, INITIAL_PROPOSAL_DATA } from '@/types/proposal';
import { X, Maximize, Printer, ArrowLeft } from 'lucide-react';

export default function ProposalBuilder() {
    const [data, setData] = useState<ProposalData>(INITIAL_PROPOSAL_DATA);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Scaling Logic
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const { clientWidth } = containerRef.current;
                const PREVIEW_WIDTH = 816; // Standard Letter Width
                const PADDING = 40;

                // If in full screen, we want it larger, but still fitting
                const availableWidth = clientWidth - PADDING;
                // Calculate scale based on width primarily
                let newScale = availableWidth / PREVIEW_WIDTH;

                // Cap scale at 1.5 to prevent pixelation, minimum 0.5
                newScale = Math.min(Math.max(newScale, 0.4), 1.5);

                setScale(newScale);
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);

        // Initial calc
        // Small delay to ensure layout is ready
        setTimeout(updateScale, 100);

        return () => observer.disconnect();
    }, [isFullScreen]);

    const handlePrint = () => {
        window.print();
    };

    // Placeholder AI
    const handleGenerateAI = async () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <div className="h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
            {/* Header - Hidden in Full Screen */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isFullScreen ? 'h-0 opacity-0' : 'h-16 opacity-100'} border-b border-white/10 flex items-center justify-between px-6 bg-card z-20`}>
                <div className="flex items-center gap-4">
                    <Link href="/tools" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="h-6 w-px bg-white/10"></div>
                    <div>
                        <h1 className="font-bold text-lg">Proposal Builder</h1>
                        {data.meta.preparedFor ? `${data.meta.preparedFor}` : 'New Project'}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gcu-purple hover:bg-gcu-purple-dark text-white text-sm font-bold transition-all shadow-lg shadow-gcu-purple/20">
                        <Printer size={16} /> Export PDF
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden relative">
                {/* Editor Panel */}
                <div className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isFullScreen ? 'w-0 opacity-0 -translate-x-full' : 'w-[450px] opacity-100 translate-x-0'} flex-shrink-0 border-r border-white/10 bg-[#111]`}>
                    <Editor
                        data={data}
                        onChange={setData}
                        onGenerateAI={handleGenerateAI} // Placeholder logic
                        isGenerating={isGenerating}
                    />
                </div>

                {/* Preview Area */}
                <div className="flex-1 bg-gray-900 flex flex-col relative overflow-hidden">
                    {/* Toolbar overlay */}
                    <div className="absolute top-4 right-6 z-50 flex items-center gap-2">
                        <button
                            onClick={() => setIsFullScreen(!isFullScreen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold transition-all border border-white/10 shadow-lg"
                        >
                            {isFullScreen ? (
                                <> <X size={14} /> Exit Presentation View </>
                            ) : (
                                <> <Maximize size={14} /> Full Screen View </>
                            )}
                        </button>
                    </div>

                    {/* Scalable Canvas Container */}
                    <div
                        ref={containerRef}
                        className={`flex-1 overflow-y-auto overflow-x-hidden p-8 flex justify-center bg-[#1a1a1a] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent print:p-0 print:block`}
                    >
                        <div
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: 'top center',
                                width: '816px', // Standard Width
                                minHeight: '100%',
                                transition: 'transform 0.2s ease-out',
                                marginBottom: '100px'
                            }}
                            className="print:transform-none print:w-full"
                        >
                            <Preview data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
