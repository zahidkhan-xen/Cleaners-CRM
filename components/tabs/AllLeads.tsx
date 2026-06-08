"use client";
import { useState } from "react";
import { LEADS } from "@/lib/data";
import type { Lead } from "@/lib/data";
import LeadRow from "@/components/LeadRow";
import { TrendingUp, Users, Calendar, AlertCircle, RefreshCw } from "lucide-react";
import type { ToastItem } from "@/components/Toast";

interface Props {
  onLeadClick: (lead: Lead) => void;
  onNewLead: () => void;
  showToast: (message: string, type?: ToastItem["type"]) => void;
}

export default function AllLeads({ onLeadClick, onNewLead, showToast }: Props) {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const STATS = [
    { label: "Leads this month", value: "34", icon: <Users size={16} />, color: "#F97316", bg: "#FFF7ED" },
    { label: "Contacted",        value: "13", icon: <TrendingUp size={16} />, color: "#2563EB", bg: "#EFF6FF" },
    { label: "Follow-up",        value: "5",  icon: <AlertCircle size={16} />, color: "#D97706", bg: "#FFFBEB" },
    { label: "Conversion",       value: "38%",icon: <Calendar size={16} />, color: "#16A34A", bg: "#F0FDF4" },
  ];

  function toggleAll() {
    if (allChecked) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(LEADS.map(l => l.id)));
    }
    setAllChecked(v => !v);
  }

  function toggleOne(id: string) {
    setCheckedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const anyChecked = checkedIds.size > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Stats row */}
      <div className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-100 bg-white">
        {STATS.map(s => (
          <div
            key={s.label}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
            style={{ background: s.bg, borderColor: s.color + "30" }}
          >
            <div className="p-1.5 rounded-lg" style={{ background: s.color + "20" }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <p className="text-xl font-bold font-display leading-none" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}

        {/* Bulk actions */}
        {anyChecked && (
          <div className="ml-4 flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
            <span className="text-sm font-semibold text-gray-700">{checkedIds.size} selected</span>
            <button
              onClick={() => showToast(`Reassigning ${checkedIds.size} lead(s)…`, "info")}
              className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Reassign VA
            </button>
            <button
              onClick={() => { setCheckedIds(new Set()); setAllChecked(false); showToast("Selection cleared"); }}
              className="px-3 py-1.5 rounded-lg text-sm border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => showToast("Lead data refreshed", "success")}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50 sticky top-0 z-10">
              <th className="pl-4 pr-2 py-3 w-8">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-400 w-4 h-4 cursor-pointer"
                />
              </th>
              {["Client name","Phone","Source","Status","Assigned VA","Att.","Quote","Call log","AI call summary","Nurture log"].map(h => (
                <th key={h} className="px-3 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {LEADS.map(lead => (
              <LeadRow
                key={lead.id}
                lead={lead}
                onClick={() => onLeadClick(lead)}
                checked={checkedIds.has(lead.id)}
                onCheck={() => toggleOne(lead.id)}
              />
            ))}
          </tbody>
        </table>

        {/* Add record */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onNewLead}
            className="text-sm text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1.5 font-medium"
          >
            <span className="text-xl leading-none font-light">+</span> Add record
          </button>
        </div>
      </div>
    </div>
  );
}
