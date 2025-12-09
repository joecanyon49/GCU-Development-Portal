import Link from "next/link";
import { ArrowLeft, Heart, TrendingUp, GraduationCap, Globe, BookOpen } from "lucide-react";

export default function About() {
    return (
        <div className="space-y-16 pb-12">
            {/* Header / About GCU Advancement */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">About GCU Advancement</h1>
                        <p className="text-gcu-purple-light font-medium">Building relationships, securing the future.</p>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
                    <p className="text-lg">
                        The Grand Canyon University Advancement team raises funds to advance the mission of GCU. We match caring people with meaningful opportunities to impact GCU initiatives and enable students to find their purpose.
                    </p>
                    <p>
                        Our team nurtures enduring connections with alumni, friends, businesses, corporations and private foundations engaged in educational philanthropy. We ensure professional management and stewardship of contributions to GCU with strict adherence to the donor’s philanthropic intent.
                    </p>
                </div>
            </div>

            {/* Mission Section - Highlighted */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gcu-purple to-gcu-purple-dark p-8 md:p-12 text-center">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white backdrop-blur-sm">
                        <Globe size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                    <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
                        "Create futures through education by engaging a diverse group of people emboldened to make a difference."
                    </p>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>
            </section>

            {/* Two Column Section: Reasons & Expanding */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Reasons for Giving */}
                <div className="p-8 rounded-3xl bg-card border border-card-border hover:border-gcu-purple/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gcu-purple/10 flex items-center justify-center text-gcu-purple-light mb-6">
                        <Heart size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Reasons for Giving</h2>
                    <p className="text-gray-400 leading-relaxed">
                        By becoming a member of the GCU donor family, you make a difference in the lives of our students by ensuring a quality education and exceptional experience. You create opportunities and expand possibilities for generations of Lopes to come.
                    </p>
                </div>

                {/* Expanding Educational Opportunities */}
                <div className="p-8 rounded-3xl bg-card border border-card-border hover:border-blue-500/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                        <TrendingUp size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Expanding Opportunities</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Join us as we expand and enhance educational opportunities with the knowledge that private support will play an increasingly important role in continuing to provide financial assistance for GCU students in the years ahead. We are grateful for your support.
                    </p>
                </div>
            </section>

            {/* About GCU Section */}
            <section className="space-y-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen size={24} className="text-gcu-purple-light" />
                    <h2 className="text-2xl font-bold text-white">About GCU</h2>
                </div>
                <div className="prose prose-invert max-w-none text-gray-400 text-sm leading-relaxed space-y-4">
                    <p>
                        Founded in 1949, Grand Canyon University is a private Christian university that is helping students find their purpose by providing next-generation education with a commitment to affordability. As of Fall 2023, more than 25,200 ground students learn on GCU’s campus,<sup className="text-gcu-purple-light">1</sup> and nearly 93,000 online students gain innovative learning experiences within the digital classroom.<sup className="text-gcu-purple-light">2</sup>
                    </p>
                    <p>
                        As of September 2023, GCU offers over 335 academic programs, including over 270 online programs, scholarship opportunities, faith-integrated curricula developed from a Christian worldview, student support resources, on-campus facilities and more that can help prepare students for the modern workforce. Not only does GCU serve as an institution elevating higher education, but it also invests in revitalizing the local community. Learn more about GCU!
                    </p>
                </div>

                {/* Footnotes */}
                <div className="mt-8 pt-8 border-t border-dashed border-white/10 text-xs text-gray-500 space-y-2">
                    <p>
                        <span className="text-gcu-purple-light font-bold mr-1">1</span>
                        Includes all students who attend ground campus classes (traditional and cohort) who have a last date of attendance of three weeks after the start of the Fall 2023 semester for traditional students, or in the last two months of Q1 for cohort students.
                    </p>
                    <p>
                        <span className="text-gcu-purple-light font-bold mr-1">2</span>
                        Includes students who have participated in an online class in August or September 2023 and does not include students in a cohort program.
                    </p>
                    <p className="pt-4 font-medium text-gray-400">
                        Grand Canyon University is a 501(c)3 organization, EIN#47-2507725. Donations are tax-deductible.
                    </p>
                </div>
            </section>
        </div>
    );
}
