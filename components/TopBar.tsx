"use client";
import { useState } from "react";
import { Filter, Plus, Zap, ArrowUpDown, LayoutGrid, AlignJustify, ChevronDown } from "lucide-react";
import type { ToastItem } from "@/components/Toast";

const TABS = [
  { label: "Analytics",         tab: "analytics" },
  { label: "All Leads",         tab: "all" },
  { label: "New — Unclaimed",   tab: "unclaimed" },
  { label: "Follow-up Needed",  tab: "followup" },
  { label: "In Nurture",        tab: "nurture" },
  { label: "VA Performance",    tab: "va" },
];

const MONTHS = ["January 2026", "February 2026", "March 2026", "April 2026", "May 2026"];
const SOURCES = ["All Sources", "Facebook Ads", "LSA (Google)", "Website Form", "Coupon", "Inbound SMS", "Referral"];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewLead: () => void;
  showToast: (message: string, type?: ToastItem["type"]) => void;
}

export default function TopBar({ activeTab, onTabChange, onNewLead, showToast }: Props) {
  const [selectedMonth, setSelectedMonth] = useState("March 2026");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [sortActive, setSortActive] = useState(false);
  const [groupActive, setGroupActive] = useState(false);
  const [tallRows, setTallRows] = useState(false);
  const [showMonthDrop, setShowMonthDrop] = useState(false);
  const [showSourceDrop, setShowSourceDrop] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 shrink-0">
      {/* Top row */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Tabs */}
        <nav className="flex items-center gap-0.5">
          {TABS.map(({ label, tab }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className="relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                style={{
                  color: isActive ? "#1E1E2E" : "#9CA3AF",
                  background: isActive ? "#F3F4F6" : "transparent",
                }}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full" style={{ background: "#F97316" }} />
                )}
              </button>
            );
          })}
          <button
            onClick={() => showToast("Custom views coming soon!", "info")}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Plus size={13} /> Add view
          </button>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("3 automations are currently running", "info")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Zap size={14} style={{ color: "#F97316" }} /> Automations
          </button>
          <button
            onClick={onNewLead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 active:scale-95"
            style={{ background: "#F97316" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#EA6C0A")}
            onMouseLeave={e => (e.currentTarget.style.background = "#F97316")}
          >
            <Plus size={14} /> New Lead
          </button>
        </div>
      </div>

      {/* Filter row — only for non-VA, non-analytics tabs */}
      {activeTab !== "va" && activeTab !== "analytics" && (
        <div className="flex items-center gap-2 px-6 py-2 border-t border-gray-50">

          {/* Month filter dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowMonthDrop(v => !v); setShowSourceDrop(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Filter size={12} /> {selectedMonth} <ChevronDown size={11} />
            </button>
            {showMonthDrop && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-20 min-w-[170px] py-1">
                {MONTHS.map(m => (
                  <button
                    key={m}
                    onClick={() => { setSelectedMonth(m); setShowMonthDrop(false); showToast(`Filtered to ${m}`, "info"); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-700 transition-colors"
                    style={{ fontWeight: m === selectedMonth ? 600 : 400 }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Source filter dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowSourceDrop(v => !v); setShowMonthDrop(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {selectedSource} <ChevronDown size={11} />
            </button>
            {showSourceDrop && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-20 min-w-[160px] py-1">
                {SOURCES.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSource(s); setShowSourceDrop(false); showToast(`Source filter: ${s}`, "info"); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-700 transition-colors"
                    style={{ fontWeight: s === selectedSource ? 600 : 400 }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort */}
          <button
            onClick={() => { setSortActive(v => !v); showToast(sortActive ? "Sort cleared" : "Sorted by date (newest first)", "info"); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors"
            style={{
              background: sortActive ? "#FFF7ED" : "transparent",
              borderColor: sortActive ? "#FED7AA" : "transparent",
              color: sortActive ? "#C2570A" : "#6B7280",
            }}
          >
            <ArrowUpDown size={12} /> Sort{sortActive ? " ✓" : ""}
          </button>

          {/* Group */}
          <button
            onClick={() => { setGroupActive(v => !v); showToast(groupActive ? "Grouping removed" : "Grouped by status", "info"); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors"
            style={{
              background: groupActive ? "#FFF7ED" : "transparent",
              borderColor: groupActive ? "#FED7AA" : "transparent",
              color: groupActive ? "#C2570A" : "#6B7280",
            }}
          >
            <LayoutGrid size={12} /> Group{groupActive ? " ✓" : ""}
          </button>

          {/* Tall rows */}
          <button
            onClick={() => setTallRows(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors"
            style={{
              background: tallRows ? "#FFF7ED" : "transparent",
              borderColor: tallRows ? "#FED7AA" : "transparent",
              color: tallRows ? "#C2570A" : "#6B7280",
            }}
          >
            <AlignJustify size={12} /> {tallRows ? "Compact" : "Tall rows"}
          </button>

          <span className="ml-auto flex items-center gap-1.5 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            {selectedMonth} — {selectedSource !== "All Sources" ? selectedSource : "all sources"}
          </span>
        </div>
      )}
    </header>
  );
}
