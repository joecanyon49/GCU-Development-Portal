import React, { useState, useEffect } from 'react';
import { ProposalData, ProposalSection, CoverSection, SynopsisSection, StorySection, ProblemSection, ContentSection, ImpactSection, InvestmentSection } from '@/types/proposal';
import { Settings, Image as ImageIcon, FileText, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Palette, Share, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface EditorProps {
    data: ProposalData;
    onChange: (data: ProposalData) => void;
    onGenerateAI: () => void;
    isGenerating: boolean;
}

const ImagePicker = ({ value, onChange, label }: { value: string, onChange: (val: string) => void, label: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState<{ name: string, path: string }[]>([]);

    useEffect(() => {
        if (isOpen && images.length === 0) {
            fetch('/api/images')
                .then(res => res.json())
                .then(data => setImages(data.images || []))
                .catch(err => console.error("Failed to load images", err));
        }
    }, [isOpen]);

    return (
        <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-400">{label}</label>
            <div className="relative">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm flex items-center justify-between cursor-pointer hover:border-purple-500 transition-colors"
                >
                    <span className="truncate flex-1 text-gray-300">{value || "Select Image..."}</span>
                    <ChevronDown size={14} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-white/10 rounded-lg shadow-xl p-2 h-64 overflow-y-auto">
                        <div className="mb-2 p-2 border border-dashed border-gray-600 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-center group">
                            <label className="cursor-pointer block">
                                <span className="text-xs text-gray-400 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                                    <Plus size={14} /> Upload Image
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                onChange(reader.result as string);
                                                setIsOpen(false);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {images.map(img => (
                                <div
                                    key={img.path}
                                    onClick={() => { onChange(img.path); setIsOpen(false); }}
                                    className={`relative aspect-square rounded overflow-hidden cursor-pointer border-2 transition-all group ${value === img.path ? 'border-purple-500' : 'border-transparent hover:border-white/20'}`}
                                >
                                    <img src={img.path} className="w-full h-full object-cover" alt={img.name} />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                                        <p className="text-[10px] truncate text-white text-center">{img.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Editor({ data, onChange, onGenerateAI, isGenerating }: EditorProps) {
    const [activeTab, setActiveTab] = useState<'content' | 'theme'>('content');

    const updateMeta = (field: string, value: string) => {
        onChange({
            ...data,
            meta: { ...data.meta, [field]: value }
        });
    };

    const updateTheme = (field: string, value: string | number) => {
        onChange({
            ...data,
            theme: { ...data.theme, [field]: value }
        });
    };

    const updateSection = (id: string, updates: Partial<ProposalSection>) => {
        const newSections = data.sections.map(s =>
            s.id === id ? { ...s, ...updates } : s
        );
        // @ts-ignore
        onChange({ ...data, sections: newSections });
    };

    const handleViewMode = () => {
        localStorage.setItem('current_proposal_preview', JSON.stringify(data));
        window.open('/tools/proposal-builder/view', '_blank');
    };

    return (
        <div className="h-full flex flex-col bg-gray-900 text-white overflow-hidden border-r border-white/10 font-sans">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex-shrink-0 bg-gray-900/95 backdrop-blur-md z-10">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Proposal Builder</h2>
                        <p className="text-xs text-gray-400 mt-1">Status: <span className="text-green-400">Active</span></p>
                    </div>
                </div>

                <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5">
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${activeTab === 'content' ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                    >
                        <FileText size={14} /> Content
                    </button>
                    <button
                        onClick={() => setActiveTab('theme')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${activeTab === 'theme' ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                    >
                        <Palette size={14} /> Design
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-32">

                {activeTab === 'theme' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 border-b border-white/10 pb-2">
                                <Palette size={14} /> Color Architecture
                            </h3>

                            <div className="space-y-6 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                {/* Primary Color Control */}
                                <div className="group">
                                    <label className="block text-xs font-medium text-gray-400 mb-3 group-hover:text-white transition-colors flex justify-between">
                                        Primary Color
                                        <span className="text-[10px] text-gray-500 font-normal">Main headers & accents</span>
                                    </label>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {[
                                            { name: 'GCU Purple', value: '#522398' },
                                            { name: 'Mission Black', value: '#1a1a1a' },
                                            { name: 'Canyon Red', value: '#b30000' },
                                            { name: 'Lope Blue', value: '#003366' },
                                            { name: 'Slate', value: '#334155' }
                                        ].map((color) => (
                                            <button
                                                key={color.value}
                                                onClick={() => updateTheme('primaryColor', color.value)}
                                                className="w-8 h-8 rounded-full border border-white/10 hover:scale-110 transition-transform shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none relative group/tooltip"
                                                style={{ backgroundColor: color.value }}
                                                title={color.name}
                                            >
                                                {data.theme.primaryColor.toLowerCase() === color.value.toLowerCase() && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 items-center bg-black/20 p-2 rounded-lg border border-white/5">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-purple-500 transition-all shadow-lg shrink-0">
                                            <input
                                                type="color"
                                                value={data.theme.primaryColor}
                                                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                                                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-none"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={data.theme.primaryColor}
                                                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                                                className="w-full bg-transparent border-none text-sm font-mono uppercase focus:ring-0 text-white placeholder-gray-600 p-0"
                                                placeholder="#HEX"
                                            />
                                            <p className="text-[10px] text-gray-500">Custom Hex Code</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Color Control */}
                                <div className="group border-t border-white/5 pt-6">
                                    <label className="block text-xs font-medium text-gray-400 mb-3 group-hover:text-white transition-colors flex justify-between">
                                        Secondary Color
                                        <span className="text-[10px] text-gray-500 font-normal">Details & highlights</span>
                                    </label>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {[
                                            { name: 'GCU Secondary', value: '#7a4bc8' },
                                            { name: 'Gold', value: '#ffd700' },
                                            { name: 'Cool Gray', value: '#94a3b8' },
                                            { name: 'White', value: '#ffffff' },
                                            { name: 'Black', value: '#000000' }
                                        ].map((color) => (
                                            <button
                                                key={color.value}
                                                onClick={() => updateTheme('secondaryColor', color.value)}
                                                className="w-8 h-8 rounded-full border border-white/10 hover:scale-110 transition-transform shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none relative"
                                                style={{ backgroundColor: color.value }}
                                                title={color.name}
                                            >
                                                {data.theme.secondaryColor.toLowerCase() === color.value.toLowerCase() && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className={`w-2 h-2 rounded-full shadow-sm ${color.value === '#ffffff' ? 'bg-black' : 'bg-white'}`} />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 items-center bg-black/20 p-2 rounded-lg border border-white/5">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-purple-500 transition-all shadow-lg shrink-0">
                                            <input
                                                type="color"
                                                value={data.theme.secondaryColor}
                                                onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                                                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-none"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={data.theme.secondaryColor}
                                                onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                                                className="w-full bg-transparent border-none text-sm font-mono uppercase focus:ring-0 text-white placeholder-gray-600 p-0"
                                                placeholder="#HEX"
                                            />
                                            <p className="text-[10px] text-gray-500">Custom Hex Code</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text Color Control */}
                            <div className="group border-t border-white/5 pt-6">
                                <label className="block text-xs font-medium text-gray-400 mb-3 group-hover:text-white transition-colors flex justify-between">
                                    Text Color
                                    <span className="text-[10px] text-gray-500 font-normal">Base typography</span>
                                </label>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {[
                                        { name: 'Black', value: '#000000' },
                                        { name: 'Dark Gray', value: '#1f2937' },
                                        { name: 'GCU Purple', value: '#502888' },
                                        { name: 'White', value: '#ffffff' }
                                    ].map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() => updateTheme('textColor', color.value)}
                                            className="w-8 h-8 rounded-full border border-white/10 hover:scale-110 transition-transform shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none relative"
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        >
                                            {data.theme.textColor?.toLowerCase() === color.value.toLowerCase() && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className={`w-2 h-2 rounded-full shadow-sm ${color.value === '#ffffff' ? 'bg-black' : 'bg-white'}`} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-3 items-center bg-black/20 p-2 rounded-lg border border-white/5">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-purple-500 transition-all shadow-lg shrink-0">
                                        <input
                                            type="color"
                                            value={data.theme.textColor || '#000000'}
                                            onChange={(e) => updateTheme('textColor', e.target.value)}
                                            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-none"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={data.theme.textColor || '#000000'}
                                            onChange={(e) => updateTheme('textColor', e.target.value)}
                                            className="w-full bg-transparent border-none text-sm font-mono uppercase focus:ring-0 text-white placeholder-gray-600 p-0"
                                            placeholder="#HEX"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Background Color Control */}
                            <div className="group border-t border-white/5 pt-6">
                                <label className="block text-xs font-medium text-gray-400 mb-3 group-hover:text-white transition-colors flex justify-between">
                                    Background Color
                                    <span className="text-[10px] text-gray-500 font-normal">Page background</span>
                                </label>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {[
                                        { name: 'White', value: '#ffffff' },
                                        { name: 'Paper', value: '#f9fafb' },
                                        { name: 'Warm', value: '#fffbeb' },
                                        { name: 'Dark', value: '#18181b' },
                                        { name: 'Black', value: '#000000' }
                                    ].map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() => updateTheme('backgroundColor', color.value)}
                                            className="w-8 h-8 rounded-full border border-white/10 hover:scale-110 transition-transform shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none relative"
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        >
                                            {data.theme.backgroundColor?.toLowerCase() === color.value.toLowerCase() && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className={`w-2 h-2 rounded-full shadow-sm ${color.value === '#ffffff' ? 'bg-black' : 'bg-white'}`} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-3 items-center bg-black/20 p-2 rounded-lg border border-white/5">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-purple-500 transition-all shadow-lg shrink-0">
                                        <input
                                            type="color"
                                            value={data.theme.backgroundColor || '#ffffff'}
                                            onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                                            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-none"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={data.theme.backgroundColor || '#ffffff'}
                                            onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                                            className="w-full bg-transparent border-none text-sm font-mono uppercase focus:ring-0 text-white placeholder-gray-600 p-0"
                                            placeholder="#HEX"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 border-b border-white/10 pb-2">
                                <ImageIcon size={14} /> Visual Intensity
                            </h3>

                            <div className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-3 flex justify-between items-center">
                                        <span>Cover Overlay Opacity</span>
                                        <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px] font-mono">{Math.round((data.theme.overlayOpacity || 0.9) * 100)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={data.theme.overlayOpacity || 0.9}
                                        onChange={(e) => updateTheme('overlayOpacity', parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
                                        <span>Light</span>
                                        <span>Dark</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                        {/* 1. Global Metadata */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 border-b border-white/10 pb-2">
                                <Settings size={14} /> Proposal Metadata
                            </h3>
                            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-4 rounded-xl border border-purple-500/30 shadow-lg">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-3 flex items-center gap-2">
                                    <ImageIcon size={14} /> Client Logo
                                </h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-black/40 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                                        {data.meta.clientLogo ? (
                                            <img src={data.meta.clientLogo} alt="Client Logo" className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon size={20} className="text-gray-600 mx-auto mb-1" />
                                                <span className="text-[9px] text-gray-600 block">No Logo</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-all border border-white/5 hover:border-white/20 inline-flex items-center gap-2 mb-2 group">
                                            <span>Upload Image</span>
                                            <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            updateMeta('clientLogo', reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                        </label>
                                        <p className="text-[10px] text-gray-400 leading-tight">
                                            Upload the logo of the company you are proposing to.
                                            <br /><span className="text-gray-500">Best results: Transparent PNG</span>
                                        </p>
                                    </div>
                                    {data.meta.clientLogo && (
                                        <button
                                            onClick={() => updateMeta('clientLogo', '')}
                                            className="text-gray-500 hover:text-red-400 p-2 transition-colors"
                                            title="Remove Logo"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="group">
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 group-hover:text-purple-400 transition-colors">Client Name</label>
                                    <input
                                        type="text"
                                        value={data.meta.preparedFor}
                                        onChange={(e) => updateMeta('preparedFor', e.target.value)}
                                        placeholder="e.g. Acme Corp"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 focus:outline-none transition-all placeholder:text-gray-600"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5 group-hover:text-purple-400 transition-colors">Prepared By</label>
                                    <input
                                        type="text"
                                        value={data.meta.preparedBy}
                                        onChange={(e) => updateMeta('preparedBy', e.target.value)}
                                        placeholder="e.g. GCU Advancement"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 focus:outline-none transition-all placeholder:text-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Sections List */}
                        <div className="space-y-5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 border-b border-white/10 pb-2">
                                <FileText size={14} /> Content Sections
                            </h3>

                            <div className="space-y-6">
                                {data.sections.map((section, idx) => (
                                    <div key={section.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden shadow-lg transition-all hover:border-white/20">
                                        <div className="px-4 py-3 bg-white/5 flex items-center justify-between border-b border-white/5 backdrop-blur-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                                                    {idx + 1}
                                                </div>
                                                <span className="text-xs font-bold tracking-wide text-gray-200">{section.type.replace('_', ' ').toUpperCase()}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 space-y-5">
                                            {/* --- COVER EDITOR --- */}
                                            {section.type === 'cover' && (
                                                <>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Title</label>
                                                        <input
                                                            type="text"
                                                            value={(section as CoverSection).title}
                                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Subtitle</label>
                                                        <input
                                                            type="text"
                                                            value={(section as CoverSection).subtitle}
                                                            onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                    <ImagePicker
                                                        label="Background Image"
                                                        value={(section as CoverSection).image || ''}
                                                        onChange={(val) => updateSection(section.id, { image: val })}
                                                    />
                                                </>
                                            )}

                                            {/* --- SYNOPSIS EDITOR --- */}
                                            {section.type === 'synopsis' && (
                                                <>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Section Title</label>
                                                        <input
                                                            type="text"
                                                            value={(section as SynopsisSection).title}
                                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Content</label>
                                                        <textarea
                                                            rows={6}
                                                            value={(section as SynopsisSection).content}
                                                            onChange={(e) => updateSection(section.id, { content: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all active:ring-1 active:ring-purple-500/50"
                                                        />
                                                    </div>
                                                    <ImagePicker
                                                        label="Side Image"
                                                        value={(section as SynopsisSection).image || ''}
                                                        onChange={(val) => updateSection(section.id, { image: val })}
                                                    />

                                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                                                            <Sparkles size={12} /> Key Pillars
                                                        </h4>
                                                        {((section as SynopsisSection).summaryPillars || []).map((pillar, pIdx) => (
                                                            <div key={pIdx} className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-3 hover:border-white/10 transition-colors">
                                                                <input
                                                                    type="text"
                                                                    value={pillar.title}
                                                                    onChange={(e) => {
                                                                        const newPillars = [...((section as SynopsisSection).summaryPillars || [])];
                                                                        newPillars[pIdx] = { ...newPillars[pIdx], title: e.target.value };
                                                                        updateSection(section.id, { summaryPillars: newPillars });
                                                                    }}
                                                                    className="w-full bg-transparent border-b border-white/10 focus:border-purple-500 outline-none text-sm font-bold pb-1"
                                                                    placeholder="Pillar Title"
                                                                />
                                                                <textarea
                                                                    value={pillar.description}
                                                                    onChange={(e) => {
                                                                        const newPillars = [...((section as SynopsisSection).summaryPillars || [])];
                                                                        newPillars[pIdx] = { ...newPillars[pIdx], description: e.target.value };
                                                                        updateSection(section.id, { summaryPillars: newPillars });
                                                                    }}
                                                                    rows={2}
                                                                    className="w-full bg-transparent border-none outline-none text-xs text-gray-400 resize-none hover:text-gray-300 transition-colors"
                                                                    placeholder="Pillar Description"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}

                                            {/* --- STORY EDITOR --- */}
                                            {section.type === 'story' && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Title</label>
                                                        <input
                                                            type="text"
                                                            value={(section as StorySection).title}
                                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Subtitle</label>
                                                        <input
                                                            type="text"
                                                            value={(section as StorySection).subtitle || ''}
                                                            onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Content</label>
                                                        <textarea
                                                            rows={6}
                                                            value={(section as StorySection).content}
                                                            onChange={(e) => updateSection(section.id, { content: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all active:ring-1 active:ring-purple-500/50"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Quote / Overlay Text</label>
                                                        <input
                                                            type="text"
                                                            value={(section as StorySection).quote || ''}
                                                            onChange={(e) => updateSection(section.id, { quote: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                    <ImagePicker
                                                        label="Featured Image"
                                                        value={(section as StorySection).image || ''}
                                                        onChange={(val) => updateSection(section.id, { image: val })}
                                                    />
                                                </div>
                                            )}

                                            {/* --- PROBLEM EDITOR --- */}
                                            {section.type === 'problem' && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Section Title</label>
                                                        <input
                                                            type="text"
                                                            value={(section as ProblemSection).title}
                                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Problem Description</label>
                                                        <textarea
                                                            rows={3}
                                                            value={(section as ProblemSection).description}
                                                            onChange={(e) => updateSection(section.id, { description: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all active:ring-1 active:ring-purple-500/50"
                                                        />
                                                    </div>

                                                    <div className="space-y-4">
                                                        {(section as ProblemSection).points.map((point, pIdx) => (
                                                            <div key={pIdx} className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-3 hover:border-white/10 transition-colors">
                                                                <input
                                                                    type="text"
                                                                    value={point.title}
                                                                    onChange={(e) => {
                                                                        const newPoints = [...(section as ProblemSection).points];
                                                                        newPoints[pIdx] = { ...newPoints[pIdx], title: e.target.value };
                                                                        updateSection(section.id, { points: newPoints });
                                                                    }}
                                                                    className="w-full bg-transparent border-b border-white/10 focus:border-purple-500 outline-none text-sm font-bold pb-1"
                                                                    placeholder="Point Title"
                                                                />
                                                                <textarea
                                                                    value={point.description}
                                                                    onChange={(e) => {
                                                                        const newPoints = [...(section as ProblemSection).points];
                                                                        newPoints[pIdx] = { ...newPoints[pIdx], description: e.target.value };
                                                                        updateSection(section.id, { points: newPoints });
                                                                    }}
                                                                    rows={2}
                                                                    className="w-full bg-transparent border-none outline-none text-xs text-gray-400 resize-none hover:text-gray-300 transition-colors"
                                                                    placeholder="Point Description"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* --- SCOPE OF WORK (CONTENT) EDITOR --- */}
                                            {section.type === 'content' && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Section Title</label>
                                                        <input
                                                            type="text"
                                                            value={(section as ContentSection).title}
                                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                    <ImagePicker
                                                        label="Side Image"
                                                        value={(section as ContentSection).image || ''}
                                                        onChange={(val) => updateSection(section.id, { image: val })}
                                                    />

                                                    <div className="space-y-4">
                                                        {(section as ContentSection).elements.map((el, elIdx) => (
                                                            <div key={elIdx} className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-3 hover:border-white/10 transition-colors">
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex-1 mr-2">
                                                                        <input
                                                                            type="text"
                                                                            value={el.title}
                                                                            onChange={(e) => {
                                                                                const newElements = [...(section as ContentSection).elements];
                                                                                newElements[elIdx] = { ...newElements[elIdx], title: e.target.value };
                                                                                updateSection(section.id, { elements: newElements });
                                                                            }}
                                                                            className="w-full bg-transparent border-b border-white/10 focus:border-purple-500 outline-none text-sm font-bold text-white mb-2 pb-1"
                                                                            placeholder="Deliverable Title"
                                                                        />
                                                                        <textarea
                                                                            value={el.description}
                                                                            onChange={(e) => {
                                                                                const newElements = [...(section as ContentSection).elements];
                                                                                newElements[elIdx] = { ...newElements[elIdx], description: e.target.value };
                                                                                updateSection(section.id, { elements: newElements });
                                                                            }}
                                                                            rows={2}
                                                                            className="w-full bg-transparent border-b border-white/10 focus:border-purple-500 outline-none text-xs text-gray-400 resize-none hover:text-gray-300 transition-colors"
                                                                            placeholder="Deliverable Description"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-2 pl-4 border-l-2 border-white/10">
                                                                    {el.items.map((item, itemIdx) => (
                                                                        <div key={itemIdx} className="flex gap-2 items-center group">
                                                                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
                                                                            <input
                                                                                type="text"
                                                                                value={item}
                                                                                onChange={(e) => {
                                                                                    const newElements = [...(section as ContentSection).elements];
                                                                                    const newItems = [...newElements[elIdx].items];
                                                                                    newItems[itemIdx] = e.target.value;
                                                                                    newElements[elIdx] = { ...newElements[elIdx], items: newItems };
                                                                                    updateSection(section.id, { elements: newElements });
                                                                                }}
                                                                                className="flex-1 bg-transparent border-none outline-none text-xs text-gray-300 focus:text-white transition-colors"
                                                                            />
                                                                            <button
                                                                                onClick={() => {
                                                                                    const newElements = [...(section as ContentSection).elements];
                                                                                    const newItems = newElements[elIdx].items.filter((_, i) => i !== itemIdx);
                                                                                    newElements[elIdx] = { ...newElements[elIdx], items: newItems };
                                                                                    updateSection(section.id, { elements: newElements });
                                                                                }}
                                                                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-1 transition-opacity"
                                                                            >
                                                                                <Trash2 size={12} />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button
                                                                        onClick={() => {
                                                                            const newElements = [...(section as ContentSection).elements];
                                                                            newElements[elIdx] = { ...newElements[elIdx], items: [...newElements[elIdx].items, "New Item"] };
                                                                            updateSection(section.id, { elements: newElements });
                                                                        }}
                                                                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-3 font-medium transition-colors"
                                                                    >
                                                                        <Plus size={12} /> Add Item
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}



                                            {/* --- IMPACT (STATS) EDITOR --- */}
                                            {section.type === 'impact' && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Section Title</label>
                                                        <input
                                                            type="text"
                                                            value={(section as ImpactSection).title}
                                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4">
                                                        {(section as ImpactSection).stats.map((stat, sIdx) => (
                                                            <div key={sIdx} className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-3 relative group">
                                                                <button
                                                                    onClick={() => {
                                                                        const newStats = [...(section as ImpactSection).stats];
                                                                        newStats.splice(sIdx, 1);
                                                                        updateSection(section.id, { stats: newStats });
                                                                    }}
                                                                    className="absolute top-2 right-2 p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                                                >
                                                                    <Trash2 size={12} />
                                                                </button>

                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <div>
                                                                        <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Value</label>
                                                                        <div className="flex items-center gap-1">
                                                                            <input
                                                                                type="text"
                                                                                value={stat.value}
                                                                                onChange={(e) => {
                                                                                    const newStats = [...(section as ImpactSection).stats];
                                                                                    newStats[sIdx] = { ...newStats[sIdx], value: e.target.value };
                                                                                    updateSection(section.id, { stats: newStats });
                                                                                }}
                                                                                className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-sm font-mono text-white focus:border-purple-500 outline-none"
                                                                                placeholder="100"
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                value={stat.suffix || ''}
                                                                                onChange={(e) => {
                                                                                    const newStats = [...(section as ImpactSection).stats];
                                                                                    newStats[sIdx] = { ...newStats[sIdx], suffix: e.target.value };
                                                                                    updateSection(section.id, { stats: newStats });
                                                                                }}
                                                                                className="w-12 bg-black/30 border border-white/10 rounded px-2 py-1.5 text-sm font-mono text-gray-400 focus:border-purple-500 outline-none"
                                                                                placeholder="%"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Label</label>
                                                                        <input
                                                                            type="text"
                                                                            value={stat.label}
                                                                            onChange={(e) => {
                                                                                const newStats = [...(section as ImpactSection).stats];
                                                                                newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                                                                                updateSection(section.id, { stats: newStats });
                                                                            }}
                                                                            className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-purple-500 outline-none"
                                                                            placeholder="Stat Label"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Description</label>
                                                                    <input
                                                                        type="text"
                                                                        value={stat.description || ''}
                                                                        onChange={(e) => {
                                                                            const newStats = [...(section as ImpactSection).stats];
                                                                            newStats[sIdx] = { ...newStats[sIdx], description: e.target.value };
                                                                            updateSection(section.id, { stats: newStats });
                                                                        }}
                                                                        className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-300 focus:border-purple-500 outline-none"
                                                                        placeholder="Optional description"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => {
                                                                const newStats = [...(section as ImpactSection).stats, { label: "New Stat", value: "0", suffix: "" }];
                                                                updateSection(section.id, { stats: newStats });
                                                            }}
                                                            className="flex items-center justify-center gap-2 py-3 border border-dashed border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                                                        >
                                                            <Plus size={12} /> Add Statistic
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* --- INVESTMENT (PRICING) EDITOR --- */}
                                            {section.type === 'investment' && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Section Title</label>
                                                        <input
                                                            type="text"
                                                            value={(section as InvestmentSection).title}
                                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none transition-all"
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        {(section as InvestmentSection).elements.map((el, idx) => (
                                                            <div key={idx} className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all">
                                                                <div className="flex-1">
                                                                    <input
                                                                        type="text"
                                                                        value={el.item}
                                                                        onChange={(e) => {
                                                                            const newElements = [...(section as InvestmentSection).elements];
                                                                            newElements[idx] = { ...newElements[idx], item: e.target.value };
                                                                            updateSection(section.id, { elements: newElements });
                                                                        }}
                                                                        className="w-full bg-transparent outline-none text-sm text-white font-medium placeholder:text-gray-600"
                                                                        placeholder="Item Description"
                                                                    />
                                                                </div>
                                                                <div className="w-24">
                                                                    <input
                                                                        type="text"
                                                                        value={el.cost}
                                                                        onChange={(e) => {
                                                                            const newElements = [...(section as InvestmentSection).elements];
                                                                            newElements[idx] = { ...newElements[idx], cost: e.target.value };
                                                                            updateSection(section.id, { elements: newElements });
                                                                        }}
                                                                        className="w-full bg-transparent outline-none text-sm text-right text-purple-300 font-mono focus:text-purple-200"
                                                                        placeholder="$0.00"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-white/10 flex-shrink-0 bg-gray-900 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <button
                    onClick={onGenerateAI}
                    disabled={isGenerating}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                    <Sparkles size={16} className={isGenerating ? "animate-spin" : ""} />
                    {isGenerating ? "Magic Filling..." : "Auto-Fill with AI"}
                </button>
            </div>
        </div >
    );
}
