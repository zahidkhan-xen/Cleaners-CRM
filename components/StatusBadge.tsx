import type { Status } from "@/lib/data";

const CONFIG: Record<Status, { bg: string; text: string; dot: string; label: string }> = {
  Booked:    { bg: "#DCFCE7", text: "#15803D", dot: "#16A34A", label: "✓ Booked" },
  "Follow-up": { bg: "#FEF3C7", text: "#92400E", dot: "#D97706", label: "↩ Follow-up" },
  Nurture:   { bg: "#DBEAFE", text: "#1E40AF", dot: "#2563EB", label: "★ Nurture" },
  Lost:      { bg: "#FEE2E2", text: "#991B1B", dot: "#DC2626", label: "✕ Lost" },
  New:       { bg: "#F3F4F6", text: "#374151", dot: "#9CA3AF", label: "• New" },
  Unclaimed: { bg: "#F5F3FF", text: "#5B21B6", dot: "#7C3AED", label: "◎ Unclaimed" },
};

export default function StatusBadge({ status }: { status: Status }) {
  const c = CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={{ background: c.bg, color: c.text }}
    >
      {c.label}
    </span>
  );
}
