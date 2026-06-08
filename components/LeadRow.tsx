"use client";
import { Phone } from "lucide-react";
import type { Lead } from "@/lib/data";
import StatusBadge from "./StatusBadge";
import Avatar from "./Avatar";

interface Props {
  lead: Lead;
  onClick: () => void;
  checked?: boolean;
  onCheck?: () => void;
}

const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
  "Facebook Ads":  { bg: "#EFF6FF", text: "#1D4ED8" },
  "LSA (Google)":  { bg: "#F0FDF4", text: "#15803D" },
  "Website Form":  { bg: "#FFF7ED", text: "#C2570A" },
  "Coupon":        { bg: "#FDF4FF", text: "#7E22CE" },
  "Inbound SMS":   { bg: "#F0FDF4", text: "#065F46" },
  "Referral":      { bg: "#FFF1F2", text: "#BE123C" },
};

export default function LeadRow({ lead, onClick, checked, onCheck }: Props) {
  const srcStyle = SOURCE_COLORS[lead.source] ?? { bg: "#F3F4F6", text: "#374151" };

  return (
    <tr
      className="border-b border-gray-50 hover:bg-orange-50/40 cursor-pointer transition-colors duration-100 group"
      style={{ background: checked ? "#FFF7ED" : undefined }}
      onClick={onClick}
    >
      {/* Checkbox */}
      <td className="pl-4 pr-2 py-3 w-8">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="rounded border-gray-300 text-orange-500 focus:ring-orange-400 w-4 h-4 cursor-pointer"
          onClick={e => e.stopPropagation()}
        />
      </td>

      {/* Client name + date */}
      <td className="px-3 py-3 min-w-[160px]">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">{lead.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{lead.createdAt}</p>
      </td>

      {/* Phone */}
      <td className="px-3 py-3 min-w-[140px]">
        <div className="flex items-center gap-1.5">
          <Phone size={12} className="text-gray-300" />
          <span className="text-sm text-gray-600">{lead.phone}</span>
        </div>
      </td>

      {/* Source */}
      <td className="px-3 py-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold" style={{ background: srcStyle.bg, color: srcStyle.text }}>
          {lead.source}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <StatusBadge status={lead.status} />
      </td>

      {/* Assigned VA */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-1.5">
          <Avatar initials={lead.vaInitials} color={lead.vaColor} size={24} />
          <span className="text-sm text-gray-600">{lead.assignedVA}</span>
        </div>
      </td>

      {/* Attempts */}
      <td className="px-3 py-3 text-center">
        <span className="text-sm font-bold text-gray-700">{lead.attempts}</span>
      </td>

      {/* Quoted */}
      <td className="px-3 py-3 text-center">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
          style={{
            background: lead.quoted ? "#DCFCE7" : "#FEE2E2",
            color: lead.quoted ? "#15803D" : "#DC2626",
          }}
        >
          {lead.quoted ? "YES" : "NO"}
        </span>
      </td>

      {/* Call log */}
      <td className="px-3 py-3 min-w-[150px]">
        <div className="flex flex-col gap-1">
          {lead.callLog.slice(0, 2).map((c, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">{c.date}</span>
              <span className={`text-xs font-semibold ${c.result === "Answered" || c.result === "Scheduled" ? "text-green-600" : "text-red-400"}`}>
                {c.result}
              </span>
            </div>
          ))}
          {lead.callLog.length === 0 && <span className="text-xs text-gray-300">No calls yet</span>}
        </div>
      </td>

      {/* AI summary */}
      <td className="px-3 py-3 max-w-[220px]">
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{lead.aiSummary || "—"}</p>
      </td>

      {/* Nurture */}
      <td className="px-3 py-3 min-w-[150px]">
        <div className="flex flex-col gap-1">
          {lead.nurtureLog.slice(0, 2).map((n, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs text-blue-500 font-medium">{n.date}</span>
              {n.message && <span className="text-xs text-gray-400">{n.message}</span>}
            </div>
          ))}
          {lead.nurtureLog.length === 0 && <span className="text-xs text-gray-300">Not in nurture</span>}
        </div>
      </td>
    </tr>
  );
}
