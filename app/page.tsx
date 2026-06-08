"use client";
import { useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import AllLeads from "@/components/tabs/AllLeads";
import FilteredLeads from "@/components/tabs/FilteredLeads";
import KanbanBoard from "@/components/tabs/KanbanBoard";
import VAPerformance from "@/components/tabs/VAPerformance";
import Analytics from "@/components/tabs/Analytics";
import AIChatSidebar from "@/components/AIChatSidebar";
import NewLeadModal from "@/components/modals/NewLeadModal";
import LeadDetailModal from "@/components/modals/LeadDetailModal";
import ToastContainer, { ToastItem } from "@/components/Toast";
import type { Lead } from "@/lib/data";

export default function Home() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [showNewLead, setShowNewLead] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastItem["type"] = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-base">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onNewLead={() => setShowNewLead(true)}
          showToast={showToast}
        />

        <main className="flex-1 overflow-hidden">
          {activeTab === "all" && (
            <AllLeads onLeadClick={setSelectedLead} onNewLead={() => setShowNewLead(true)} showToast={showToast} />
          )}
          {activeTab === "unclaimed" && (
            <FilteredLeads
              filterStatus={["Unclaimed", "New"]}
              emptyMessage="No unclaimed leads right now."
              onLeadClick={setSelectedLead}
              onNewLead={() => setShowNewLead(true)}
            />
          )}
          {activeTab === "followup" && (
            <FilteredLeads
              filterStatus="Follow-up"
              emptyMessage="No leads need follow-up."
              onLeadClick={setSelectedLead}
              onNewLead={() => setShowNewLead(true)}
            />
          )}
          {activeTab === "nurture" && (
            <FilteredLeads
              filterStatus="Nurture"
              emptyMessage="No leads in nurture sequence."
              onLeadClick={setSelectedLead}
              onNewLead={() => setShowNewLead(true)}
            />
          )}
          {activeTab === "booked" && (
            <FilteredLeads
              filterStatus="Booked"
              emptyMessage="No bookings this month yet."
              onLeadClick={setSelectedLead}
              onNewLead={() => setShowNewLead(true)}
            />
          )}
          {activeTab === "kanban" && (
            <KanbanBoard onLeadClick={setSelectedLead} onNewLead={() => setShowNewLead(true)} />
          )}
          {activeTab === "va" && <VAPerformance showToast={showToast} />}
          {activeTab === "analytics" && <Analytics />}
        </main>
      </div>

      <AIChatSidebar />

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {showNewLead && (
        <NewLeadModal
          onClose={() => setShowNewLead(false)}
          onSave={(name) => {
            setShowNewLead(false);
            showToast(`Lead "${name}" created successfully!`, "success");
          }}
        />
      )}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          showToast={showToast}
        />
      )}
    </div>
  );
}
