import React from 'react';
import { ProposalData, ProposalSection, CoverSection, SynopsisSection, StorySection, ProblemSection, ContentSection, ImpactSection, InvestmentSection } from '@/types/proposal';
import clsx from 'clsx';
import { Orbit } from 'lucide-react';

const PAGE_WIDTH = 816; // 8.5 inches * 96 DPI
const PAGE_HEIGHT = 1056; // 11 inches * 96 DPI

const Preview = ({ data }: { data: ProposalData }) => {

    // Dynamic Styles based on Theme with Transitions
    const transitionStyle = { transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' };
    const primaryStyle = { color: data.theme.primaryColor, ...transitionStyle };
    const bgPrimaryStyle = { backgroundColor: data.theme.primaryColor, ...transitionStyle };
    const borderPrimaryStyle = { borderColor: data.theme.primaryColor, ...transitionStyle };

    // Secondary Styles
    const secondaryStyle = { color: data.theme.secondaryColor, ...transitionStyle };
    const bgSecondaryStyle = { backgroundColor: data.theme.secondaryColor, ...transitionStyle };
    const borderSecondaryStyle = { borderColor: data.theme.secondaryColor, ...transitionStyle };

    // Default opacity to 0.9 if not set
    const overlayOpacity = data.theme.overlayOpacity !== undefined ? data.theme.overlayOpacity : 0.9;

    const Cover = ({ section, meta }: { section: CoverSection, meta: any }) => (
        <div className="relative h-[1056px] w-full flex flex-col justify-between overflow-hidden text-white break-before-page print:break-before-page animate-fade-in" style={bgPrimaryStyle}>
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 z-0 bg-gray-300">
                {section.image && (
                    <img
                        src={section.image}
                        alt="Cover Background"
                        className="w-full h-full object-cover grayscale opacity-50 mix-blend-multiply transition-opacity duration-700"
                    />
                )}
            </div>

            {/* Overlay Gradient - Dynamic Opacity */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    backgroundColor: data.theme.primaryColor,
                    opacity: overlayOpacity,
                    transition: 'background-color 0.5s ease, opacity 0.5s ease'
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10 pointer-events-none"></div>


            {/* Content */}
            <div className="relative z-20 p-16 h-full flex flex-col justify-between">
                {/* Top Logos */}
                <div className="flex justify-between items-start opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    <div className="w-56 h-20 flex items-center justify-start">
                        <img src="/assets/proposal/logo-white.png" alt="GCU Logo" className="h-full object-contain" />
                    </div>
                    {meta.clientLogo && (
                        <div className="w-48 h-20 flex items-center justify-end">
                            <img src={meta.clientLogo} alt="Client Logo" className="h-full object-contain drop-shadow-md bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20" />
                        </div>
                    )}
                </div>

                {/* Title Block */}
                <div className="mb-24 opacity-0 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                    <div className="w-32 h-2 bg-white mb-8"></div>
                    <h1 className="text-7xl font-bold tracking-tight mb-6 uppercase font-sans leading-tight shadow-md">
                        {section.title}
                    </h1>
                    {section.subtitle && (
                        <p className="text-3xl font-light opacity-90 mb-8 max-w-2xl leading-snug">{section.subtitle}</p>
                    )}

                    <div className="flex flex-col gap-2 mt-12 bg-white/10 backdrop-blur-md p-8 rounded-lg border-l-4 border-white inline-block">
                        <p className="text-lg font-bold opacity-80 tracking-widest uppercase mb-1">Prepared For</p>
                        <div className="text-4xl font-extrabold text-white tracking-tight" style={secondaryStyle}>{meta.preparedFor}</div>
                    </div>
                </div>
            </div>

            {/* Diagonal Elements */}
            <div className="absolute bottom-0 right-0 w-full h-40 bg-white transform -skew-y-2 origin-bottom-right z-20 translate-y-20"></div>
        </div>
    );

    // --- RENDERERS ---

    const Synopsis = ({ section }: { section: SynopsisSection }) => (
        <div className="relative h-[1056px] w-full flex flex-col pt-20 pb-16 px-16 bg-white text-black break-before-page print:break-before-page font-sans animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                <div className="w-3/5">
                    <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight" style={primaryStyle}>{section.title}</h2>
                    <div className="w-24 h-2 mb-8" style={bgSecondaryStyle}></div>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg font-light text-justify">
                        {section.content}
                    </div>
                </div>
                <div className="w-2/5">
                    <div className="aspect-[4/5] bg-gray-200 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden group hover:shadow-xl transition-all duration-500 rotate-2 border-4 border-white">
                        {section.image ? (
                            <img src={section.image} alt="Synopsis Visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                            <span className="text-gray-400 font-bold text-sm uppercase text-center p-4">Visual</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-auto bg-gray-50 p-10 rounded-2xl border border-gray-100 flex-1 shadow-inner">
                <h3 className="text-2xl font-bold text-center mb-10 tracking-widest" style={primaryStyle}>KEY PILLARS</h3>
                <div className="grid grid-cols-3 gap-8">
                    {(section.summaryPillars || []).map((pillar, idx) => (
                        <div key={idx} className={clsx(
                            "bg-white p-6 rounded-xl shadow-sm border-t-8 relative hover:-translate-y-2 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center",
                        )}
                            style={idx === 1 ? { borderColor: data.theme.secondaryColor } : borderPrimaryStyle}
                        >
                            <div className={clsx(
                                "w-14 h-14 rounded-full flex items-center justify-center mb-4 absolute -top-7 transition-colors duration-300 shadow-md",
                            )}
                                style={idx === 1
                                    ? { backgroundColor: data.theme.secondaryColor, color: 'white' }
                                    : { backgroundColor: data.theme.primaryColor, color: 'white' }
                                }
                            >
                                <span className="font-bold text-xl">{pillar.icon || idx + 1}</span>
                            </div>
                            <h4 className="font-bold text-lg mt-6 mb-3 text-gray-800">{pillar.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-200 flex justify-between items-center text-sm text-gray-400 font-semibold tracking-wide">
                <span>{section.title}</span>
                <span>Grand Canyon University</span>
            </div>
        </div>
    );

    const Story = ({ section }: { section: StorySection }) => (
        <div className="relative h-[1056px] w-full flex flex-col justify-center items-center p-16 break-before-page print:break-before-page font-sans animate-fade-in" style={{ animationDelay: '0.2s', backgroundColor: data.theme.backgroundColor, color: data.theme.textColor }}>
            <div className="w-full max-w-4xl text-center mb-16">
                <h2 className="text-5xl font-bold mb-4 uppercase tracking-tight" style={primaryStyle}>{section.title}</h2>
                {section.subtitle && <h3 className="text-2xl font-light text-gray-500 uppercase tracking-widest">{section.subtitle}</h3>}
                <div className="w-24 h-1 mx-auto mt-8 bg-gray-200"></div>
            </div>

            <div className="flex flex-col items-center gap-12 bg-gray-50 p-12 rounded-3xl border border-gray-100 shadow-lg w-full">
                {section.image && (
                    <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm relative">
                        <img src={section.image} alt="Story Visual" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-4">
                            {section.quote && <p className="text-white font-serif italic text-xl">"{section.quote}"</p>}
                        </div>
                    </div>
                )}
                <div className="text-xl text-gray-700 leading-relaxed font-light text-center max-w-3xl">
                    {section.content}
                </div>
            </div>
            <div className="mt-auto pt-8 w-full border-t border-gray-200 flex justify-between items-center text-sm text-gray-400 font-semibold tracking-wide">
                <span>Our Story</span>
                <span>Grand Canyon University</span>
            </div>
        </div>
    );

    const Problem = ({ section }: { section: ProblemSection }) => (
        <div className="relative h-[1056px] w-full flex flex-col p-16 bg-gray-900 text-white break-before-page print:break-before-page font-sans animate-fade-in" style={{ animationDelay: '0.2s', backgroundImage: `radial-gradient(circle at top right, ${data.theme.primaryColor}50, transparent 40%)` }}>
            <div className="mb-16">
                <h2 className="text-5xl font-bold mb-6 uppercase tracking-tight text-white">{section.title}</h2>
                <p className="text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {section.points.map((point, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-l-4 border-l-red-500 border border-white/5 hover:bg-white/15 transition-colors">
                        <h4 className="text-2xl font-bold mb-2 text-white">{point.title}</h4>
                        <p className="text-lg text-gray-300">{point.description}</p>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-center text-sm text-gray-500 font-semibold tracking-wide">
                <span>The Challenge</span>
                <span>Grand Canyon University</span>
            </div>
        </div>
    );

    const Content = ({ section }: { section: ContentSection }) => (
        <div className="relative h-[1056px] w-full flex flex-col p-16 break-before-page print:break-before-page font-sans animate-fade-in" style={{ animationDelay: '0.2s', backgroundColor: data.theme.backgroundColor, color: data.theme.textColor }}>
            <div className="flex items-center gap-4 mb-2">
                <div className="h-0.5 flex-1 bg-gray-200"></div>
                <h3 className="text-sm tracking-widest text-gray-500 uppercase font-bold">Scope of Work</h3>
            </div>
            <h2 className="text-5xl font-bold mb-16 uppercase tracking-tight" style={primaryStyle}>{section.title}</h2>

            <div className="flex gap-12 flex-1">
                <div className="w-2/3 space-y-10">
                    {section.elements.map((el, idx) => (
                        <div key={idx} className="flex gap-6 hover:translate-x-2 transition-transform duration-300 group">
                            <div className={clsx("min-w-[6px] rounded-full")} style={idx % 2 === 0 ? bgSecondaryStyle : bgPrimaryStyle}></div>
                            <div className="flex-1">
                                <h4 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-black transition-colors">{el.title}</h4>
                                <p className="text-base text-gray-600 mb-4 leading-relaxed">{el.description}</p>
                                <ul className="pl-0 space-y-2">
                                    {el.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={secondaryStyle}></span>
                                            <span className="text-gray-700 font-medium text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-1/3 flex flex-col gap-6">
                    {section.image ? (
                        <div className="h-[400px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-lg group">
                            <img src={section.image} alt="Scope Visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    ) : (
                        <div className="h-[400px] w-full bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm font-bold uppercase tracking-widest border-2 border-dashed border-gray-300">
                            Relevant Image
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-200 flex justify-between items-center text-sm text-gray-400 font-semibold tracking-wide">
                <span>Strategic Pillars</span>
                <span>Grand Canyon University</span>
            </div>
        </div>
    );

    const Investment = ({ section }: { section: InvestmentSection }) => (
        <div className="relative h-[1056px] min-h-[1056px] w-full flex flex-col justify-center pt-16 px-16 pb-48 break-before-page print:break-before-page font-sans animate-fade-in overflow-hidden" style={{ animationDelay: '0.3s', backgroundColor: data.theme.backgroundColor, color: data.theme.textColor }}>
            <div className="border-4 border-double border-gray-200 rounded-3xl p-16 text-center max-w-3xl mx-auto relative overflow-hidden w-full shadow-2xl hover:shadow-3xl transition-shadow duration-500 z-10" style={{ backgroundColor: data.theme.backgroundColor }}>
                <div className="absolute top-0 left-0 w-full h-3" style={bgPrimaryStyle}></div>

                <h2 className="text-4xl font-bold mb-6 uppercase tracking-tight" style={primaryStyle}>{section.title}</h2>
                <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={bgSecondaryStyle}></div>

                <div className="space-y-8 mb-12">
                    {section.elements.map((el, idx) => (
                        <div key={idx} className="items-center justify-center">
                            {el.isTotal && (
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 inline-block min-w-[300px]">
                                    <div className="text-7xl font-extrabold text-gray-900 mb-3 tracking-tighter" style={{ color: data.theme.primaryColor }}>{el.cost}</div>
                                    <div className="text-base text-gray-500 uppercase tracking-widest font-bold">{el.item}</div>
                                </div>
                            )}
                            {!el.isTotal && el.cost && (
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2 max-w-md mx-auto">
                                    <span className="text-gray-600 font-medium">{el.item}</span>
                                    <span className="font-bold text-gray-800">{el.cost}</span>
                                </div>
                            )}
                            {!el.isTotal && !el.cost && (
                                <p className="text-sm text-gray-400 italic mb-4">{el.item}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-yellow-50 text-yellow-800 px-8 py-4 rounded-xl text-base inline-block font-semibold border border-yellow-100 shadow-sm">
                    This donation intent would be highlighted through a multi-year pledge form.
                </div>
            </div>
        </div>
    );

    const Impact = ({ section }: { section: ImpactSection }) => (
        <div className="relative h-[1056px] w-full flex flex-col justify-center items-center pt-16 px-16 pb-48 bg-gray-50 text-black break-before-page print:break-before-page font-sans animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                <Orbit size={400} stroke={data.theme.primaryColor} />
            </div>

            <div className="relative z-10 w-full max-w-4xl">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold mb-6 uppercase tracking-tight" style={primaryStyle}>{section.title}</h2>
                    <div className="w-24 h-2 mx-auto rounded-full" style={bgSecondaryStyle}></div>
                </div>

                <div className="grid grid-cols-2 gap-12">
                    {section.stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border-l-8 transform hover:-translate-y-2 transition-transform duration-300" style={{ borderColor: idx % 2 === 0 ? data.theme.primaryColor : data.theme.secondaryColor }}>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-6xl font-extrabold tracking-tighter" style={{ color: idx % 2 === 0 ? data.theme.primaryColor : data.theme.secondaryColor }}>
                                    {stat.value}
                                </span>
                                {stat.suffix && (
                                    <span className="text-2xl font-bold text-gray-400">{stat.suffix}</span>
                                )}
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wide">{stat.label}</h4>
                            {stat.description && (
                                <p className="text-gray-500 font-medium leading-relaxed border-t border-gray-100 pt-3 mt-1">
                                    {stat.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>

    );

    return (
        <div className="w-full max-w-[816px] mx-auto shadow-2xl overflow-hidden bg-white print:shadow-none print:w-full print:max-w-none">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap');
                .font-sans { font-family: 'Open Sans', sans-serif !important; }
                h1, h2, h3, h4, h5, h6 { font-family: 'Montserrat', sans-serif !important; }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                }
            `}</style>
            {data.sections.map((section, idx) => (
                <div key={section.id}>
                    {section.type === 'cover' && <Cover section={section as CoverSection} meta={data.meta} />}
                    {section.type === 'synopsis' && <Synopsis section={section as SynopsisSection} />}
                    {section.type === 'story' && <Story section={section as StorySection} />}
                    {section.type === 'problem' && <Problem section={section as ProblemSection} />}
                    {section.type === 'content' && <Content section={section as ContentSection} />}
                    {section.type === 'impact' && <Impact section={section as ImpactSection} />}
                    {section.type === 'investment' && <Investment section={section as InvestmentSection} />}
                </div>
            ))}

            {/* Standard Footer */}
            <div className="w-full text-white px-16 py-16 mt-auto break-inside-avoid" style={{ backgroundColor: '#18181b' }}>
                <div className="flex justify-between items-center gap-10">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 flex items-center justify-center bg-white/10 rounded-full p-2">
                            <img src="/assets/proposal/logo-white.png" alt="GCU Logo icon" className="w-full h-full object-contain" />
                        </div>
                        <div className="h-10">
                            <img src="/assets/proposal/gcu-logo-white-text.png" alt="Grand Canyon University" className="h-full object-contain" />
                        </div>
                    </div>
                    <div className="text-right text-sm opacity-60 font-mono">
                        {data.meta.preparedBy} <span className="mx-2 text-white/30">|</span> {data.meta.date}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
