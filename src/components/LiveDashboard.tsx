'use client';

import { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, ComposedChart, Line, Legend, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { TrendingUp, Sparkles, LayoutGrid, DollarSign, Activity, Users, Clock, History, LineChart, PieChart as PieIcon, Trophy, Target, Medal } from 'lucide-react';

// Updated Base URL
const BASE_URL = "https://script.google.com/macros/s/AKfycbwI6YpMHF6y44kPnTEsJAVddmCEnmZQBglK8LjW_u0TkRc2xWtHxGvMKvRxKnu48rk7iw/exec";
const STATS_URL = `${BASE_URL}?tab=stats`;
const HISTORICALS_URL = `${BASE_URL}?tab=historicals`;
const PROSPECT_URL = `${BASE_URL}?tab=pst`;
const TEAM_URL = `${BASE_URL}?tab=teaminfo`;

const FALLBACK_STATS = {
    "tab": "stats",
    "headers": ["Total Dollars Raised (All time)", 10300114, ""],
    "rows": [
        { "10300114": 0.13289173304295468, "Total Dollars Raised (All time)": "GIK/Cash Ratio (All time)", "": " " },
        { "10300114": 799000, "Total Dollars Raised (All time)": "Flexible Cash Raised (All time)", "": "" },
        // ... (truncated for brevity, logic handles missing keys safely)
        { "10300114": 6117263, "Total Dollars Raised (All time)": "Total Dollars Raised (FY)", "": "" },
        { "10300114": 1726000, "Total Dollars Raised (All time)": "NIL Funds Raised (FY)", "": "" },
        { "10300114": 0.22376020125340368, "Total Dollars Raised (All time)": "GIK/Cash Ratio (FY)", "": 0.7762397987465963 },
        { "10300114": 799000, "Total Dollars Raised (All time)": "Flexible Cash Raised (FY)", "": "" },
        { "10300114": 12345500, "Total Dollars Raised (All time)": "Total Dollars Pending", "": "" },
        { "10300114": 2084000, "Total Dollars Raised (All time)": "Flexible Cash Pending", "": "" },
        { "10300114": 230, "Total Dollars Raised (All time)": "Relationships in Opportunities Phase", "": "" },
        { "10300114": 55, "Total Dollars Raised (All time)": "Relationships in Warm Leads Phase", "": "" },
        { "10300114": 67, "Total Dollars Raised (All time)": "Relationships in Negotiation Phase", "": "" },
        { "10300114": 63, "Total Dollars Raised (All time)": "Relationships in Closed and Stewarding Phase (FY)", "": "" },
        { "10300114": 38.37550790407786, "Total Dollars Raised (All time)": "Average Days in Opportunities Phase", "": "" },
        { "10300114": 42.518638591510935, "Total Dollars Raised (All time)": "Average Days in Warm Leads Phase", "": "" },
        { "10300114": 46.34166224580018, "Total Dollars Raised (All time)": "Average Days in Negotiation Phase", "": "" },
        { "10300114": 162, "Total Dollars Raised (All time)": "Total Current Overdue Cards", "": "" },
        { "10300114": 0.27411167512690354, "Total Dollars Raised (All time)": "", "": 0.7258883248730965 },
        // ... (Adding known values to fallback to ensure it works)
        { "10300114": 0.22886052144562036, "Total Dollars Raised (All time)": "Cost per Dollars Raised (FY)", "": "" },
        { "10300114": 97099.41269841269, "Total Dollars Raised (All time)": "Average Gift Value (FY)", "": "" }
    ]
};

const FALLBACK_HISTORICALS = {
    "tab": "historicals",
    "headers": ["", "Total Dollars Raised", "Growth", "Total Gifts", "Growth", "Total Major Gifts", "Growth", "Total Department Costs", "Growth", "NIL Funding", "Growth", "Average Gift Size", "Growth", "CPDR", "Growth"],
    "rows": [
        { "": "FY 23-24", "Total Dollars Raised": 800000, "Growth": "-", "Total Gifts": 25, "Total Major Gifts": 10, "Total Department Costs": 350000, "NIL Funding": 10, "Average Gift Size": 32000, "CPDR": 0.4375 },
        { "": "FY 24-25", "Total Dollars Raised": 4180846, "Growth": 0.6173, "Total Gifts": 91, "Total Major Gifts": 47, "Total Department Costs": 700000, "NIL Funding": 50000, "Average Gift Size": 45943.36, "CPDR": 0.1674 },
        { "": "FY 25-26", "Total Dollars Raised": 6117263, "Growth": -0.3669, "Total Gifts": 63, "Total Major Gifts": 29, "Total Department Costs": 1400000, "NIL Funding": 1726000, "Average Gift Size": 97099.41, "CPDR": 0.2288 },
        { "": "Projected FY 25-26", "Total Dollars Raised": 13916773, "Growth": 0.3991, "Total Gifts": 143, "Total Major Gifts": 66, "Total Department Costs": "-", "NIL Funding": 3926650, "Average Gift Size": "-", "CPDR": 0.1005 }
    ]
};

const FALLBACK_PROSPECTS = {
    "tab": "pst",
    "headers": ["Type of Prospect"],
    "rows": [
        { "Type of Prospect": "Company (Organization)" },
        { "Type of Prospect": "Company (Organization)" },
        { "Type of Prospect": "Individual (Household)" },
        { "Type of Prospect": "Foundation" },
        { "Type of Prospect": "Company (Organization)" },
        { "Type of Prospect": "Individual (Household)" },
        { "Type of Prospect": "Company (Organization)" }
    ]
};

const FALLBACK_TEAM = {
    "tab": "teaminfo",
    "headers": ["#", "", "Performance Total Completion Rate", "Annual Goal", "Actual"],
    "rows": [
        { "#": "noah.wolfe3@gcu.edu", "": "Noah Wolfe", "Performance Total Completion Rate": 0.7399, "Annual Goal": 800000, "Actual": 1649798 },
        { "#": "harley.hawk@gcu.edu", "": "Harley Harris", "Performance Total Completion Rate": 0.5765, "Annual Goal": 500000, "Actual": 1468001 },
        { "#": "matthew.kerin@gcu.edu", "": "Matthew Kerin", "Performance Total Completion Rate": 0.8169, "Annual Goal": 400000, "Actual": 989000 }
    ]
};

interface DashboardData {
    totalRaisedAllTime: number;
    raisedFY: number;
    pendingGifts: number;
    costPerDollar: number;
    relationships: {
        opportunities: number;
        warmLeads: number;
        negotiation: number;
        closed: number;
    };
    timelines: {
        opportunities: number;
        warmLeads: number;
        negotiation: number;
    };
    efficiency: {
        gikRatio: number;
        avgGift: number;
    };
    pieCharts: {
        giftComposition: Array<{ name: string; value: number; color: string }>;
        cardStatus: Array<{ name: string; value: number; color: string }>;
        prospectType: Array<{ name: string; value: number; color: string }>;
    };
}

interface HistoricalRow {
    year: string;
    totalRaised: number;
    totalGifts: number;
    majorGifts: number;
    costs: number;
    nilFunding: number;
    avgGiftSize: number;
    cpdr: number;
}

interface TeamMember {
    name: string;
    email: string;
    performance: number;
    annualGoal: number;
    actualRaised: number;
    rank: number;
}

export default function LiveDashboard() {
    const [statsData, setStatsData] = useState<DashboardData | null>(null);
    const [historicalData, setHistoricalData] = useState<HistoricalRow[]>([]);
    const [teamData, setTeamData] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [sortType, setSortType] = useState<'completion' | 'raised'>('completion');

    const processStats = (json: any, prospectJson: any): DashboardData => {
        const stats: any = {};

        // --- Pie Chart 1: Gift Composition ---
        let giftComposition = [
            { name: 'In-kind', value: 0, color: '#A78BFA' }, // Light Purple
            { name: 'Cash', value: 0, color: '#34D399' }     // Emerald
        ];

        // --- Pie Chart 2: Card Status ---
        let cardStatus = [
            { name: 'Overdue', value: 0, color: '#F87171' }, // Red
            { name: 'Upcoming', value: 0, color: '#60A5FA' } // Blue
        ];

        // --- Pie Chart 3: Prospect Type ---
        let prospectCounts: Record<string, number> = {
            "Company (Organization)": 0,
            "Individual (Household)": 0,
            "Foundation": 0
        };

        if (prospectJson && Array.isArray(prospectJson.rows)) {
            prospectJson.rows.forEach((row: any) => {
                const type = row["Type of Prospect"];
                if (type && prospectCounts.hasOwnProperty(type)) {
                    prospectCounts[type]++;
                }
            });
        }

        const prospectType = [
            { name: 'Company', value: prospectCounts["Company (Organization)"], color: '#60A5FA' }, // Blue
            { name: 'Individual', value: prospectCounts["Individual (Household)"], color: '#F87171' }, // Red
            { name: 'Foundation', value: prospectCounts["Foundation"], color: '#FBBF24' } // Yellow
        ].filter(item => item.value > 0);


        // --- Stats Processing ---
        let totalRaisedAllTime = 0;
        let labelKey = "Total Dollars Raised (All time)";
        let valueKey = "";

        if (json.headers && Array.isArray(json.headers) && json.headers.length > 1) {
            labelKey = json.headers[0]?.toString() || labelKey;
            const totalValue = parseFloat(json.headers[1]);
            if (!isNaN(totalValue)) {
                totalRaisedAllTime = totalValue;
                valueKey = json.headers[1].toString();
            }
        }

        if (json.rows && Array.isArray(json.rows)) {
            json.rows.forEach((row: any) => {
                const label = row[labelKey];
                const val = row[valueKey];
                const extraVal = row[""];

                if (label !== undefined && val !== undefined) {
                    stats[label] = val;
                }

                // GIK/Cash Logic
                if (label === "GIK/Cash Ratio (FY)") {
                    const gikVal = typeof val === 'number' ? val : 0;
                    const cashVal = typeof extraVal === 'number' ? extraVal : 0;
                    giftComposition[0].value = gikVal;
                    giftComposition[1].value = cashVal;
                }

                // Overdue/Upcoming Logic
                if ((label === "" || label === " ") && typeof val === 'number' && typeof extraVal === 'number') {
                    if (Math.abs(val + extraVal - 1.0) < 0.01) {
                        cardStatus[0].value = val;
                        cardStatus[1].value = extraVal;
                    }
                }
            });
        }

        const getFloat = (key: string) => {
            const val = stats[key];
            if (val === undefined || val === null || val === '') return 0;
            return parseFloat(val);
        };

        return {
            totalRaisedAllTime: totalRaisedAllTime,
            raisedFY: getFloat("Total Dollars Raised (FY)"),
            pendingGifts: getFloat("Total Dollars Pending"),
            costPerDollar: getFloat("Cost per Dollars Raised (FY)"),
            relationships: {
                opportunities: getFloat("Relationships in Opportunities Phase"),
                warmLeads: getFloat("Relationships in Warm Leads Phase"),
                negotiation: getFloat("Relationships in Negotiation Phase"),
                closed: getFloat("Relationships in Closed and Stewarding Phase (FY)"),
            },
            timelines: {
                opportunities: Math.round(getFloat("Average Days in Opportunities Phase")),
                warmLeads: Math.round(getFloat("Average Days in Warm Leads Phase")),
                negotiation: Math.round(getFloat("Average Days in Negotiation Phase")),
            },
            efficiency: {
                gikRatio: getFloat("GIK/Cash Ratio (FY)"),
                avgGift: getFloat("Average Gift Value (FY)"),
            },
            pieCharts: {
                giftComposition,
                cardStatus,
                prospectType
            }
        };
    };

    const processHistoricals = (json: any): HistoricalRow[] => {
        if (!json.rows || !Array.isArray(json.rows)) return [];

        return json.rows
            .filter((row: any) => row[""] && row[""] !== "") // Filter out empty year rows
            .map((row: any) => ({
                year: row[""],
                totalRaised: typeof row["Total Dollars Raised"] === 'number' ? row["Total Dollars Raised"] : 0,
                totalGifts: typeof row["Total Gifts"] === 'number' ? row["Total Gifts"] : 0,
                majorGifts: typeof row["Total Major Gifts"] === 'number' ? row["Total Major Gifts"] : 0,
                costs: typeof row["Total Department Costs"] === 'number' ? row["Total Department Costs"] : 0,
                nilFunding: typeof row["NIL Funding"] === 'number' ? row["NIL Funding"] : 0,
                avgGiftSize: typeof row["Average Gift Size"] === 'number' ? row["Average Gift Size"] : 0,
                cpdr: typeof row["CPDR"] === 'number' ? row["CPDR"] : 0,
            }));
    };

    const processTeamData = (json: any): TeamMember[] => {
        if (!json.rows || !Array.isArray(json.rows)) return [];

        const members = json.rows
            .filter((row: any) => row["#"]?.toString().includes("@gcu.edu") && !row["#"]?.toString().includes("madison"))
            .map((row: any) => ({
                name: row[""] ? row[""].split(' ')[0] : row["#"].split('.')[0], // First name only
                email: row["#"],
                performance: typeof row["Performance Total Completion Rate"] === 'number' ? row["Performance Total Completion Rate"] : 0,
                annualGoal: typeof row["Annual Goal"] === 'number' ? row["Annual Goal"] : 0,
                actualRaised: typeof row["Actual"] === 'number' ? row["Actual"] : 0,
            }));
        // Note: Initial sort is handled in render logic now
        return members;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, histRes, prospectRes, teamRes] = await Promise.all([
                    fetch(STATS_URL),
                    fetch(HISTORICALS_URL),
                    fetch(PROSPECT_URL),
                    fetch(TEAM_URL)
                ]);

                if (!statsRes.ok || !histRes.ok || !prospectRes.ok || !teamRes.ok) throw new Error('Network response was not ok');

                const statsJson = await statsRes.json();
                const histJson = await histRes.json();
                const prospectJson = await prospectRes.json();
                const teamJson = await teamRes.json();

                setStatsData(processStats(statsJson, prospectJson));
                setHistoricalData(processHistoricals(histJson));
                setTeamData(processTeamData(teamJson));
                setIsLive(true);
            } catch (err) {
                console.warn("Live fetch failed, using fallback data:", err);
                try {
                    setStatsData(processStats(FALLBACK_STATS, FALLBACK_PROSPECTS));
                    setHistoricalData(processHistoricals(FALLBACK_HISTORICALS));
                    setTeamData(processTeamData(FALLBACK_TEAM));
                    setIsLive(false);
                } catch (fallbackErr) {
                    console.error("Fallback processing failed:", fallbackErr);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: val > 1000000 ? 2 : 0,
            notation: val > 1000000 ? 'compact' : 'standard'
        }).format(val);
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1F2937] border border-[#374151] p-3 rounded-xl shadow-lg">
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    <p className="text-lg font-bold" style={{ color: payload[0].payload.color }}>
                        Value: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for team performance
    const TeamTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1F2937] border border-[#374151] p-3 rounded-xl shadow-lg">
                    <p className="text-white text-sm font-bold mb-1">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm flex justify-between gap-4" style={{ color: entry.fill }}>
                            <span>{entry.name}:</span>
                            <span className="font-mono">{formatCurrency(entry.value)}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const PieTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-[#1F2937] border border-[#374151] p-3 rounded-xl shadow-lg">
                    <p className="text-white text-sm font-bold">{data.name}</p>
                    <p className="text-sm" style={{ color: data.payload.fill }}>
                        value: {data.value}
                    </p>
                </div>
            );
        }
        return null;
    };

    const PercentagePieTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-[#1F2937] border border-[#374151] p-3 rounded-xl shadow-lg">
                    <p className="text-white text-sm font-bold">{data.name}</p>
                    <p className="text-sm" style={{ color: data.payload.fill }}>
                        {(data.value * 100).toFixed(1)}%
                    </p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/5"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !statsData) return null;

    // Graph Data Preparation
    const pipelineData = [
        { name: 'Opportunities', value: statsData.relationships.opportunities, color: '#60A5FA' },
        { name: 'Warm Leads', value: statsData.relationships.warmLeads, color: '#A78BFA' },
        { name: 'Negotiation', value: statsData.relationships.negotiation, color: '#F472B6' },
        { name: 'Closed (FY)', value: statsData.relationships.closed, color: '#34D399' },
    ];

    const timelineData = [
        { name: 'Opp Phase', days: statsData.timelines.opportunities },
        { name: 'Warm Lead', days: statsData.timelines.warmLeads },
        { name: 'Negotiation', days: statsData.timelines.negotiation },
    ];

    // Sort team data based on selection
    const sortedTeamData = [...teamData].sort((a, b) => {
        if (sortType === 'completion') {
            return b.performance - a.performance;
        } else {
            return b.actualRaised - a.actualRaised;
        }
    }).map((member, index) => ({
        ...member,
        rank: index + 1
    }));

    return (
        <div className="space-y-6">
            {/* Live Data Status Indicator */}
            <div className="flex justify-end">
                {isLive ? (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Live Data Connected
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        Unable to access live data - Showing Cached Snapshot
                    </div>
                )}
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-2xl bg-card border border-card-border relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-sm text-gray-400 mb-1">Total Raised (All Time)</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(statsData.totalRaisedAllTime)}</p>
                        <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                            <TrendingUp size={12} /> Lifetime Impact
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign size={48} className="text-white" />
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-card-border relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-sm text-gray-400 mb-1">Raised This Year (FY)</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(statsData.raisedFY)}</p>
                        <div className="mt-2 text-xs text-gcu-purple-light flex items-center gap-1">
                            <Activity size={12} /> FY To Date
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={48} className="text-gcu-purple-light" />
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-card-border relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-sm text-gray-400 mb-1">Pending Gifts</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(statsData.pendingGifts)}</p>
                        <div className="mt-2 text-xs text-yellow-400 flex items-center gap-1">
                            <Sparkles size={12} /> Active Pipeline
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles size={48} className="text-yellow-400" />
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-card-border relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-sm text-gray-400 mb-1">Cost / Dollar Raised</p>
                        <p className="text-2xl font-bold text-white">${statsData.costPerDollar.toFixed(2)}</p>
                        <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                            <LayoutGrid size={12} /> Efficiency Metric
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <LayoutGrid size={48} className="text-blue-400" />
                    </div>
                </div>
            </div>

            {/* Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-card border border-card-border">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Users size={20} className="text-gcu-purple-light" /> Pipeline Health
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pipelineData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {pipelineData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-6 rounded-3xl bg-card border border-card-border">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-blue-400" /> Deal Velocity (Days)
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.75rem', color: '#fff' }} />
                                <Area type="monotone" dataKey="days" stroke="#60A5FA" strokeWidth={3} fillOpacity={1} fill="url(#colorDays)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Pie Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Gift Composition */}
                <div className="p-6 rounded-3xl bg-card border border-card-border">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <PieIcon size={20} className="text-purple-400" /> Gift Composition
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statsData.pieCharts.giftComposition} dataKey="value" nameKey="name" cx="50%" cy="40%" outerRadius={80} stroke="none">
                                    {statsData.pieCharts.giftComposition.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip content={<PercentagePieTooltip />} />
                                <Legend verticalAlign="bottom" height={48} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Card Status */}
                <div className="p-6 rounded-3xl bg-card border border-card-border">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Activity size={20} className="text-blue-400" /> Card Status
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statsData.pieCharts.cardStatus} dataKey="value" nameKey="name" cx="50%" cy="40%" outerRadius={80} stroke="none">
                                    {statsData.pieCharts.cardStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip content={<PercentagePieTooltip />} />
                                <Legend verticalAlign="bottom" height={48} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Prospect Type */}
                <div className="p-6 rounded-3xl bg-card border border-card-border">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Users size={20} className="text-orange-400" /> Type of Prospect
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statsData.pieCharts.prospectType} dataKey="value" nameKey="name" cx="50%" cy="40%" outerRadius={80} stroke="none">
                                    {statsData.pieCharts.prospectType.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip content={<PieTooltip />} />
                                <Legend verticalAlign="bottom" height={48} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Team Performance Section */}
            {teamData.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Trophy className="text-yellow-400" /> Team Performance
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Leaderboard */}
                        <div className="p-6 rounded-3xl bg-card border border-card-border lg:col-span-1">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Medal size={20} className="text-yellow-500" /> Top Performers
                                </h3>
                                <div className="flex bg-white/5 rounded-lg p-1">
                                    <button
                                        onClick={() => setSortType('completion')}
                                        className={`px-2 py-1 rounded text-xs font-medium transition-all ${sortType === 'completion' ? 'bg-gcu-purple text-white' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        %
                                    </button>
                                    <button
                                        onClick={() => setSortType('raised')}
                                        className={`px-2 py-1 rounded text-xs font-medium transition-all ${sortType === 'raised' ? 'bg-gcu-purple text-white' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        $
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {sortedTeamData.slice(0, 5).map((member) => {
                                    const isRaisedSort = sortType === 'raised';
                                    const primaryValue = isRaisedSort ? formatCurrency(member.actualRaised) : `${(member.performance * 100).toFixed(1)}%`;
                                    const secondaryLabel = isRaisedSort ? 'Completion' : 'Raised';
                                    const secondaryValue = isRaisedSort ? `${(member.performance * 100).toFixed(1)}%` : formatCurrency(member.actualRaised);

                                    return (
                                        <div key={member.email} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                            <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                            ${member.rank === 1 ? 'bg-yellow-500 text-black' :
                                                    member.rank === 2 ? 'bg-gray-300 text-black' :
                                                        member.rank === 3 ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-400'}
                                        `}>
                                                {member.rank}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium truncate">{member.name}</p>
                                                <p className="text-xs text-gray-400">{secondaryLabel}: {secondaryValue}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-green-400 font-bold text-sm">{primaryValue}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Revenue vs Goal Chart */}
                        <div className="p-6 rounded-3xl bg-card border border-card-border lg:col-span-2">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Target size={20} className="text-green-400" /> Revenue: Actual vs Goal
                            </h3>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={teamData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                        <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} interval={0} textAnchor="middle" height={30} />
                                        <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                                        <Tooltip content={<TeamTooltip />} cursor={{ fill: '#ffffff05' }} />
                                        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                                        <Bar dataKey="actualRaised" name="Actual Raised" fill="#34D399" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="annualGoal" name="Annual Goal" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Historicals Section */}
            {historicalData.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <History className="text-gcu-purple" /> Year-Over-Year Growth
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-card border border-card-border">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <LineChart size={20} className="text-green-400" /> Financial Performance
                            </h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={historicalData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                        <XAxis dataKey="year" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val / 1000000}M`} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.75rem', color: '#fff' }} formatter={(val: number) => formatCurrency(val)} />
                                        <Legend />
                                        <Bar dataKey="totalRaised" name="Total Raised" fill="#34D399" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="costs" name="Dept Costs" fill="#F87171" radius={[4, 4, 0, 0]} />
                                        <Line type="monotone" dataKey="nilFunding" name="NIL Funding" stroke="#FBBF24" strokeWidth={3} dot={{ r: 4 }} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-card border border-card-border">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Activity size={20} className="text-purple-400" /> Fundraising Efficiency
                            </h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={historicalData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                        <XAxis dataKey="year" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis yAxisId="left" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val.toFixed(2)}`} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.75rem', color: '#fff' }} />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="totalGifts" name="Total Gifts" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                                        <Line yAxisId="right" type="monotone" dataKey="cpdr" name="Cost Per Dollar" stroke="#60A5FA" strokeWidth={3} dot={{ r: 4 }} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
