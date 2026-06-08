"use client";
import { LayoutGrid, Users, UserCheck, Bell, Calendar, Kanban, BarChart2, Settings, ChevronDown } from "lucide-react";

type Tab = string;

const VIEWS: { label: string; icon: React.ReactNode; tab: Tab }[] = [
  { label: "Analytics",          icon: <BarChart2 size={15} />, tab: "analytics" },
  { label: "All Leads",          icon: <Users size={15} />,    tab: "all" },
  { label: "New — Unclaimed",    icon: <Bell size={15} />,     tab: "unclaimed" },
  { label: "Follow-up Needed",   icon: <UserCheck size={15} />, tab: "followup" },
  { label: "In Nurture",         icon: <LayoutGrid size={15} />, tab: "nurture" },
  { label: "Booked This Month",  icon: <Calendar size={15} />, tab: "booked" },
  { label: "Pipeline Kanban",    icon: <Kanban size={15} />,   tab: "kanban" },
  { label: "VA Performance",     icon: <BarChart2 size={15} />, tab: "va" },
];

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: Props) {
  return (
    <aside className="w-[200px] shrink-0 h-screen flex flex-col" style={{ background: "#1E1E2E" }}>
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: "#F97316" }}>
            CP
          </div>
          <span className="text-white font-semibold text-sm font-display">CleanPro CRM</span>
        </div>
      </div>

      {/* Tables section */}
      <div className="px-3 pt-4 pb-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold px-2 mb-1" style={{ color: "#5A5A7A" }}>Tables</p>
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left" style={{ background: "#2F2F45", color: "#E0E0F0" }}>
          <Kanban size={13} style={{ color: "#F97316" }} />
          <span className="text-sm font-semibold">Lead Pipeline</span>
        </button>
      </div>

      {/* Views section */}
      <div className="px-3 pt-3 flex-1 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest font-semibold px-2 mb-1" style={{ color: "#5A5A7A" }}>Views</p>
        <nav className="flex flex-col gap-0.5">
          {VIEWS.map(({ label, icon, tab }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors duration-150"
                style={{
                  background: isActive ? "#2F2F45" : "transparent",
                  color: isActive ? "#FFFFFF" : "#A0A0C0",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#2A2A3E"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{ color: isActive ? "#F97316" : "#6060A0" }}>{icon}</span>
                <span className="text-sm">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "#F97316" }}>A</div>
          <span className="text-sm" style={{ color: "#A0A0C0" }}>Admin</span>
          <Settings size={12} className="ml-auto cursor-pointer" style={{ color: "#5A5A7A" }} />
        </div>
        <div className="flex gap-1 mt-2 px-2">
          {["Airtable","OpenPhone","Twilio"].map(t => (
            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#2A2A3E", color: "#6060A0" }}>{t}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}
