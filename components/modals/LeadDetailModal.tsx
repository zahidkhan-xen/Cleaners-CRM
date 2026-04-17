"use client";
import { X, Phone, MessageSquare, Calendar, Edit3 } from "lucide-react";
import type { Lead } from "@/lib/data";
import StatusBadge from "@/components/StatusBadge";
import Avatar from "@/components/Avatar";

interface Props { lead: Lead; onClose: () => void; }

const RESULT_COLOR: Record<string, string> = {
  Answered: "#16A34A",
  Scheduled: "#2563EB",
  "No answer": "#DC2626",
  Voicemail: "#D97706",
};

export default function LeadDetailModal({ lead, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.45)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar initials={lead.vaInitials} color={lead.vaColor} size={40} />
            <div>
              <h2 className="text-base font-bold font-display text-gray-900">{lead.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Phone size={11} className="text-gray-400" />
                <span className="text-xs text-gray-500">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={lead.status} />
            <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {/* Info grid */}
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-3">
              {[
                { label: "Source",     value: lead.source },
                { label: "Assigned VA",value: lead.assignedVA },
                { label: "Created",    value: lead.createdAt },
                { label: "Attempts",   value: String(lead.attempts) },
                { label: "Quoted",     value: lead.quoted ? "Yes" : "No" },
                { label: "Scheduled",  value: lead.scheduledDate ?? "—" },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{f.label}</p>
                  <p className="text-xs font-medium text-gray-800 mt-0.5">{f.value}</p>
                </div>
              ))}
            </div>

            {/* AI Summary */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">AI Call Summary</p>
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-gray-700 leading-relaxed">{lead.aiSummary || "No summary available yet."}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Phone size={12} /> Call
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <MessageSquare size={12} /> SMS
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-150"
                style={{ background: "#F97316" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#EA6C0A")}
                onMouseLeave={e => (e.currentTarget.style.background = "#F97316")}
              >
                <Calendar size={12} /> Book
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Call log */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Call Log</p>
              <div className="flex flex-col gap-1.5">
                {lead.callLog.length === 0 && (
                  <p className="text-xs text-gray-400">No calls logged yet.</p>
                )}
                {lead.callLog.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-gray-50">
                    <Phone size={11} style={{ color: RESULT_COLOR[c.result] }} />
                    <span className="text-xs text-gray-500">{c.date} · {c.time}</span>
                    <span className="ml-auto text-[11px] font-semibold" style={{ color: RESULT_COLOR[c.result] }}>{c.result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nurture log */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nurture Log</p>
              <div className="flex flex-col gap-1.5">
                {lead.nurtureLog.length === 0 && (
                  <p className="text-xs text-gray-400">Not in nurture sequence.</p>
                )}
                {lead.nurtureLog.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 px-3 rounded-lg bg-blue-50/50">
                    <MessageSquare size={11} className="text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-blue-700">{n.date}</p>
                      {n.message && <p className="text-[11px] text-gray-500">{n.message}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit notes */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Notes</p>
              <textarea
                rows={3}
                defaultValue={lead.aiSummary}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 resize-none transition-all"
                placeholder="Add notes..."
              />
              <button className="mt-1.5 flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 transition-colors font-medium">
                <Edit3 size={11} /> Save notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
