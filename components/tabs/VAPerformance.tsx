"use client";
import { VAS, SOURCE_ROWS } from "@/lib/data";
import Avatar from "@/components/Avatar";
import { ChevronDown, Filter } from "lucide-react";

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

export default function VAPerformance() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Filter row */}
      <div className="flex items-center gap-2 px-6 py-2.5 border-b border-gray-100 bg-white">
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          <Filter size={11} /> Filter: March 2026
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
          Group by VA <ChevronDown size={10} />
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
          Sort by conversion <ChevronDown size={10} />
        </button>
        <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
          <span className="text-red-400">🔴</span> March 2026 — filtered
        </span>
      </div>

      <div className="p-6">
        {/* VA Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {VAS.map(va => (
            <div key={va.id} className="bg-white rounded-2xl p-4 shadow-card border border-gray-100">
              {/* VA header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Avatar initials={va.initials} color={va.color} size={36} />
                  <div>
                    <p className="text-sm font-bold text-gray-800 font-display">{va.name}</p>
                    <p className="text-[11px] text-gray-400">{va.role}</p>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">{va.shift}</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: "Leads contacted", value: va.leadsContacted },
                  { label: "Booked", value: va.booked },
                  { label: "Conversion", value: `${va.conversionRate}%` },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-xl font-bold font-display text-gray-800">{s.value}</p>
                    <p className="text-[10px] text-gray-400 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Conversion progress */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>Conversion rate</span>
                  <span className="font-semibold" style={{ color: va.color }}>{va.conversionRate}%</span>
                </div>
                <ProgressBar value={va.conversionRate} color={va.color} />
              </div>

              {/* Second stats row */}
              <div className="grid grid-cols-3 gap-2 mb-3 py-2 border-t border-gray-50">
                {[
                  { label: "Total calls", value: va.totalCalls },
                  { label: "In Nurture", value: va.inNurture },
                  { label: "Lost", value: va.lost },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-base font-bold font-display text-gray-700">{s.value}</p>
                    <p className="text-[10px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Source tags */}
              <div className="flex flex-wrap gap-1">
                {va.sources.map(s => (
                  <span key={s.label} className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: va.color + "15", color: va.color }}>
                    {s.label} +{s.count}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Source performance table */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <p className="text-sm font-bold font-display text-gray-800">Lead source performance — March 2026</p>
            <span className="text-xs text-gray-400">All sources · Grouped by origin</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {["Source","Leads","Contacted","Booked","In Nurture","Lost","Conversion Rate","Top VA"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SOURCE_ROWS.map((row, i) => (
                <tr key={row.source} className={`border-t border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ background: "#FFF7ED", color: "#C2570A" }}>
                      {row.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-700">{row.leads}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.contacted}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.booked}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{row.inNurture}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.lost}</td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <ProgressBar
                          value={row.conversionRate}
                          color={row.conversionRate >= 40 ? "#16A34A" : row.conversionRate >= 25 ? "#D97706" : "#9CA3AF"}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-8 text-right">{row.conversionRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Avatar initials={row.topVAInitials} color={row.topVAColor} size={20} />
                      <span className="text-xs text-gray-600">{row.topVA}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr className="border-t-2 border-gray-200 bg-gray-50">
                <td className="px-4 py-3 text-xs font-bold text-gray-800">Total</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-800">34</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-800">34</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-800">13</td>
                <td className="px-4 py-3 text-sm font-bold text-blue-600">15</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-800">6</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1"><ProgressBar value={38} color="#1E1E2E" /></div>
                    <span className="text-xs font-bold text-gray-800 w-8 text-right">38%</span>
                  </div>
                </td>
                <td className="px-4 py-3" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
