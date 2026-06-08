"use client";
import { HEATMAP_DATA, HOURS_LABELS, DAYS_LABELS } from "@/lib/analytics";

function getColor(value: number): string {
  if (value === 0) return "#F3F4F6";
  if (value <= 2) return "#FED7AA";
  if (value <= 4) return "#FB923C";
  if (value <= 6) return "#F97316";
  return "#C2570A";
}

export default function ActivityHeatmap() {
  const max = Math.max(...HEATMAP_DATA.map(d => d.value));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold font-display text-gray-900">Customer Activity Heatmap</p>
          <p className="text-xs text-gray-400 mt-0.5">Call attempts by day & hour</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400">Low</span>
          {[0, 2, 4, 6, 8].map(v => (
            <div key={v} className="w-4 h-4 rounded-sm" style={{ background: getColor(v) }} />
          ))}
          <span className="text-[10px] text-gray-400">High</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {/* Day labels column */}
          <div className="flex flex-col gap-1 pt-6">
            {DAYS_LABELS.map(day => (
              <div key={day} className="h-8 w-7 flex items-center justify-end pr-1">
                <span className="text-[10px] font-medium text-gray-400">{day}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex flex-col gap-1">
            {/* Hour labels */}
            <div className="flex gap-1 mb-0">
              {HOURS_LABELS.map(h => (
                <div key={h} className="w-8 text-center">
                  <span className="text-[10px] text-gray-400">{h}:00</span>
                </div>
              ))}
            </div>
            {/* Cells */}
            {DAYS_LABELS.map(day => (
              <div key={day} className="flex gap-1">
                {HOURS_LABELS.map(hour => {
                  const cell = HEATMAP_DATA.find(d => d.day === day && d.hour === hour);
                  const val = cell?.value ?? 0;
                  return (
                    <div
                      key={hour}
                      title={`${day} ${hour}:00 — ${val} call${val !== 1 ? "s" : ""}`}
                      className="w-8 h-8 rounded-md cursor-pointer transition-transform duration-100 hover:scale-110"
                      style={{ background: getColor(val) }}
                    >
                      {val > 0 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[10px] font-bold" style={{ color: val > 4 ? "#fff" : "#92400E" }}>
                            {val}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
