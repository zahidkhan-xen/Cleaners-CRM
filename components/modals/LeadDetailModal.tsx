"use client";
import { useState } from "react";
import { X, Phone, MessageSquare, Calendar, Edit3, CheckCircle } from "lucide-react";
import type { Lead } from "@/lib/data";
import StatusBadge from "@/components/StatusBadge";
import Avatar from "@/components/Avatar";
import type { ToastItem } from "@/components/Toast";

interface Props {
  lead: Lead;
  onClose: () => void;
  showToast: (message: string, type?: ToastItem["type"]) => void;
}

const RESULT_COLOR: Record<string, string> = {
  Answered: "#16A34A",
  Scheduled: "#2563EB",
  "No answer": "#DC2626",
  Voicemail: "#D97706",
};

export default function LeadDetailModal({ lead, onClose, showToast }: Props) {
  const [notes, setNotes] = useState(lead.aiSummary ?? "");
  const [notesSaved, setNotesSaved] = useState(false);

  function saveNotes() {
    setNotesSaved(true);
    showToast("Notes saved successfully!", "success");
    setTimeout(() => setNotesSaved(false), 2000);
  }

  function handleCall() {
    showToast(`Calling ${lead.name} at ${lead.phone}…`, "info");
  }

  function handleSMS() {
    showToast(`Opening SMS thread with ${lead.name}…`, "info");
  }

  function handleBook() {
    showToast(`${lead.name} booking scheduled!`, "success");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar initials={lead.vaInitials} color={lead.vaColor} size={44} />
            <div>
              <h2 className="text-lg font-bold font-display text-gray-900">{lead.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Phone size={12} className="text-gray-400" />
                <span className="text-sm text-gray-500">{lead.phone}</span>
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
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4">
              {[
                { label: "Source",      value: lead.source },
                { label: "Assigned VA", value: lead.assignedVA },
                { label: "Created",     value: lead.createdAt },
                { label: "Attempts",    value: String(lead.attempts) },
                { label: "Quoted",      value: lead.quoted ? "Yes" : "No" },
                { label: "Scheduled",   value: lead.scheduledDate ?? "—" },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{f.label}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{f.value}</p>
                </div>
              ))}
            </div>

            {/* AI Summary */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">AI Call Summary</p>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-gray-700 leading-relaxed">{lead.aiSummary || "No summary available yet."}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleCall}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
              >
                <Phone size={14} /> Call
              </button>
              <button
                onClick={handleSMS}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                <MessageSquare size={14} /> SMS
              </button>
              <button
                onClick={handleBook}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-95"
                style={{ background: "#F97316" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#EA6C0A")}
                onMouseLeave={e => (e.currentTarget.style.background = "#F97316")}
              >
                <Calendar size={14} /> Book
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Call log */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Call Log</p>
              <div className="flex flex-col gap-1.5">
                {lead.callLog.length === 0 && (
                  <p className="text-sm text-gray-400">No calls logged yet.</p>
                )}
                {lead.callLog.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gray-50">
                    <Phone size={12} style={{ color: RESULT_COLOR[c.result] }} />
                    <span className="text-sm text-gray-500">{c.date} · {c.time}</span>
                    <span className="ml-auto text-xs font-bold" style={{ color: RESULT_COLOR[c.result] }}>{c.result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nurture log */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Nurture Log</p>
              <div className="flex flex-col gap-1.5">
                {lead.nurtureLog.length === 0 && (
                  <p className="text-sm text-gray-400">Not in nurture sequence.</p>
                )}
                {lead.nurtureLog.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 py-2 px-3 rounded-lg bg-blue-50/50">
                    <MessageSquare size={12} className="text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-700">{n.date}</p>
                      {n.message && <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit notes */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Notes</p>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none transition-all"
                placeholder="Add notes..."
              />
              <button
                onClick={saveNotes}
                className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: notesSaved ? "#16A34A" : "#F97316" }}
              >
                {notesSaved ? <CheckCircle size={13} /> : <Edit3 size={13} />}
                {notesSaved ? "Saved!" : "Save notes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
