"use client";
import { Phone, MessageSquare, ChevronDown } from "lucide-react";
import type { Lead } from "@/lib/data";
import StatusBadge from "./StatusBadge";
import Avatar from "./Avatar";

interface Props {
  lead: Lead;
  onClick: () => void;
}

const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
  "Facebook Ads":  { bg: "#EFF6FF", text: "#1D4ED8" },
  "LSA (Google)":  { bg: "#F0FDF4", text: "#15803D" },
  "Website Form":  { bg: "#FFF7ED", text: "#C2570A" },
  "Coupon":        { bg: "#FDF4FF", text: "#7E22CE" },
  "Inbound SMS":   { bg: "#F0FDF4", text: "#065F46" },
  "Referral":      { bg: "#FFF1F2", text: "#BE123C" },
};

export default function LeadRow({ lead, onClick }: Props) {
  const srcStyle = SOURCE_COLORS[lead.source] ?? { bg: "#F3F4F6", text: "#374151" };

  return (
    <tr
      className="border-b border-gray-50 hover:bg-orange-50/30 cursor-pointer transition-colors duration-100 group"
      onClick={onClick}
    >
      {/* Checkbox */}
      <td className="pl-4 pr-2 py-2.5 w-8">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
          onClick={e => e.stopPropagation()}
        />
      </td>

      {/* Client name + date */}
      <td className="px-3 py-2.5 min-w-[160px]">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">{lead.name}</p>
        <p className="text-[11px] text-gray-400">{lead.createdAt}</p>
      </td>

      {/* Phone */}
      <td className="px-3 py-2.5 min-w-[130px]">
        <div className="flex items-center gap-1.5">
          <Phone size={11} className="text-gray-300" />
          <span className="text-xs text-gray-600">{lead.phone}</span>
        </div>
      </td>

      {/* Source */}
      <td className="px-3 py-2.5">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium" style={{ background: srcStyle.bg, color: srcStyle.text }}>
          {lead.source}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-2.5">
        <StatusBadge status={lead.status} />
      </td>

      {/* Assigned VA */}
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <Avatar initials={lead.vaInitials} color={lead.vaColor} size={22} />
          <span className="text-xs text-gray-600">{lead.assignedVA}</span>
        </div>
      </td>

      {/* Attempts */}
      <td className="px-3 py-2.5 text-center">
        <span className="text-xs font-semibold text-gray-700">{lead.attempts}</span>
      </td>

      {/* Quoted */}
      <td className="px-3 py-2.5 text-center">
        <span className={`text-xs font-bold ${lead.quoted ? "text-green-600" : "text-red-400"}`}>
          {lead.quoted ? "YES" : "NO"}
        </span>
      </td>

      {/* Call log */}
      <td className="px-3 py-2.5 min-w-[140px]">
        <div className="flex flex-col gap-0.5">
          {lead.callLog.slice(0, 2).map((c, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-[10px] text-gray-400">{c.date} {c.time}</span>
              <span className={`text-[10px] font-semibold ${c.result === "Answered" || c.result === "Scheduled" ? "text-green-600" : "text-red-400"}`}>
                {c.result}
              </span>
            </div>
          ))}
          {lead.callLog.length === 0 && <span className="text-[10px] text-gray-300">No calls yet</span>}
        </div>
      </td>

      {/* AI summary */}
      <td className="px-3 py-2.5 max-w-[220px]">
        <p className="text-[11px] text-gray-500 line-clamp-2">{lead.aiSummary || "—"}</p>
      </td>

      {/* Nurture */}
      <td className="px-3 py-2.5 min-w-[140px]">
        <div className="flex flex-col gap-0.5">
          {lead.nurtureLog.slice(0, 2).map((n, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-[10px] text-blue-500">{n.date}</span>
              {n.message && <span className="text-[10px] text-gray-400">{n.message}</span>}
            </div>
          ))}
          {lead.nurtureLog.length === 0 && <span className="text-[10px] text-gray-300">Not inquired</span>}
        </div>
      </td>
    </tr>
  );
}
