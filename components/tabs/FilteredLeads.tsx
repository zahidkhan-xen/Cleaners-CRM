"use client";
import { LEADS } from "@/lib/data";
import type { Lead, Status } from "@/lib/data";
import LeadRow from "@/components/LeadRow";

interface Props {
  filterStatus: Status | Status[];
  emptyMessage: string;
  onLeadClick: (lead: Lead) => void;
}

export default function FilteredLeads({ filterStatus, emptyMessage, onLeadClick }: Props) {
  const statuses = Array.isArray(filterStatus) ? filterStatus : [filterStatus];
  const filtered = LEADS.filter(l => statuses.includes(l.status));

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-2.5 border-b border-gray-100 bg-white">
        <span className="text-sm font-semibold text-gray-700">{filtered.length} leads</span>
        <span className="text-xs text-gray-400">matching current filter</span>
      </div>
      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <p className="text-sm">{emptyMessage}</p>
          </div>
        ) : (
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
              {filtered.map(lead => (
                <LeadRow key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
