'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ProposalData, INITIAL_PROPOSAL_DATA } from '@/types/proposal';
import { Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Dynamically import Preview to avoid SSR issues with localStorage if simpler
// But since we use useEffect, standard import is fine, but let's be safe for large components
import Preview from '@/components/Preview';

export default function ProposalViewPage() {
    const [data, setData] = useState<ProposalData>(INITIAL_PROPOSAL_DATA);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('current_proposal_preview');
        if (savedData) {
            try {
                setData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse proposal data", e);
            }
        }
        setLoaded(true);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (!loaded) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 print:bg-white">
            {/* Toolbar - Hidden when printing */}
            <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-50 print:hidden">
                <div className="flex items-center gap-4">
                    <Link href="/tools/proposal-builder" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
                        <ArrowLeft size={16} /> Back to Editor
                    </Link>
                    <span className="h-6 w-px bg-white/20"></span>
                    <h1 className="font-bold">{data.meta.title} - Preview</h1>
                </div>
                <button
                    onClick={handlePrint}
                    className="bg-gcu-purple hover:bg-gcu-purple-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors shadow-lg shadow-gcu-purple/20"
                >
                    <Printer size={18} /> Print / Save as PDF
                </button>
            </div>

            {/* Content Area */}
            <div className="pt-20 print:pt-0 flex justify-center pb-20 print:pb-0">
                <div className="print:w-full">
                    <Preview data={data} />
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                }
            `}</style>
        </div>
    );
}
