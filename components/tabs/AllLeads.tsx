"use client";
import { LEADS } from "@/lib/data";
import type { Lead } from "@/lib/data";
import LeadRow from "@/components/LeadRow";
import { TrendingUp, Users, Calendar, AlertCircle } from "lucide-react";

const STATS = [
  { label: "Leads this month", value: "34", icon: <Users size={14} />, color: "#F97316" },
  { label: "Contacted",        value: "13", icon: <TrendingUp size={14} />, color: "#2563EB" },
  { label: "Follow-up",        value: "5",  icon: <AlertCircle size={14} />, color: "#D97706" },
  { label: "Conversion",       value: "38%",icon: <Calendar size={14} />, color: "#16A34A" },
];

interface Props {
  onLeadClick: (lead: Lead) => void;
}

export default function AllLeads({ onLeadClick }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Stats row */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-100 bg-white">
        {STATS.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <span style={{ color: s.color }}>{s.icon}</span>
            <span className="text-lg font-bold font-display" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs text-gray-400">{s.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">Facebook</span>
          <span className="text-gray-300">|</span>
          <span>Source filter</span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50 sticky top-0 z-10">
              <th className="pl-4 pr-2 py-2 w-8"><input type="checkbox" className="rounded border-gray-300" /></th>
              {["Client name","Phone","Source","Status","Assigned VA","Att.","Quote","Call log","AI call summary","Nurture log"].map(h => (
                <th key={h} className="px-3 py-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {LEADS.map(lead => (
              <LeadRow key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
            ))}
          </tbody>
        </table>
        {/* Add record */}
        <div className="px-6 py-3 border-t border-gray-100">
          <button className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1">
            <span className="text-lg leading-none">+</span> Add record
          </button>
        </div>
      </div>
    </div>
  );
}
