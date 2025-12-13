// New Interfaces for the revised structure
export interface ProposalTheme {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
    overlayOpacity?: number; // 0 to 1
}

export interface ProposalMeta {
    title: string;
    preparedFor: string;
    preparedBy: string;
    date: string;
    clientLogo?: string; // Base64 or URL
}

// --- Section Types ---

export interface SectionBase {
    id: string; // Unique ID for React keys and reordering
    type: string;
}

export interface CoverSection extends SectionBase {
    type: 'cover';
    title: string;
    subtitle: string;
    image: string;
}

export interface SummaryPillar {
    title: string;
    description: string;
    icon: string; // '1', '2', '3'
}

// 1. Synopsis (formerly Executive Summary)
export interface SynopsisSection extends SectionBase {
    type: 'synopsis';
    title: string;
    content: string;
    summaryPillars: SummaryPillar[];
    image?: string;
}

// 2. Story (The "Why")
export interface StorySection extends SectionBase {
    type: 'story';
    title: string;
    subtitle?: string;
    content: string;
    image?: string;
    quote?: string;
}

// 3. Problem (The "Gap" or "Need")
export interface ProblemSection extends SectionBase {
    type: 'problem';
    title: string;
    description: string;
    points: { title: string; description: string }[];
    image?: string;
}

// 4. Content (Formerly Scope of Work / The "What")
export interface Deliverable {
    title: string;
    description: string;
    items: string[];
}

export interface ContentSection extends SectionBase {
    type: 'content';
    title: string;
    elements: Deliverable[];
    image?: string;
}

// 5. Impact Charts (Formerly Stats)
export interface StatItem {
    label: string;
    value: string;
    suffix?: string;
    description?: string;
}

export interface ImpactSection extends SectionBase {
    type: 'impact';
    title: string;
    stats: StatItem[];
}

// 6. Proposal (Formerly Pricing / Investment)
export interface PricingItem {
    item: string;
    cost: string;
    isTotal?: boolean;
}

export interface InvestmentSection extends SectionBase {
    type: 'investment';
    title: string;
    elements: PricingItem[];
}

export type ProposalSection =
    | CoverSection
    | SynopsisSection
    | StorySection
    | ProblemSection
    | ContentSection
    | ImpactSection
    | InvestmentSection;

export interface ProposalData {
    meta: ProposalMeta;
    theme: ProposalTheme;
    sections: ProposalSection[];
}


export const INITIAL_PROPOSAL_DATA: ProposalData = {
    meta: {
        title: "Partnership Proposal",
        preparedFor: "A.R. Mays Construction",
        preparedBy: "Grand Canyon University",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        clientLogo: ""
    },
    theme: {
        primaryColor: "#522398", // GCU Purple
        secondaryColor: "#E0E0E0", // Light Gray
        textColor: "#000000",
        backgroundColor: "#FFFFFF",
        fontFamily: "sans-serif"
    },
    sections: [
        {
            id: 'cover-1',
            type: 'cover',
            title: "Partnership Proposal",
            subtitle: "Find Your Purpose",
            image: "/assets/proposal/cover-aerial.jpg"
        },
        // 1. Synopsis
        {
            id: 'synopsis-1',
            type: 'synopsis',
            title: "Synopsis",
            content: "Grand Canyon University (GCU) is a private Christian university located in Phoenix, Arizona, dedicated to helping students find their purpose. We propose a collaboration with A.R. Mays Construction to support workforce development and student success along 3 key pillars.",
            image: "/assets/proposal/engineering-student.jpg",
            summaryPillars: [
                {
                    title: "Workforce",
                    description: "Collaborating to anticipate hiring needs.",
                    icon: "1"
                },
                {
                    title: "Integration",
                    description: "Curriculum advice & talent pipelines.",
                    icon: "2"
                },
                {
                    title: "Impact",
                    description: "Community engagement & access.",
                    icon: "3"
                }
            ]
        },
        // 2. Story
        {
            id: 'story-1',
            type: 'story',
            title: "Our Shared Story",
            subtitle: "Building Communities Together",
            content: "For over 75 years, GCU has been a beacon of education in the Southwest. Just as A.R. Mays builds physical foundations, we build the intellectual and spiritual foundations of the next generation. Together, our story is one of growth, resilience, and a commitment to excellence in the Phoenix valley.",
            quote: "Education | Service | Integrity",
            image: "/assets/proposal/student-life.jpg"
        },
        // 3. Problem
        {
            id: 'problem-1',
            type: 'problem',
            title: "The Challenge",
            description: "The construction industry faces a critical shortage of qualified, values-driven leadership talent.",
            points: [
                { title: "Talent Gap", description: "Difficulty finding job-ready graduates with practical management skills." },
                { title: "Retention", description: "High turnover rates in early-career professionals." },
                { title: "Culture Match", description: "Need for employees who align with core company values." }
            ]
        },
        // 4. Content (Scope)
        {
            id: 'content-1',
            type: 'content',
            title: "Strategic Content & Pillars",
            image: "/assets/proposal/basketball-action.jpg",
            elements: [
                {
                    title: "Workforce Development Center",
                    description: "Collaborate to anticipate hiring needs within the mechanical pathway.",
                    items: [
                        "Premier Access to Students",
                        "Advisory Board Seat",
                        "Pathway Graduation Table"
                    ]
                },
                {
                    title: "Academic Integration",
                    description: "Integration into Construction Management via talent pipeline.",
                    items: [
                        "Talent Acquisition Pipeline",
                        "Guest Lecturing",
                        "Partner Wall Branding"
                    ]
                },
                {
                    title: "All Access Pass",
                    description: "Athletic passes to GCU games and events for client engagement.",
                    items: [
                        "Computery Athletic Passes",
                        "Client Hosting Opportunities",
                        "Team Nights"
                    ]
                }
            ]
        },
        // 5. Impact Charts (Stats)
        {
            id: 'impact-1',
            type: 'impact',
            title: "Impact & Reach",
            stats: [
                {
                    label: "On-Campus Students",
                    value: "25,000",
                    suffix: "+",
                    description: "Vibrant community"
                },
                {
                    label: "Online Learners",
                    value: "108,000",
                    suffix: "+",
                    description: "National reach"
                },
                {
                    label: "Total Enrollment",
                    value: "133,000",
                    suffix: "+",
                    description: "Projected Fall 2025"
                },
                {
                    label: "Tuition Freeze",
                    value: "17",
                    suffix: " Years",
                    description: "Affordability focus"
                }
            ]
        },
        // 6. Proposal (Investment)
        {
            id: 'proposal-1',
            type: 'investment',
            title: "The Proposal",
            elements: [
                {
                    item: "Annual Partnership Investment",
                    cost: "$10,000"
                },
                {
                    item: "Includes all recruiting, branding, and access benefits.",
                    cost: "",
                },
                {
                    item: "Total Commitment",
                    cost: "$10,000",
                    isTotal: true
                }
            ]
        }
    ]
};
