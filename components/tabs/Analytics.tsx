"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
} from "recharts";
import {
  PIPELINE_DATA, REVENUE_DATA, SOURCE_DATA, SOURCE_COLORS,
  VA_COMPARISON, CRM_SUMMARY,
} from "@/lib/analytics";
import ActivityHeatmap from "@/components/charts/ActivityHeatmap";
import { TrendingUp, DollarSign, Users, Target } from "lucide-react";

const STAT_CARDS = [
  { label: "Total Leads",      value: String(CRM_SUMMARY.totalLeads),    sub: "This month",       icon: <Users size={16} />,      color: "#F97316" },
  { label: "Booked",           value: String(CRM_SUMMARY.booked),         sub: "Confirmed jobs",   icon: <Target size={16} />,     color: "#16A34A" },
  { label: "Monthly Revenue",  value: `$${CRM_SUMMARY.monthlyRevenue.toLocaleString()}`, sub: "Est. March",  icon: <DollarSign size={16} />, color: "#2563EB" },
  { label: "Conversion Rate",  value: `${CRM_SUMMARY.conversionRate}%`,  sub: "Lead → Booked",    icon: <TrendingUp size={16} />, color: "#7C3AED" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-modal px-3 py-2">
      <p className="text-xs font-bold text-gray-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-[11px]" style={{ color: p.color ?? p.fill }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-modal px-3 py-2">
      <p className="text-xs font-bold text-gray-700">{d.name}</p>
      <p className="text-[11px] text-gray-500">Leads: <strong>{d.value}</strong></p>
      <p className="text-[11px] text-gray-500">Conversion: <strong>{d.payload.conversionRate}%</strong></p>
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="h-full overflow-y-auto bg-surface-base">
      <div className="p-6 flex flex-col gap-6">

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          {STAT_CARDS.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-card border border-gray-100 flex items-start gap-3">
              <div className="p-2 rounded-xl" style={{ background: s.color + "15" }}>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-gray-900">{s.value}</p>
                <p className="text-xs font-semibold text-gray-700">{s.label}</p>
                <p className="text-[10px] text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 1: Pipeline bar + Revenue area */}
        <div className="grid grid-cols-2 gap-4">
          {/* Sales Pipeline */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <p className="text-sm font-bold font-display text-gray-900 mb-0.5">Sales Pipeline</p>
            <p className="text-xs text-gray-400 mb-4">Lead count by stage</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={PIPELINE_DATA} barCategoryGap="30%" layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="stage" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F9FAFB" }} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} name="Leads">
                  {PIPELINE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <p className="text-sm font-bold font-display text-gray-900 mb-0.5">Revenue Trend</p>
            <p className="text-xs text-gray-400 mb-4">Monthly estimated revenue ($)</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#F97316" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue ($)" dot={{ fill: "#F97316", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#F97316" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Source donut + VA radar */}
        <div className="grid grid-cols-2 gap-4">
          {/* Source Breakdown */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <p className="text-sm font-bold font-display text-gray-900 mb-0.5">Lead Source Breakdown</p>
            <p className="text-xs text-gray-400 mb-4">Where leads are coming from</p>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="55%" height={200}>
                <PieChart>
                  <Pie data={SOURCE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {SOURCE_DATA.map((_, i) => (
                      <Cell key={i} fill={SOURCE_COLORS[i % SOURCE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 flex-1">
                {SOURCE_DATA.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: SOURCE_COLORS[i] }} />
                    <span className="text-[11px] text-gray-600 flex-1">{s.name}</span>
                    <span className="text-[11px] font-bold text-gray-800">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VA Performance Radar */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <p className="text-sm font-bold font-display text-gray-900 mb-0.5">VA Performance Radar</p>
            <p className="text-xs text-gray-400 mb-4">Contacted vs Booked vs Lost by VA</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={VA_COMPARISON} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="contacted" name="Contacted" fill="#F97316" radius={[4,4,0,0]} />
                <Bar dataKey="booked"    name="Booked"    fill="#16A34A" radius={[4,4,0,0]} />
                <Bar dataKey="lost"      name="Lost"      fill="#DC2626" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 3: Heatmap full width */}
        <ActivityHeatmap />

        {/* Row 4: Monthly bookings line chart */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
          <p className="text-sm font-bold font-display text-gray-900 mb-0.5">Monthly Bookings</p>
          <p className="text-xs text-gray-400 mb-4">Number of confirmed jobs per month</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="bookings" stroke="#7C3AED" strokeWidth={2.5} name="Bookings" dot={{ fill: "#7C3AED", r: 5, strokeWidth: 0 }} activeDot={{ r: 7, fill: "#7C3AED" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
