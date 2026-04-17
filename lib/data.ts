export type Status = "Booked" | "Follow-up" | "Nurture" | "Lost" | "New" | "Unclaimed";
export type Source = "Facebook Ads" | "LSA (Google)" | "Website Form" | "Coupon" | "Inbound SMS" | "Referral";

export interface CallLog {
  date: string;
  time: string;
  result: "Answered" | "No answer" | "Scheduled" | "Voicemail";
}

export interface NurtureEntry {
  date: string;
  message: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  source: Source;
  status: Status;
  assignedVA: string;
  vaInitials: string;
  vaColor: string;
  attempts: number;
  quoted: boolean;
  aiSummary: string;
  callLog: CallLog[];
  nurtureLog: NurtureEntry[];
  createdAt: string;
  scheduledDate?: string;
}

export interface VA {
  id: string;
  name: string;
  initials: string;
  color: string;
  role: string;
  shift: string;
  leadsContacted: number;
  booked: number;
  conversionRate: number;
  totalCalls: number;
  inNurture: number;
  lost: number;
  sources: { label: string; count: number }[];
}

export interface SourceRow {
  source: Source;
  leads: number;
  contacted: number;
  booked: number;
  inNurture: number;
  lost: number;
  conversionRate: number;
  topVA: string;
  topVAInitials: string;
  topVAColor: string;
}

export const VAS: VA[] = [
  {
    id: "dax",
    name: "Dax",
    initials: "DX",
    color: "#7C3AED",
    role: "VA",
    shift: "9am – 4pm",
    leadsContacted: 14,
    booked: 7,
    conversionRate: 50,
    totalCalls: 28,
    inNurture: 5,
    lost: 2,
    sources: [{ label: "Facebook", count: 6 }, { label: "Website", count: 5 }, { label: "LSA", count: 3 }],
  },
  {
    id: "sara",
    name: "Sara",
    initials: "SR",
    color: "#059669",
    role: "VA",
    shift: "9am – 4pm",
    leadsContacted: 12,
    booked: 3,
    conversionRate: 25,
    totalCalls: 24,
    inNurture: 7,
    lost: 2,
    sources: [{ label: "LSA", count: 5 }, { label: "Facebook", count: 4 }, { label: "SMS", count: 3 }],
  },
  {
    id: "lucas",
    name: "Lucas",
    initials: "LC",
    color: "#2563EB",
    role: "VA",
    shift: "12pm – 8pm",
    leadsContacted: 8,
    booked: 3,
    conversionRate: 38,
    totalCalls: 16,
    inNurture: 3,
    lost: 2,
    sources: [{ label: "Website", count: 4 }, { label: "LSA", count: 3 }, { label: "Coupon", count: 1 }],
  },
];

export const LEADS: Lead[] = [
  {
    id: "1",
    name: "Laura Michelle",
    phone: "(619) 794-3294",
    source: "Facebook Ads",
    status: "Booked",
    assignedVA: "Dax",
    vaInitials: "DX",
    vaColor: "#7C3AED",
    attempts: 1,
    quoted: true,
    aiSummary: "Interested in deep clean. Confirmed Tuesday 10am slot.",
    callLog: [{ date: "Mar 8", time: "9:14am", result: "Answered" }],
    nurtureLog: [],
    createdAt: "Mar 8, 2026",
    scheduledDate: "Mar 10, 2026",
  },
  {
    id: "2",
    name: "TEXT LEAD",
    phone: "No info provided",
    source: "LSA (Google)",
    status: "Nurture",
    assignedVA: "Sara",
    vaInitials: "SR",
    vaColor: "#059669",
    attempts: 3,
    quoted: false,
    aiSummary: "",
    callLog: [
      { date: "Mar 5", time: "9:02am", result: "No answer" },
      { date: "Mar 6", time: "11:30am", result: "No answer" },
      { date: "Mar 7", time: "2:00pm", result: "No answer" },
    ],
    nurtureLog: [
      { date: "Mar 9 — Day 1", message: "1st message sent" },
      { date: "Mar 11 — Day 3", message: "2nd message sent" },
      { date: "Mar 15 — Day 7", message: "3rd message sent" },
      { date: "Apr 4", message: "Nurture SMS 1 sent" },
    ],
    createdAt: "Mar 5, 2026",
  },
  {
    id: "3",
    name: "Dat To",
    phone: "(512) 417-1036",
    source: "LSA (Google)",
    status: "Booked",
    assignedVA: "Lucas",
    vaInitials: "LC",
    vaColor: "#2563EB",
    attempts: 1,
    quoted: true,
    aiSummary: "Requested move-out clean. Confirmed April 2nd booking.",
    callLog: [{ date: "Mar 5", time: "10:45am", result: "Answered" }],
    nurtureLog: [],
    createdAt: "Mar 5, 2026",
    scheduledDate: "Apr 2, 2026",
  },
  {
    id: "4",
    name: "Maria Gonzalez",
    phone: "(512) 330-8821",
    source: "Website Form",
    status: "Follow-up",
    assignedVA: "Dax",
    vaInitials: "DX",
    vaColor: "#7C3AED",
    attempts: 2,
    quoted: false,
    aiSummary: "Comparing quotes. Said to call back Thursday.",
    callLog: [
      { date: "Mar 12", time: "9:30am", result: "Answered" },
      { date: "Mar 15", time: "3:00pm", result: "No answer" },
      { date: "Mar 26", time: "11:00am", result: "Scheduled" },
    ],
    nurtureLog: [{ date: "Mar 28", message: "3rd attempt — awaiting" }],
    createdAt: "Mar 12, 2026",
  },
  {
    id: "5",
    name: "James Whitfield",
    phone: "(737) 209-4410",
    source: "Facebook Ads",
    status: "New",
    assignedVA: "Dax",
    vaInitials: "DX",
    vaColor: "#7C3AED",
    attempts: 0,
    quoted: false,
    aiSummary: "Awaiting first contact",
    callLog: [],
    nurtureLog: [],
    createdAt: "Mar 29, 2026",
  },
  {
    id: "6",
    name: "Kevin Tran",
    phone: "(619) 554-2298",
    source: "LSA (Google)",
    status: "Nurture",
    assignedVA: "Sara",
    vaInitials: "SR",
    vaColor: "#059669",
    attempts: 3,
    quoted: false,
    aiSummary: "Said maybe next month. Not ready to commit yet.",
    callLog: [
      { date: "Mar 1", time: "9:58am", result: "No answer" },
      { date: "Mar 2", time: "1:00pm", result: "No answer" },
      { date: "Mar 4", time: "10:00am", result: "No answer" },
    ],
    nurtureLog: [
      { date: "Mar 5 — Day 1", message: "1st message sent" },
      { date: "Mar 12 — Day 7", message: "2nd message sent" },
      { date: "Mar 22", message: "Nurture SMS 1 sent" },
      { date: "Apr 11", message: "None missed" },
    ],
    createdAt: "Mar 1, 2026",
  },
  {
    id: "7",
    name: "Tom Hargrove",
    phone: "(737) 441-9920",
    source: "Facebook Ads",
    status: "Lost",
    assignedVA: "Dax",
    vaInitials: "DX",
    vaColor: "#7C3AED",
    attempts: 3,
    quoted: false,
    aiSummary: "No answer on all attempts.",
    callLog: [
      { date: "Mar 10", time: "9:25am", result: "No answer" },
      { date: "Mar 11", time: "10:00am", result: "No answer" },
      { date: "Mar 12", time: "11:30am", result: "No answer" },
    ],
    nurtureLog: [
      { date: "Mar 16 — Day 1", message: "2nd message sent" },
      { date: "Mar 28 — STOP received, halted", message: "" },
    ],
    createdAt: "Mar 10, 2026",
  },
  {
    id: "8",
    name: "Ashley Brooks",
    phone: "(512) 774-0032",
    source: "Website Form",
    status: "Booked",
    assignedVA: "Lucas",
    vaInitials: "LC",
    vaColor: "#2563EB",
    attempts: 2,
    quoted: true,
    aiSummary: "Very interested. Booked recurring bi-weekly service.",
    callLog: [
      { date: "Mar 8", time: "9:00am", result: "No answer" },
      { date: "Mar 9", time: "9:00am", result: "Answered" },
    ],
    nurtureLog: [],
    createdAt: "Mar 8, 2026",
    scheduledDate: "Mar 16, 2026",
  },
  {
    id: "9",
    name: "Rachel Kim",
    phone: "(214) 883-4421",
    source: "Coupon",
    status: "Booked",
    assignedVA: "Lucas",
    vaInitials: "LC",
    vaColor: "#2563EB",
    attempts: 1,
    quoted: true,
    aiSummary: "Used $50 off coupon. Booked standard clean.",
    callLog: [{ date: "Mar 14", time: "10:15am", result: "Answered" }],
    nurtureLog: [],
    createdAt: "Mar 14, 2026",
    scheduledDate: "Mar 21, 2026",
  },
  {
    id: "10",
    name: "Carlos Medina",
    phone: "(512) 990-2211",
    source: "Inbound SMS",
    status: "Follow-up",
    assignedVA: "Sara",
    vaInitials: "SR",
    vaColor: "#059669",
    attempts: 2,
    quoted: false,
    aiSummary: "Texted in asking for pricing. Needs follow-up call.",
    callLog: [
      { date: "Mar 18", time: "11:00am", result: "Voicemail" },
      { date: "Mar 19", time: "2:30pm", result: "No answer" },
    ],
    nurtureLog: [],
    createdAt: "Mar 18, 2026",
  },
  {
    id: "11",
    name: "Diana Perkins",
    phone: "(737) 221-0087",
    source: "Referral",
    status: "Booked",
    assignedVA: "Sara",
    vaInitials: "SR",
    vaColor: "#059669",
    attempts: 1,
    quoted: true,
    aiSummary: "Referred by existing client. Booked deep clean for move-in.",
    callLog: [{ date: "Mar 20", time: "9:45am", result: "Answered" }],
    nurtureLog: [],
    createdAt: "Mar 20, 2026",
    scheduledDate: "Mar 28, 2026",
  },
  {
    id: "12",
    name: "Brian Foster",
    phone: "(619) 774-3310",
    source: "Facebook Ads",
    status: "Unclaimed",
    assignedVA: "Dax",
    vaInitials: "DX",
    vaColor: "#7C3AED",
    attempts: 0,
    quoted: false,
    aiSummary: "New lead, not yet contacted.",
    callLog: [],
    nurtureLog: [],
    createdAt: "Apr 1, 2026",
  },
];

export const SOURCE_ROWS: SourceRow[] = [
  { source: "Facebook Ads",  leads: 14, contacted: 14, booked: 6,  inNurture: 5, lost: 3, conversionRate: 43, topVA: "Dax",   topVAInitials: "DX", topVAColor: "#7C3AED" },
  { source: "LSA (Google)",  leads: 11, contacted: 11, booked: 4,  inNurture: 5, lost: 2, conversionRate: 36, topVA: "Lucas", topVAInitials: "LC", topVAColor: "#2563EB" },
  { source: "Website Form",  leads: 5,  contacted: 5,  booked: 2,  inNurture: 2, lost: 1, conversionRate: 40, topVA: "Lucas", topVAInitials: "LC", topVAColor: "#2563EB" },
  { source: "Coupon",        leads: 2,  contacted: 2,  booked: 1,  inNurture: 1, lost: 0, conversionRate: 50, topVA: "Dax",   topVAInitials: "DX", topVAColor: "#7C3AED" },
  { source: "Inbound SMS",   leads: 2,  contacted: 2,  booked: 0,  inNurture: 2, lost: 0, conversionRate: 0,  topVA: "Sara",  topVAInitials: "SR", topVAColor: "#059669" },
];
