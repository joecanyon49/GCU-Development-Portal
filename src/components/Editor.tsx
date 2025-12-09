import React from 'react';
import { ProposalData, ProposalSection, CoverSection, ExecutiveSummarySection } from '@/types/proposal';
import { Settings, Image, FileText, Plus, Trash2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface EditorProps {
    data: ProposalData;
    onChange: (data: ProposalData) => void;
    onGenerateAI: () => void;
    isGenerating: boolean;
}

export default function Editor({ data, onChange, onGenerateAI, isGenerating }: EditorProps) {

    const updateMeta = (field: string, value: string) => {
        onChange({
            ...data,
            meta: { ...data.meta, [field]: value }
        });
    };

    const updateSection = (id: string, updates: Partial<ProposalSection>) => {
        const newSections = data.sections.map(s =>
            s.id === id ? { ...s, ...updates } : s
        );
        // @ts-ignore - complex union type matching
        onChange({ ...data, sections: newSections });
    };

    return (
        <div className="h-full flex flex-col bg-gray-900 text-white overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex-shrink-0">
                <h2 className="text-xl font-bold mb-1">Editor</h2>
                <p className="text-xs text-gray-400">Customize your proposal content</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10">

                {/* 1. Global Metadata */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                        <Settings size={14} /> Global Settings
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Prepared For (Client)</label>
                            <input
                                type="text"
                                value={data.meta.preparedFor}
                                onChange={(e) => updateMeta('preparedFor', e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Prepared By (Team)</label>
                            <input
                                type="text"
                                value={data.meta.preparedBy}
                                onChange={(e) => updateMeta('preparedBy', e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-white/10" />

                {/* 2. Sections List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                            <FileText size={14} /> Sections
                        </h3>
                        {/* Future: Add Section Button */}
                    </div>

                    <div className="space-y-4">
                        {data.sections.map((section, idx) => (
                            <div key={section.id} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                                <div className="p-3 bg-white/5 flex items-center justify-between border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-gray-500 bg-black/30 px-1.5 py-0.5 rounded">{idx + 1}</span>
                                        <span className="text-sm font-medium">{section.type.replace('_', ' ').toUpperCase()}</span>
                                    </div>
                                    {/* Future: Collapse/Expand */}
                                </div>

                                <div className="p-4 space-y-4">
                                    {/* --- COVER EDITOR --- */}
                                    {section.type === 'cover' && (
                                        <>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                                                <input
                                                    type="text"
                                                    value={(section as CoverSection).title}
                                                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm bg-transparent border-b focus:border-purple-500 border-white/10 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Subtitle</label>
                                                <input
                                                    type="text"
                                                    value={(section as CoverSection).subtitle}
                                                    onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm bg-transparent border-b focus:border-purple-500 border-white/10 outline-none"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* --- EXEC SUMMARY EDITOR --- */}
                                    {section.type === 'executive_summary' && (
                                        <>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Section Title</label>
                                                <input
                                                    type="text"
                                                    value={(section as ExecutiveSummarySection).title}
                                                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm bg-transparent border-b focus:border-purple-500 border-white/10 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Content</label>
                                                <textarea
                                                    rows={6}
                                                    value={(section as ExecutiveSummarySection).content}
                                                    onChange={(e) => updateSection(section.id, { content: e.target.value })}
                                                    className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Fallback for other sections (just title for now to save space in this pass) */}
                                    {!['cover', 'executive_summary'].includes(section.type) && (
                                        <div className="text-xs text-gray-500 italic">
                                            Complex editor for {section.type} coming in next update.
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-white/10 flex-shrink-0">
                <button
                    onClick={onGenerateAI}
                    disabled={isGenerating}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                    <Sparkles size={16} className={isGenerating ? "animate-spin" : ""} />
                    {isGenerating ? "Magic Filling..." : "Auto-Fill with AI"}
                </button>
            </div>
        </div>
    );
}
