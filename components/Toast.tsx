"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Info, X } from "lucide-react";

export interface ToastItem {
  id: number;
  message: string;
  type?: "success" | "info" | "warning";
}

interface Props {
  toasts: ToastItem[];
  onRemove: (id: number) => void;
}

export default function ToastContainer({ toasts, onRemove }: Props) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <ToastBubble key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastBubble({ toast, onRemove }: { toast: ToastItem; onRemove: (id: number) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 2800);
    return () => { cancelAnimationFrame(show); clearTimeout(hide); };
  }, [toast.id, onRemove]);

  const bg = toast.type === "warning" ? "#FFF7ED" : toast.type === "info" ? "#EFF6FF" : "#F0FDF4";
  const border = toast.type === "warning" ? "#FED7AA" : toast.type === "info" ? "#BFDBFE" : "#BBF7D0";
  const iconColor = toast.type === "warning" ? "#F97316" : toast.type === "info" ? "#2563EB" : "#16A34A";

  return (
    <div
      className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border text-sm font-medium transition-all duration-300"
      style={{
        background: bg,
        borderColor: border,
        color: "#1F2937",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
        minWidth: 240,
        maxWidth: 360,
      }}
    >
      <Info size={15} style={{ color: iconColor, flexShrink: 0 }} />
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onRemove(toast.id), 300); }}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={13} />
      </button>
    </div>
  );
}
