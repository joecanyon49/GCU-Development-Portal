import Link from "next/link";
import { ArrowLeft, FileSpreadsheet, FileText, Download, ExternalLink, Calendar, ClipboardCheck, MapPin, Users, Bot, Sparkles, Wand2, Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function Tools() {
    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Advancement Tools & Forms</h1>
                    <p className="text-gray-400">Essential reports, spreadsheets, and request forms.</p>
                </div>
            </div>

            {/* Featured: Proposal Generator */}
            <div className="bg-gradient-to-br from-gcu-purple to-black border border-gcu-purple/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gcu-purple/20 text-gcu-purple-light text-sm font-medium mb-4 border border-gcu-purple/20">
                            <Sparkles size={14} />
                            <span>Available Now</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Proposal Generator</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl">
                            Automatically generate professional proposals for clients. Input key details and let AI craft the perfect pitch for GCU partnership.
                        </p>
                        <Link
                            href="/tools/proposal-builder"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/10 transition-all"
                        >
                            Open Generator <Wand2 size={18} />
                        </Link>
                    </div>
                    <div className="w-full md:w-1/3 aspect-video bg-black/20 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                        <FileText size={64} className="text-white/20" />
                    </div>
                </div>

                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gcu-purple/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            </div>

            {/* Pipeline GPT Section */}
            <div className="bg-gradient-to-br from-gcu-purple-dark/50 to-black border border-gcu-purple/20 rounded-3xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-gcu-purple/20 rounded-lg text-gcu-purple-light">
                                    <Bot size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Pipeline GPT</h2>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">New Tool: Pipeline AI</h3>
                                <p className="text-gray-300">
                                    Instantly locate and summarize donor records, understand donor motivations, and analyze portfolio progress using natural language.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                                        <CheckCircle size={16} className="text-gcu-purple-light" /> Donor Lookup
                                    </h4>
                                    <p className="text-xs text-gray-400 italic">"Is Robertson Auto Parts in the pipeline?"</p>
                                </div>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                                        <CheckCircle size={16} className="text-gcu-purple-light" /> Background Context
                                    </h4>
                                    <p className="text-xs text-gray-400 italic">"What does Jerry Kolowski do for work?"</p>
                                </div>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                                        <CheckCircle size={16} className="text-gcu-purple-light" /> Portfolio Analysis
                                    </h4>
                                    <p className="text-xs text-gray-400 italic">"How many Warm Leads does Sarah Lee manage?"</p>
                                </div>
                            </div>

                            <Link
                                href="https://chatgpt.com/g/g-68e8240ceae481919645e89d26dedb98-pipeline-ai"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                            >
                                Launch Pipeline GPT <ExternalLink size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gcu-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            </div>


            {/* Email Builder Section */}
            <div className="bg-card border border-card-border rounded-3xl p-8 relative overflow-hidden hover:border-gcu-purple/50 transition-all duration-300 group">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gcu-purple/20 text-gcu-purple-light text-sm font-medium mb-4 border border-gcu-purple/20">
                            <Mail size={14} />
                            <span>Available Now</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Meeting Brief Builder</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl">
                            Create perfectly formatted pre-meeting email briefs in seconds. Fill in the blanks, add attendees, and copy the result.
                        </p>
                        <Link
                            href="/tools/email-builder"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gcu-purple hover:bg-gcu-purple-light text-white font-bold transition-all shadow-lg shadow-gcu-purple/25"
                        >
                            Open Email Builder <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="w-full md:w-1/3 aspect-video bg-black/20 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                        <Mail size={64} className="text-gcu-purple-light" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Column 1: Sheets & Reports */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                            <FileSpreadsheet size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Sheets & Reports</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Stat Sheet */}
                        <Link
                            href="https://docs.google.com/spreadsheets/d/1MZ0AmontxOCn8Nt82UvrHf2c8rQNNOeVsVEQl-5IqaQ/edit?gid=0#gid=0"
                            target="_blank"
                            className="group block p-6 rounded-2xl bg-card border border-card-border hover:border-green-500/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-green-500/10 rounded-xl text-green-400 group-hover:scale-110 transition-transform">
                                    <FileSpreadsheet size={24} />
                                </div>
                                <ExternalLink size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Stat Sheet / QC Ledger</h3>
                            <p className="text-sm text-gray-400">Track quality contacts, metrics, and weekly stats.</p>
                        </Link>

                        {/* The Keys Download */}
                        {/* The Keys Link */}
                        <Link
                            href="https://gcumail-my.sharepoint.com/:x:/g/personal/konnor_bennett_gcu_edu/ETl969c60btGhLauzWh0QmIB0azqQuLNoBqDiQExQ5JsdA?e=e7Ec32"
                            target="_blank"
                            className="group block p-6 rounded-2xl bg-card border border-card-border hover:border-yellow-500/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-400 group-hover:scale-110 transition-transform">
                                    <ExternalLink size={24} />
                                </div>
                                <ExternalLink size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">The Keys (Password Sheet)</h3>
                            <p className="text-sm text-gray-400">View the master password reference sheet (SharePoint).</p>
                        </Link>

                        {/* NIL Projections Download */}
                        {/* NIL Projections Link */}
                        <Link
                            href="https://gcumail-my.sharepoint.com/:x:/r/personal/maysen_chelin_gcu_edu/Documents/NIL%20projections%202025.xlsx?d=w083130ab0cbd48118a1a48ed3e211565&csf=1&web=1&e=jG9pYA"
                            target="_blank"
                            className="group block p-6 rounded-2xl bg-card border border-card-border hover:border-blue-500/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                                    <ExternalLink size={24} />
                                </div>
                                <ExternalLink size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">NIL Projections 2025</h3>
                            <p className="text-sm text-gray-400">View the latest NIL financial projections (SharePoint).</p>
                        </Link>
                    </div>
                </section>

                {/* Column 2: Forms */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gcu-purple/20 rounded-lg text-gcu-purple-light">
                            <FileText size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Forms</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {/* QC Submission */}
                        <Link
                            href="https://forms.gle/iAMP1kJDJsBnZj6Y7"
                            target="_blank"
                            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border hover:bg-white/5 hover:border-gcu-purple/50 transition-all group"
                        >
                            <div className="p-2 bg-gcu-purple/10 rounded-lg text-gcu-purple-light">
                                <ClipboardCheck size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white group-hover:text-gcu-purple-light transition-colors">QC Submission Form</h3>
                                <p className="text-xs text-gray-400">Submit quality contacts.</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                        </Link>

                        {/* Golf Cart Reservation */}
                        <Link
                            href="https://form.asana.com/?k=jR61Fl-CGNGNpol&A&d=1108959473510111"
                            target="_blank"
                            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border hover:bg-white/5 hover:border-gcu-purple/50 transition-all group"
                        >
                            <div className="p-2 bg-gcu-purple/10 rounded-lg text-gcu-purple-light">
                                <Calendar size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white group-hover:text-gcu-purple-light transition-colors">Golf Cart Reservation</h3>
                                <p className="text-xs text-gray-400">Reserve a cart for campus tours.</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                        </Link>

                        {/* Tour Room Reservation */}
                        <Link
                            href="https://form.asana.com/?k=qCPdr8YU05H8d5&A&d=1108959473510111"
                            target="_blank"
                            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border hover:bg-white/5 hover:border-gcu-purple/50 transition-all group"
                        >
                            <div className="p-2 bg-gcu-purple/10 rounded-lg text-gcu-purple-light">
                                <MapPin size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white group-hover:text-gcu-purple-light transition-colors">Tour Room Reservation</h3>
                                <p className="text-xs text-gray-400">Book the tour room.</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                        </Link>

                        {/* Meeting Room Reservation */}
                        <Link
                            href="https://form.asana.com/?k=v0iTquxtvNF5NAx6hcC34g&d=1108959473510111"
                            target="_blank"
                            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border hover:bg-white/5 hover:border-gcu-purple/50 transition-all group"
                        >
                            <div className="p-2 bg-gcu-purple/10 rounded-lg text-gcu-purple-light">
                                <Users size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white group-hover:text-gcu-purple-light transition-colors">Meeting Room Reservation</h3>
                                <p className="text-xs text-gray-400">Reserve a conference room.</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                        </Link>

                        {/* Conference Request */}
                        <Link
                            href="https://form.asana.com/?k=lM2oRbNgEdpMNXj0Lyy5Eg&d=1108959473510111"
                            target="_blank"
                            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border hover:bg-white/5 hover:border-gcu-purple/50 transition-all group"
                        >
                            <div className="p-2 bg-gcu-purple/10 rounded-lg text-gcu-purple-light">
                                <Calendar size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white group-hover:text-gcu-purple-light transition-colors">Conference & Event Request</h3>
                                <p className="text-xs text-gray-400">Request support for events.</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                        </Link>

                        {/* Feedback & Ticketing */}
                        <Link
                            href="https://form.asana.com/?k=tSEse9ShZH6KgX-Lg0XBGw&d=1108959473510111"
                            target="_blank"
                            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border hover:bg-white/5 hover:border-gcu-purple/50 transition-all group"
                        >
                            <div className="p-2 bg-gcu-purple/10 rounded-lg text-gcu-purple-light">
                                <Bot size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white group-hover:text-gcu-purple-light transition-colors">Feedback & Ticketing</h3>
                                <p className="text-xs text-gray-400">Submit feedback or open a ticket for AI tools.</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
