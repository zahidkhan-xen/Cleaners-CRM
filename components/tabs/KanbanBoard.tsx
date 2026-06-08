"use client";
import { LEADS } from "@/lib/data";
import type { Lead, Status } from "@/lib/data";
import StatusBadge from "@/components/StatusBadge";
import Avatar from "@/components/Avatar";
import { Phone, Plus } from "lucide-react";

const COLUMNS: { status: Status; label: string; color: string }[] = [
  { status: "Unclaimed",  label: "Unclaimed",   color: "#7C3AED" },
  { status: "New",        label: "New",          color: "#9CA3AF" },
  { status: "Follow-up",  label: "Follow-up",    color: "#D97706" },
  { status: "Nurture",    label: "In Nurture",   color: "#2563EB" },
  { status: "Booked",     label: "Booked",       color: "#16A34A" },
  { status: "Lost",       label: "Lost",         color: "#DC2626" },
];

interface Props {
  onLeadClick: (lead: Lead) => void;
  onNewLead: () => void;
}

export default function KanbanBoard({ onLeadClick, onNewLead }: Props) {
  return (
    <div className="flex h-full overflow-x-auto gap-4 p-5 bg-gray-50/50">
      {COLUMNS.map(({ status, label, color }) => {
        const leads = LEADS.filter(l => l.status === status);
        return (
          <div key={status} className="flex flex-col w-60 shrink-0">
            {/* Column header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-sm font-bold text-gray-700">{label}</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: color + "20", color }}>
                {leads.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto">
              {leads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => onLeadClick(lead)}
                  className="w-full text-left bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-150 border border-gray-100 hover:border-orange-200 active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-2.5">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{lead.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{lead.createdAt}</p>
                    </div>
                    <Avatar initials={lead.vaInitials} color={lead.vaColor} size={24} />
                  </div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Phone size={10} className="text-gray-300" />
                    <span className="text-xs text-gray-500">{lead.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ background: "#FFF7ED", color: "#C2570A" }}>
                      {lead.source}
                    </span>
                    {lead.attempts > 0 && (
                      <span className="text-xs text-gray-400">{lead.attempts} att.</span>
                    )}
                  </div>
                  {lead.aiSummary && (
                    <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed">{lead.aiSummary}</p>
                  )}
                </button>
              ))}

              {/* Empty state */}
              {leads.length === 0 && (
                <div className="flex flex-col items-center justify-center h-24 rounded-2xl border-2 border-dashed border-gray-200 gap-1">
                  <span className="text-sm text-gray-300 font-medium">No leads</span>
                </div>
              )}

              {/* Add card */}
              <button
                onClick={onNewLead}
                className="w-full py-2.5 rounded-xl border border-dashed border-gray-200 text-sm text-gray-400 hover:border-orange-300 hover:text-orange-500 transition-colors flex items-center justify-center gap-1.5 font-medium"
              >
                <Plus size={13} /> Add lead
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
