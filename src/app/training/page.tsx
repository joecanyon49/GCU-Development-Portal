import Link from "next/link";
import { ArrowLeft, MessageSquare, Mic, FileText, ExternalLink, Play, BookOpen, CheckCircle } from "lucide-react";
import { cookies } from 'next/headers';
import TrainingProgress from '@/components/TrainingProgress';

export default async function Training() {
    const cookieStore = await cookies();
    const userName = cookieStore.get('auth_user')?.value;

    return (
        <div className="space-y-16 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Development Training & Tools</h1>
                    <p className="text-gray-400">AI-powered simulations and resources for advancement officers.</p>
                </div>
            </div>

            {/* Section 1: Onboarding Training */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                        <BookOpen size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Onboarding Training</h2>
                </div>

                <div className="bg-card border border-card-border rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">GCU Development Handbook</h3>
                            <p className="text-gray-400 mb-6">
                                The comprehensive guide for all advancement officers. Includes policies, procedures, and best practices for fundraising at GCU.
                            </p>
                            <TrainingProgress />
                            <div className="h-4"></div>
                            <Link
                                href="/training/handbook"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition-colors"
                            >
                                Open Handbook <BookOpen size={18} />
                            </Link>
                        </div>
                        <div className="w-full md:w-1/3 aspect-video bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20">
                            <BookOpen size={48} className="text-yellow-500" />
                        </div>
                    </div>
                </div>
            </section>



            {/* Section 3: Simulation Suite */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <MessageSquare size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Training Simulation Suite</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* MTA Card */}
                    <div className="group bg-card border border-card-border rounded-2xl p-6 hover:border-gcu-purple/50 transition-all duration-300 flex flex-col">
                        <div className="mb-4 p-3 bg-gcu-purple/10 rounded-xl w-fit text-gcu-purple-light group-hover:scale-110 transition-transform">
                            <Mic size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Make The Ask (MTA)</h3>
                        <p className="text-sm text-gray-400 mb-6 flex-1">
                            Practice delivering a confident, 60-second donor ask that demonstrates rapport, clarity, and student-centered impact.
                        </p>
                        <Link
                            href="https://linkly.link/2KhBt"
                            target="_blank"
                            className="w-full py-3 rounded-lg bg-white/5 hover:bg-gcu-purple hover:text-white text-gray-300 font-medium transition-all flex items-center justify-center gap-2"
                        >
                            Start Simulation <Play size={16} />
                        </Link>
                    </div>

                    {/* RQG Card */}
                    <div className="group bg-card border border-card-border rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col">
                        <div className="mb-4 p-3 bg-blue-500/10 rounded-xl w-fit text-blue-400 group-hover:scale-110 transition-transform">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Rapid Question Gen</h3>
                        <p className="text-sm text-gray-400 mb-6 flex-1">
                            Practice asking strong, open-ended donor questions quickly and effectively (under 25 words).
                        </p>
                        <Link
                            href="https://linkly.link/2KhBx"
                            target="_blank"
                            className="w-full py-3 rounded-lg bg-white/5 hover:bg-blue-500 hover:text-white text-gray-300 font-medium transition-all flex items-center justify-center gap-2"
                        >
                            Start Simulation <Play size={16} />
                        </Link>
                    </div>

                    {/* OO Card */}
                    <div className="group bg-card border border-card-border rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 flex flex-col">
                        <div className="mb-4 p-3 bg-pink-500/10 rounded-xl w-fit text-pink-400 group-hover:scale-110 transition-transform">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Overcoming Objections</h3>
                        <p className="text-sm text-gray-400 mb-6 flex-1">
                            Practice handling real donor objections with confidence, empathy, and clarity.
                        </p>
                        <Link
                            href="https://linkly.link/2KhBy"
                            target="_blank"
                            className="w-full py-3 rounded-lg bg-white/5 hover:bg-pink-500 hover:text-white text-gray-300 font-medium transition-all flex items-center justify-center gap-2"
                        >
                            Start Simulation <Play size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section 4: Resources & Process */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                        <FileText size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Process & Resources</h2>
                </div>

                <div className="bg-card border border-card-border rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Submission Workflow</h3>
                            <ol className="space-y-4 relative border-l border-white/10 ml-3">
                                <li className="pl-6 relative">
                                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gcu-purple border border-black" />
                                    <h4 className="text-white font-medium">Complete Simulation</h4>
                                    <p className="text-sm text-gray-400">Run MTA, RQG, or OO in ChatGPT.</p>
                                </li>
                                <li className="pl-6 relative">
                                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gcu-purple border border-black" />
                                    <h4 className="text-white font-medium">Record in HiDock</h4>
                                    <p className="text-sm text-gray-400">Record audio and generate timestamped transcript.</p>
                                </li>
                                <li className="pl-6 relative">
                                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gcu-purple border border-black" />
                                    <h4 className="text-white font-medium">Submit to Asana</h4>
                                    <p className="text-sm text-gray-400">Upload transcript and chat link for grading.</p>
                                </li>
                                {['Harley', 'Brady', 'Noah', 'Konnor', 'Maysen'].includes(userName || '') && (
                                    <li className="pl-6 relative">
                                        <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gcu-purple border border-black" />
                                        <h4 className="text-white font-medium">Get Scored</h4>
                                        <p className="text-sm text-gray-400 mb-2">Run your transcript through the Scoring GPT.</p>
                                        <Link
                                            href="https://chatgpt.com/g/g-69010a7314b881919be5552092d12604-scoring-gpt"
                                            target="_blank"
                                            className="inline-flex items-center gap-2 text-xs text-gcu-purple-light hover:text-white transition-colors"
                                        >
                                            Launch Scoring GPT <ExternalLink size={12} />
                                        </Link>
                                    </li>
                                )}
                            </ol>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>


                            <Link
                                href="https://www.canva.com/design/DAGuMKXKnm0/GSStPKTvZ1jze7V9fbVgUA/edit"
                                target="_blank"
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <Play size={20} className="text-blue-400" />
                                    <span className="text-gray-200 font-medium">HiDock Tutorial</span>
                                </div>
                                <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                            </Link>

                            <Link
                                href="https://form.asana.com/?k=kaCMXgl1G1Ec-PNkEpLkGg&d=1108959473510111"
                                target="_blank"
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-green-500" />
                                    <span className="text-gray-200 font-medium">Asana Submission Form</span>
                                </div>
                                <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
