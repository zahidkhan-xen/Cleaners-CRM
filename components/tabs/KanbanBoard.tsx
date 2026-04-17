"use client";
import { LEADS } from "@/lib/data";
import type { Lead, Status } from "@/lib/data";
import StatusBadge from "@/components/StatusBadge";
import Avatar from "@/components/Avatar";
import { Phone } from "lucide-react";

const COLUMNS: { status: Status; label: string; color: string }[] = [
  { status: "Unclaimed",  label: "Unclaimed",     color: "#7C3AED" },
  { status: "New",        label: "New",            color: "#9CA3AF" },
  { status: "Follow-up",  label: "Follow-up",      color: "#D97706" },
  { status: "Nurture",    label: "In Nurture",     color: "#2563EB" },
  { status: "Booked",     label: "Booked",         color: "#16A34A" },
  { status: "Lost",       label: "Lost",           color: "#DC2626" },
];

interface Props {
  onLeadClick: (lead: Lead) => void;
}

export default function KanbanBoard({ onLeadClick }: Props) {
  return (
    <div className="flex h-full overflow-x-auto gap-3 p-4">
      {COLUMNS.map(({ status, label, color }) => {
        const leads = LEADS.filter(l => l.status === status);
        return (
          <div key={status} className="flex flex-col w-56 shrink-0">
            {/* Column header */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span className="text-xs font-semibold text-gray-700">{label}</span>
              </div>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: color + "20", color }}>
                {leads.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {leads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => onLeadClick(lead)}
                  className="w-full text-left bg-white rounded-xl p-3 shadow-card hover:shadow-card-hover transition-all duration-150 border border-gray-100 hover:border-orange-200 active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{lead.name}</p>
                      <p className="text-[10px] text-gray-400">{lead.createdAt}</p>
                    </div>
                    <Avatar initials={lead.vaInitials} color={lead.vaColor} size={20} />
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Phone size={9} className="text-gray-300" />
                    <span className="text-[10px] text-gray-500">{lead.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: "#FFF7ED", color: "#C2570A" }}>
                      {lead.source}
                    </span>
                    {lead.attempts > 0 && (
                      <span className="text-[10px] text-gray-400">{lead.attempts} attempts</span>
                    )}
                  </div>
                  {lead.aiSummary && (
                    <p className="mt-1.5 text-[10px] text-gray-400 line-clamp-2">{lead.aiSummary}</p>
                  )}
                </button>
              ))}

              {/* Empty state */}
              {leads.length === 0 && (
                <div className="flex items-center justify-center h-20 rounded-xl border-2 border-dashed border-gray-100">
                  <span className="text-[11px] text-gray-300">No leads</span>
                </div>
              )}

              {/* Add card */}
              <button className="w-full py-2 rounded-lg border border-dashed border-gray-200 text-[11px] text-gray-400 hover:border-orange-300 hover:text-orange-500 transition-colors">
                + Add lead
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
