"use client";
import { Bell, ChevronDown, Filter, Plus, Zap } from "lucide-react";

const TABS = [
  { label: "All Leads",         tab: "all" },
  { label: "New — Unclaimed",   tab: "unclaimed" },
  { label: "Follow-up Needed",  tab: "followup" },
  { label: "In Nurture",        tab: "nurture" },
  { label: "VA Performance",    tab: "va" },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewLead: () => void;
}

export default function TopBar({ activeTab, onTabChange, onNewLead }: Props) {
  return (
    <header className="bg-white border-b border-gray-100 shrink-0">
      {/* Top row */}
      <div className="flex items-center justify-between px-6 py-2.5">
        {/* Tabs */}
        <nav className="flex items-center gap-1">
          {TABS.map(({ label, tab }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 relative"
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
          <button className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
            <Plus size={12} /> Add view
          </button>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <Zap size={13} style={{ color: "#F97316" }} /> Automations
          </button>
          <button
            onClick={onNewLead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white transition-all duration-150 active:scale-95"
            style={{ background: "#F97316" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#EA6C0A")}
            onMouseLeave={e => (e.currentTarget.style.background = "#F97316")}
          >
            <Plus size={13} /> New Lead
          </button>
        </div>
      </div>

      {/* Filter row — only for non-VA tabs */}
      {activeTab !== "va" && (
        <div className="flex items-center gap-2 px-6 py-1.5 border-t border-gray-50">
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={11} /> Filter: March 2026
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-500 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 8h6M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Sort
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-500 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            Group
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-500 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Tall rows
          </button>
          <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
            <span className="text-red-400">🔴</span> March 2026 — filtered
          </span>
        </div>
      )}
    </header>
  );
}
