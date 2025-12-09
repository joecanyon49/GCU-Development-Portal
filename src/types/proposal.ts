// New Interfaces for the revised structure
export interface ProposalTheme {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
}

export interface ProposalMeta {
    title: string;
    preparedFor: string;
    preparedBy: string;
    date: string;
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

export interface ExecutiveSummarySection extends SectionBase {
    type: 'executive_summary';
    title: string;
    content: string;
}

export interface Deliverable {
    title: string;
    description: string;
    items: string[];
}

export interface ScopeOfWorkSection extends SectionBase {
    type: 'scope_of_work';
    title: string;
    elements: Deliverable[];
}

export interface TimelinePhase {
    name: string;
    duration: string;
    description: string;
}

export interface TimelineSection extends SectionBase {
    type: 'timeline';
    title: string;
    phases: TimelinePhase[];
}

export interface PricingItem {
    item: string;
    cost: string;
    isTotal?: boolean;
}

export interface PricingSection extends SectionBase {
    type: 'pricing';
    title: string;
    elements: PricingItem[];
}

export interface NextStepsSection extends SectionBase {
    type: 'next_steps';
    title: string;
    content: string;
    ctaText: string;
    ctaLink: string;
}

export type ProposalSection =
    | CoverSection
    | ExecutiveSummarySection
    | ScopeOfWorkSection
    | TimelineSection
    | PricingSection
    | NextStepsSection;

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
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
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
            subtitle: "Building the Future of Workforce Development",
            image: "https://placehold.co/816x1056/EEE/31343C.png?text=Cover+Image+Placeholder"
        },
        {
            id: 'exec-1',
            type: 'executive_summary',
            title: "Overview",
            content: "Grand Canyon University (GCU) is looking to partner with A.R. Mays Construction on a variety of different initiatives to support students and programs at GCU. We propose a collaboration in 3 key pillars: Center for Workforce Development, College of Business and Engineering integration, and exclusive access to GCU events."
        },
        {
            id: 'scope-1',
            type: 'scope_of_work',
            title: "Proposed Partnership Pillars",
            elements: [
                {
                    title: "Center for Workforce Development",
                    description: "Our team will collaborate closely with A.R. Mays to anticipate hiring needs from within the mechanical pathway.",
                    items: [
                        "Premier Access to Students (Class lectures, hands-on training)",
                        "Advisory Board Seat to support curriculum development",
                        "Pathway Graduation Designated Table"
                    ]
                },
                {
                    title: "College of Business and Engineering",
                    description: "Integration into the Construction Management program through a talent pipeline and classroom collaboration.",
                    items: [
                        "Talent Acquisition Pipeline (VIP placement at career fairs)",
                        "Guest Lecturing Opportunities",
                        "Corporate Partner Wall Branding"
                    ]
                },
                {
                    title: "GCU All Access Pass",
                    description: "Receive athletic passes to GCU games and events to attend with clients, students, or staff.",
                    items: [
                        "Complimentary athletic passes",
                        "Opportunity to host clients and engage prospects",
                        "Team nights at games"
                    ]
                }
            ]
        },
        {
            id: 'investment-1',
            type: 'pricing',
            title: "Annual Partnership Investment",
            elements: [
                {
                    item: "Annual Donation Suggestion",
                    cost: "$10,000"
                },
                {
                    item: "Includes all recruiting, branding, and access benefits.",
                    cost: "",
                },
                {
                    item: "Total",
                    cost: "$10,000",
                    isTotal: true
                }
            ]
        }
    ]
};
