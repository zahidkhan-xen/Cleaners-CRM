"use client";
import { LEADS } from "@/lib/data";
import type { Lead, Status } from "@/lib/data";
import LeadRow from "@/components/LeadRow";
import { Plus } from "lucide-react";

interface Props {
  filterStatus: Status | Status[];
  emptyMessage: string;
  onLeadClick: (lead: Lead) => void;
  onNewLead: () => void;
}

export default function FilteredLeads({ filterStatus, emptyMessage, onLeadClick, onNewLead }: Props) {
  const statuses = Array.isArray(filterStatus) ? filterStatus : [filterStatus];
  const filtered = LEADS.filter(l => statuses.includes(l.status));

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-100 bg-white">
        <span className="text-base font-bold text-gray-800">{filtered.length} leads</span>
        <span className="text-sm text-gray-400">matching current filter</span>
        <button
          onClick={onNewLead}
          className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 active:scale-95"
          style={{ background: "#F97316" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#EA6C0A")}
          onMouseLeave={e => (e.currentTarget.style.background = "#F97316")}
        >
          <Plus size={14} /> New Lead
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400">
            <p className="text-base">{emptyMessage}</p>
            <button
              onClick={onNewLead}
              className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              + Add a lead
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50 sticky top-0 z-10">
                <th className="pl-4 pr-2 py-3 w-8"><input type="checkbox" className="rounded border-gray-300 w-4 h-4" /></th>
                {["Client name","Phone","Source","Status","Assigned VA","Att.","Quote","Call log","AI call summary","Nurture log"].map(h => (
                  <th key={h} className="px-3 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map(lead => (
                <LeadRow key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
              ))}
            </tbody>
          </table>
        )}
        {filtered.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100">
            <button
              onClick={onNewLead}
              className="text-sm text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1.5 font-medium"
            >
              <span className="text-xl leading-none font-light">+</span> Add record
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
