"use client";
import { X } from "lucide-react";

interface Props { onClose: () => void; }

const SOURCES = ["Facebook Ads","LSA (Google)","Website Form","Coupon","Inbound SMS","Referral"];
const VAS_LIST = ["Dax","Sara","Lucas"];
const STATUSES = ["New","Unclaimed","Follow-up","Nurture","Booked","Lost"];

export default function NewLeadModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-modal w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold font-display text-gray-900">New Lead</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Client name</label>
            <input type="text" placeholder="Full name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all" style={{ "--tw-ring-color": "#F97316" } as React.CSSProperties} />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Phone number</label>
            <input type="tel" placeholder="(000) 000-0000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" />
          </div>

          {/* Source + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Source</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all bg-white">
                {SOURCES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all bg-white">
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Assigned VA */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Assign VA</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all bg-white">
              {VAS_LIST.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label>
            <textarea rows={3} placeholder="Initial notes..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all resize-none" />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg text-sm text-white font-semibold transition-all duration-150 active:scale-95"
            style={{ background: "#F97316" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#EA6C0A")}
            onMouseLeave={e => (e.currentTarget.style.background = "#F97316")}
          >
            Create Lead
          </button>
        </div>
      </div>
    </div>
  );
}
