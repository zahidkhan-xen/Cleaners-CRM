"use client";
import { useState } from "react";
import { VAS, SOURCE_ROWS } from "@/lib/data";
import Avatar from "@/components/Avatar";
import { ChevronDown, Filter, Download, Mail } from "lucide-react";
import type { ToastItem } from "@/components/Toast";

interface Props {
  showToast: (message: string, type?: ToastItem["type"]) => void;
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

const MONTHS = ["January 2026", "February 2026", "March 2026"];
const SORT_OPTIONS = ["Conversion rate", "Total leads", "Bookings", "Total calls"];

export default function VAPerformance({ showToast }: Props) {
  const [selectedMonth, setSelectedMonth] = useState("March 2026");
  const [sortBy, setSortBy] = useState("Conversion rate");
  const [showMonthDrop, setShowMonthDrop] = useState(false);
  const [showSortDrop, setShowSortDrop] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Filter row */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 bg-white">
        {/* Month dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowMonthDrop(v => !v); setShowSortDrop(false); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Filter size={12} /> {selectedMonth} <ChevronDown size={11} />
          </button>
          {showMonthDrop && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-20 min-w-[170px] py-1">
              {MONTHS.map(m => (
                <button
                  key={m}
                  onClick={() => { setSelectedMonth(m); setShowMonthDrop(false); showToast(`Showing data for ${m}`, "info"); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-700 transition-colors"
                  style={{ fontWeight: m === selectedMonth ? 700 : 400 }}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowSortDrop(v => !v); setShowMonthDrop(false); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Sort: {sortBy} <ChevronDown size={11} />
          </button>
          {showSortDrop && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-20 min-w-[160px] py-1">
              {SORT_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => { setSortBy(s); setShowSortDrop(false); showToast(`Sorted by ${s}`, "info"); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-700 transition-colors"
                  style={{ fontWeight: s === sortBy ? 700 : 400 }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => showToast("Sending performance report by email…", "info")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Mail size={13} /> Email Report
          </button>
          <button
            onClick={() => showToast("Downloading CSV report…", "success")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Download size={13} /> Export CSV
          </button>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            {selectedMonth} — filtered
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* VA Cards */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {VAS.map(va => (
            <div key={va.id} className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
              {/* VA header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={va.initials} color={va.color} size={40} />
                  <div>
                    <p className="text-base font-bold text-gray-800 font-display">{va.name}</p>
                    <p className="text-xs text-gray-400">{va.role}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 border border-gray-200 rounded-full px-2.5 py-1">{va.shift}</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Leads contacted", value: va.leadsContacted },
                  { label: "Booked", value: va.booked },
                  { label: "Conversion", value: `${va.conversionRate}%` },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-bold font-display text-gray-800">{s.value}</p>
                    <p className="text-xs text-gray-400 leading-tight mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Conversion progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Conversion rate</span>
                  <span className="font-bold" style={{ color: va.color }}>{va.conversionRate}%</span>
                </div>
                <ProgressBar value={va.conversionRate} color={va.color} />
              </div>

              {/* Second stats row */}
              <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-gray-50">
                {[
                  { label: "Total calls", value: va.totalCalls },
                  { label: "In Nurture", value: va.inNurture },
                  { label: "Lost", value: va.lost },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-xl font-bold font-display text-gray-700">{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Source tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {va.sources.map(s => (
                  <span key={s.label} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: va.color + "18", color: va.color }}>
                    {s.label} +{s.count}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2 border-t border-gray-50">
                <button
                  onClick={() => showToast(`Opening ${va.name}'s performance report…`, "info")}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  View Report
                </button>
                <button
                  onClick={() => showToast(`Messaging ${va.name}…`, "info")}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-150"
                  style={{ background: va.color }}
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Source performance table */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <p className="text-base font-bold font-display text-gray-800">Lead source performance — {selectedMonth}</p>
            <button
              onClick={() => showToast("Exporting source report…", "success")}
              className="text-sm text-gray-400 hover:text-orange-500 transition-colors font-medium"
            >
              Export
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {["Source","Leads","Contacted","Booked","In Nurture","Lost","Conversion Rate","Top VA"].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SOURCE_ROWS.map((row, i) => (
                <tr key={row.source} className={`border-t border-gray-50 hover:bg-orange-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold px-2.5 py-1 rounded-lg" style={{ background: "#FFF7ED", color: "#C2570A" }}>
                      {row.source}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-700">{row.leads}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{row.contacted}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">{row.booked}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-blue-600">{row.inNurture}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{row.lost}</td>
                  <td className="px-5 py-3.5 min-w-[130px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <ProgressBar
                          value={row.conversionRate}
                          color={row.conversionRate >= 40 ? "#16A34A" : row.conversionRate >= 25 ? "#D97706" : "#9CA3AF"}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700 w-8 text-right">{row.conversionRate}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Avatar initials={row.topVAInitials} color={row.topVAColor} size={22} />
                      <span className="text-sm text-gray-600">{row.topVA}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr className="border-t-2 border-gray-200 bg-gray-50">
                <td className="px-5 py-4 text-sm font-bold text-gray-800">Total</td>
                <td className="px-5 py-4 text-sm font-bold text-gray-800">34</td>
                <td className="px-5 py-4 text-sm font-bold text-gray-800">34</td>
                <td className="px-5 py-4 text-sm font-bold text-gray-800">13</td>
                <td className="px-5 py-4 text-sm font-bold text-blue-600">15</td>
                <td className="px-5 py-4 text-sm font-bold text-gray-800">6</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1"><ProgressBar value={38} color="#1E1E2E" /></div>
                    <span className="text-sm font-bold text-gray-800 w-8 text-right">38%</span>
                  </div>
                </td>
                <td className="px-5 py-4" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
