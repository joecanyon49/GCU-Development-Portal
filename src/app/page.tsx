import Link from "next/link";
import { Heart, TrendingUp, LayoutGrid, ArrowRight, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import LiveDashboard from '@/components/LiveDashboard';

export default async function Home() {
  const cookieStore = await cookies();
  const userName = cookieStore.get('auth_user')?.value;

  if (!userName) {
    redirect('/login');
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gcu-purple-dark to-black border border-white/10 p-10 md:p-16">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gcu-purple-light text-sm font-medium mb-6 border border-white/5">
            <Sparkles size={14} />
            <span>Welcome back, {userName}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Advancing the mission of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gcu-purple-light to-white">GCU</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Access your fundraising tools, donor management systems, and campaign resources. Together, we build the future of Grand Canyon University.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/training"
              className="px-6 py-3 rounded-xl bg-gcu-purple hover:bg-gcu-purple-light text-white font-medium transition-all shadow-lg shadow-gcu-purple/25 flex items-center gap-2"
            >
              Start Training <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all border border-white/10"
            >
              Our Mission
            </Link>
          </div>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-gcu-purple/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      </section>

      {/* Live Dashboard with Graphs */}
      <LiveDashboard />

      {/* Quick Links Grid */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Training Card */}
          <Link href="/training" className="group p-6 rounded-2xl bg-card border border-card-border hover:border-gcu-purple/50 transition-all duration-300 hover:shadow-lg hover:shadow-gcu-purple/10">
            <div className="w-12 h-12 rounded-xl bg-gcu-purple/10 flex items-center justify-center text-gcu-purple-light mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gcu-purple-light transition-colors">Training</h3>
            <p className="text-gray-400 text-sm">Onboarding for new advancement officers and campaign training.</p>
          </Link>

          {/* Tools Card */}
          <Link href="/tools" className="group p-6 rounded-2xl bg-card border border-card-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Advancement Tools</h3>
            <p className="text-gray-400 text-sm">Access CRM, donor databases, and reporting dashboards.</p>
          </Link>

          {/* Asana Card */}
          <Link href="https://asana.com" target="_blank" className="group p-6 rounded-2xl bg-card border border-card-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <LayoutGrid size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Asana</h3>
            <p className="text-gray-400 text-sm">Manage fundraising campaigns and team projects.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
