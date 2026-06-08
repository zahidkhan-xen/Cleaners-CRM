import { LEADS, SOURCE_ROWS, VAS } from "./data";

// Sales pipeline — count by status
export const PIPELINE_DATA = [
  { stage: "Unclaimed", count: LEADS.filter(l => l.status === "Unclaimed").length, fill: "#7C3AED" },
  { stage: "New",       count: LEADS.filter(l => l.status === "New").length,       fill: "#9CA3AF" },
  { stage: "Follow-up", count: LEADS.filter(l => l.status === "Follow-up").length, fill: "#D97706" },
  { stage: "Nurture",   count: LEADS.filter(l => l.status === "Nurture").length,   fill: "#2563EB" },
  { stage: "Booked",    count: LEADS.filter(l => l.status === "Booked").length,    fill: "#16A34A" },
  { stage: "Lost",      count: LEADS.filter(l => l.status === "Lost").length,      fill: "#DC2626" },
];

// Monthly revenue (mock — each booking ~$180 avg)
export const REVENUE_DATA = [
  { month: "Oct", revenue: 2340, bookings: 13 },
  { month: "Nov", revenue: 2880, bookings: 16 },
  { month: "Dec", revenue: 1980, bookings: 11 },
  { month: "Jan", revenue: 3240, bookings: 18 },
  { month: "Feb", revenue: 3780, bookings: 21 },
  { month: "Mar", revenue: 4140, bookings: 23 },
];

// Lead source breakdown for donut chart
export const SOURCE_DATA = SOURCE_ROWS.map(r => ({
  name: r.source,
  value: r.leads,
  booked: r.booked,
  conversionRate: r.conversionRate,
}));

export const SOURCE_COLORS = [
  "#F97316", "#2563EB", "#16A34A", "#7C3AED", "#D97706",
];

// VA conversion comparison
export const VA_COMPARISON = VAS.map(v => ({
  name: v.name,
  contacted: v.leadsContacted,
  booked: v.booked,
  lost: v.lost,
  nurture: v.inNurture,
  rate: v.conversionRate,
}));

// Activity heatmap — calls per day/hour (mock data)
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const RAW_ACTIVITY: Record<string, Record<number, number>> = {
  Mon: { 9: 4, 10: 7, 11: 5, 12: 2, 13: 3, 14: 6, 15: 4, 16: 2 },
  Tue: { 9: 3, 10: 5, 11: 8, 12: 3, 13: 4, 14: 5, 15: 6, 16: 3 },
  Wed: { 9: 6, 10: 9, 11: 7, 12: 1, 13: 5, 14: 8, 15: 5, 16: 4 },
  Thu: { 9: 5, 10: 6, 11: 4, 12: 4, 13: 6, 14: 7, 15: 3, 16: 2 },
  Fri: { 9: 4, 10: 5, 11: 6, 12: 5, 13: 3, 14: 4, 15: 2, 16: 1 },
  Sat: { 9: 1, 10: 2, 11: 2, 12: 1, 13: 1, 14: 1, 15: 0, 16: 0 },
  Sun: { 9: 0, 10: 1, 11: 1, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0 },
};

export interface HeatCell {
  day: string;
  hour: number;
  value: number;
}

export const HEATMAP_DATA: HeatCell[] = DAYS.flatMap(day =>
  HOURS.map(hour => ({
    day,
    hour,
    value: RAW_ACTIVITY[day]?.[hour] ?? 0,
  }))
);

export const HOURS_LABELS = HOURS;
export const DAYS_LABELS = DAYS;

// Summary stats for AI context
export const CRM_SUMMARY = {
  totalLeads: LEADS.length,
  booked: LEADS.filter(l => l.status === "Booked").length,
  inNurture: LEADS.filter(l => l.status === "Nurture").length,
  followUp: LEADS.filter(l => l.status === "Follow-up").length,
  lost: LEADS.filter(l => l.status === "Lost").length,
  conversionRate: 38,
  topVA: "Dax",
  topSource: "Facebook Ads",
  avgRevenuePerBooking: 180,
  monthlyRevenue: 4140,
  sources: SOURCE_ROWS.map(r => ({ name: r.source, leads: r.leads, booked: r.booked, rate: r.conversionRate })),
  vas: VAS.map(v => ({ name: v.name, contacted: v.leadsContacted, booked: v.booked, rate: v.conversionRate })),
};
