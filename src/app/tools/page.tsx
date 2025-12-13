import Link from "next/link";
import { ArrowLeft, FileSpreadsheet, FileText, Download, ExternalLink, Calendar, ClipboardCheck, MapPin, Users, Bot, Sparkles, Wand2, Mail, ArrowRight, CheckCircle, LayoutGrid, Zap } from "lucide-react";

export default function Tools() {
    const mainTools = [
        {
            title: "Proposal Generator",
            description: "AI-powered proposal creation for partnerships.",
            icon: Wand2,
            href: "/tools/proposal-builder",
            color: "text-gcu-purple-light",
            bgColor: "bg-gcu-purple/20",
            borderColor: "hover:border-gcu-purple/50",
            status: "Available Now"
        },
        {
            title: "Pipeline GPT",
            description: "Analyze donors and portfolios with AI.",
            icon: Bot,
            href: "https://chatgpt.com/g/g-68e8240ceae481919645e89d26dedb98-pipeline-ai",
            external: true,
            color: "text-blue-400",
            bgColor: "bg-blue-500/20",
            borderColor: "hover:border-blue-500/50",
            status: "New Tool"
        },
        {
            title: "Meeting Brief Builder",
            description: "Create pre-meeting email briefs in seconds.",
            icon: Mail,
            href: "/tools/email-builder",
            color: "text-green-400",
            bgColor: "bg-green-500/20",
            borderColor: "hover:border-green-500/50",
            status: "Available Now"
        },
        {
            title: "Interactive Campus Map",
            description: "Explore the GCU masterplan in 3D.",
            icon: MapPin,
            href: "/tools/campus-map",
            color: "text-orange-400",
            bgColor: "bg-orange-500/20",
            borderColor: "hover:border-orange-500/50",
            status: "Beta"
        }
    ];

    const resources = [
        {
            title: "Stat Sheet / QC Ledger",
            description: "Track quality contacts & weekly stats.",
            href: "https://docs.google.com/spreadsheets/d/1MZ0AmontxOCn8Nt82UvrHf2c8rQNNOeVsVEQl-5IqaQ/edit?gid=0#gid=0",
            icon: FileSpreadsheet,
            color: "text-green-400",
            bgColor: "bg-green-500/10"
        },
        {
            title: "The Keys (Passwords)",
            description: "Master password reference sheet.",
            href: "https://gcumail-my.sharepoint.com/:x:/g/personal/konnor_bennett_gcu_edu/ETl969c60btGhLauzWh0QmIB0azqQuLNoBqDiQExQ5JsdA?e=e7Ec32",
            icon: Users, // Using Users as a placeholder for 'Keys' distinct icon if needed, or FileSpreadsheet
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10"
        },
        {
            title: "NIL Projections 2025",
            description: "Latest NIL financial data.",
            href: "https://gcumail-my.sharepoint.com/:x:/r/personal/maysen_chelin_gcu_edu/Documents/NIL%20projections%202025.xlsx?d=w083130ab0cbd48118a1a48ed3e211565&csf=1&web=1&e=jG9pYA",
            icon: FileSpreadsheet,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10"
        }
    ];

    const forms = [
        { title: "QC Submission", href: "https://forms.gle/iAMP1kJDJsBnZj6Y7", icon: ClipboardCheck },
        { title: "Golf Cart Reservation", href: "https://form.asana.com/?k=jR61Fl-CGNGNpol&A&d=1108959473510111", icon: Calendar },
        { title: "Tour Room Book", href: "https://form.asana.com/?k=qCPdr8YU05H8d5&A&d=1108959473510111", icon: MapPin },
        { title: "Meeting Room Book", href: "https://form.asana.com/?k=v0iTquxtvNF5NAx6hcC34g&d=1108959473510111", icon: Users },
        { title: "Conference Request", href: "https://form.asana.com/?k=lM2oRbNgEdpMNXj0Lyy5Eg&d=1108959473510111", icon: Calendar },
        { title: "Feedback & Ticketing", href: "https://form.asana.com/?k=tSEse9ShZH6KgX-Lg0XBGw&d=1108959473510111", icon: Bot },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5 hover:border-white/10">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Advancement Tools</h1>
                        <p className="text-gray-400 mt-1">Access your suite of development resources</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
                    <Zap size={14} className="text-yellow-400" />
                    <span>All systems operational</span>
                </div>
            </div>

            {/* Main Tools Grid */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mainTools.map((tool) => (
                        <Link
                            key={tool.title}
                            href={tool.href}
                            target={tool.external ? "_blank" : undefined}
                            className={`group relative p-6 rounded-3xl bg-card border border-card-border ${tool.borderColor} hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 flex flex-col h-full overflow-hidden`}
                        >
                            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500`}>
                                <tool.icon size={120} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-2xl ${tool.bgColor} ${tool.color}`}>
                                        <tool.icon size={24} />
                                    </div>
                                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-wider text-gray-400">
                                        {tool.status}
                                    </span>
                                </div>

                                <div className="mt-auto">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90">{tool.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">{tool.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Resources Column */}
                <section className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <LayoutGrid size={20} className="text-gcu-purple" />
                        Documents & Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resources.map((resource) => (
                            <Link
                                key={resource.title}
                                href={resource.href}
                                target="_blank"
                                className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-card-border hover:border-white/20 hover:bg-white/5 transition-all"
                            >
                                <div className={`p-3 rounded-xl ${resource.bgColor} ${resource.color} group-hover:scale-105 transition-transform`}>
                                    <resource.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-white group-hover:text-gray-200 transition-colors">{resource.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                                </div>
                                <ExternalLink size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Forms Column */}
                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ClipboardCheck size={20} className="text-blue-400" />
                        Quick Forms
                    </h2>
                    <div className="space-y-3">
                        {forms.map((form) => (
                            <Link
                                key={form.title}
                                href={form.href}
                                target="_blank"
                                className="group flex items-center gap-3 p-3 rounded-xl bg-card border border-transparent hover:bg-white/5 hover:border-white/10 transition-all"
                            >
                                <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-colors">
                                    <form.icon size={16} />
                                </div>
                                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors flex-1">{form.title}</span>
                                <ExternalLink size={14} className="text-gray-600 group-hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-all" />
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
