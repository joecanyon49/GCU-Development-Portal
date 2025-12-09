import React, { forwardRef } from 'react';
import { ProposalData, ProposalSection, CoverSection, ExecutiveSummarySection, ScopeOfWorkSection, TimelineSection, PricingSection, NextStepsSection } from '@/types/proposal';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface PreviewProps {
    data: ProposalData;
    className?: string;
}

// Standard US Letter width in pixels at 96 DPI
const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056;

// --- Section Components (Light Mode / Professional) ---

const Cover = ({ section, meta }: { section: CoverSection, meta: any, theme: any }) => (
    <div className="relative h-[1056px] w-full flex flex-col justify-between p-[60px] bg-white text-black overflow-hidden break-before-page">
        {/* Top Branding */}
        <div className="w-full flex justify-between items-start border-b-4 border-gcu-purple pb-6">
            <h2 className="text-xl font-bold tracking-widest uppercase text-gray-500">{meta.preparedBy}</h2>
            <div className="text-right">
                <p className="text-sm text-gray-400">{meta.date}</p>
            </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-8">
            <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-8 flex items-center justify-center">
                {/* Placeholder Image Logic */}
                <img
                    src={section.image}
                    alt="Cover"
                    className="w-full h-full object-cover grayscale opacity-80"
                />
            </div>

            <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-gcu-purple">Prepared For</p>
                <h1 className="text-6xl font-black text-black leading-tight">
                    {meta.preparedFor}
                </h1>
                <div className="w-24 h-2 bg-gcu-purple"></div>
                <h2 className="text-3xl text-gray-600 font-light">{section.title}</h2>
                <p className="text-lg text-gray-400">{section.subtitle}</p>
            </div>
        </div>

        {/* Footer */}
        <div className="w-full border-t border-gray-200 pt-6 flex justify-between items-center text-xs text-gray-400 uppercase tracking-wider">
            <span>Confidential</span>
            <span>{meta.preparedBy}</span>
        </div>
    </div>
);

const ExecutiveSummary = ({ section }: { section: ExecutiveSummarySection }) => (
    <div className="relative h-[1056px] w-full flex flex-col p-[60px] bg-white text-black break-before-page">
        <div className="mb-12 border-l-8 border-gcu-purple pl-6">
            <h2 className="text-4xl font-bold text-black uppercase tracking-tight">{section.title}</h2>
        </div>

        <div className="flex-1">
            <div className="text-xl leading-loose text-gray-700 font-serif text-justify p-8 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                {section.content}
            </div>

            {/* Visual Spacer/Placeholder */}
            <div className="mt-12 w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center border border-dashed border-gray-300">
                <span className="text-gray-400 font-medium uppercase tracking-widest">Supporting Graphic Placeholder</span>
            </div>
        </div>

        <div className="mt-auto pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
            Overview
        </div>
    </div>
);

const ScopeOfWork = ({ section }: { section: ScopeOfWorkSection }) => (
    <div className="relative h-[1056px] w-full flex flex-col p-[60px] bg-white text-black break-before-page">
        <div className="mb-12 flex items-center gap-4">
            <div className="w-12 h-12 bg-gcu-purple flex items-center justify-center text-white font-bold rounded-lg">01</div>
            <h2 className="text-3xl font-bold uppercase tracking-tight">{section.title}</h2>
        </div>

        <div className="flex-1 space-y-8">
            {section.elements.map((el, idx) => (
                <div key={idx} className="flex gap-6 p-6 hover:bg-gray-50 transition-colors rounded-xl border border-transparent hover:border-gray-100">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 font-bold text-xl">
                        {idx + 1}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gcu-purple mb-2">{el.title}</h3>
                        <p className="text-gray-600 mb-4">{el.description}</p>
                        <ul className="grid grid-cols-1 gap-2">
                            {el.items.map((item, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-500">
                                    <span className="mr-2 text-gcu-purple font-bold">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Fallback for Timeline (not in A.R. Mays but good to have)
const Timeline = ({ section }: { section: TimelineSection }) => (
    <div className="relative h-[1056px] w-full flex flex-col p-[60px] bg-white text-black break-before-page">
        <h2 className="text-3xl font-bold mb-12 border-b-2 border-gcu-purple pb-4 inline-block">{section.title}</h2>
        <div className="flex-1 border-l-2 border-gray-200 ml-4 space-y-12 py-4">
            {section.phases.map((phase, idx) => (
                <div key={idx} className="relative pl-12">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-gcu-purple"></div>
                    <div>
                        <span className="text-sm font-bold text-gcu-purple uppercase tracking-wider">{phase.duration}</span>
                        <h3 className="text-xl font-bold mb-1">{phase.name}</h3>
                        <p className="text-gray-500">{phase.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Pricing = ({ section }: { section: PricingSection }) => (
    <div className="relative h-[1056px] w-full flex flex-col p-[60px] bg-white text-black break-before-page">
        <div className="flex flex-col items-center justify-center flex-1 text-center">

            <div className="w-20 h-20 bg-gcu-purple rounded-full flex items-center justify-center text-white mb-8">
                <span className="text-3xl font-bold">$</span>
            </div>

            <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
            <div className="w-24 h-1 bg-gray-200 mb-12"></div>

            <div className="w-full max-w-2xl bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <tbody>
                        {section.elements.map((el, idx) => (
                            <tr key={idx} className={clsx("border-b border-gray-200 last:border-0", el.isTotal ? "bg-gcu-purple text-white" : "")}>
                                <td className={clsx("p-6 text-lg", el.isTotal ? "font-bold" : "font-medium")}>{el.item}</td>
                                <td className={clsx("p-6 text-right text-lg", el.isTotal ? "font-bold" : "font-mono text-gray-600")}>{el.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-12 text-gray-500 max-w-lg mx-auto">
                This investment will directly support student scholarships, academic programming, and university priorities.
            </p>
        </div>
    </div>
);

// Fallback
const NextSteps = ({ section }: { section: NextStepsSection }) => (
    <div className="min-h-[400px] flex flex-col justify-center items-center text-center p-[60px] bg-white text-black break-before-page">
        <h2 className="text-4xl font-bold mb-8">{section.title}</h2>
        <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 max-w-2xl">
            <p className="text-xl text-gray-700 mb-8">{section.content}</p>
            <button className="px-12 py-4 text-lg font-bold rounded-lg bg-gcu-purple text-white hover:bg-purple-800 transition shadow-lg">
                {section.ctaText}
            </button>
        </div>
    </div>
);

// --- Main Preview Component ---

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ data, className }, ref) => {
    return (
        <div
            ref={ref}
            className={twMerge("bg-white text-black font-sans shadow-2xl mx-auto origin-top print:shadow-none print:mx-0", className)}
            style={{
                width: `${PAGE_WIDTH}px`,
                minHeight: `${PAGE_HEIGHT}px`,
            }}
        >
            {/* Dynamic Section Rendering */}
            {data.sections.map((section, idx) => {
                switch (section.type) {
                    case 'cover': return <Cover key={section.id} section={section as CoverSection} meta={data.meta} theme={data.theme} />;
                    case 'executive_summary': return <ExecutiveSummary key={section.id} section={section as ExecutiveSummarySection} />;
                    case 'scope_of_work': return <ScopeOfWork key={section.id} section={section as ScopeOfWorkSection} />;
                    case 'timeline': return <Timeline key={section.id} section={section as TimelineSection} />;
                    case 'pricing': return <Pricing key={section.id} section={section as PricingSection} />;
                    case 'next_steps': return <NextSteps key={section.id} section={section as NextStepsSection} />;
                    default: return <div key={(section as any).id} className="p-10 text-red-500">Unknown Section Type: {(section as any).type}</div>;
                }
            })}

            <style jsx global>{`
                @media print {
                  @page {
                    size: 8.5in 11in;
                    margin: 0mm;
                  }
                  html, body {
                    height: 100%;
                    margin: 0 !important;
                    padding: 0 !important;
                    background-color: white !important;
                    -webkit-print-color-adjust: exact;
                  }
                }
            `}</style>
        </div>
    );
});

Preview.displayName = 'Preview';

export default Preview;
