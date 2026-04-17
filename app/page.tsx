"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import AllLeads from "@/components/tabs/AllLeads";
import FilteredLeads from "@/components/tabs/FilteredLeads";
import KanbanBoard from "@/components/tabs/KanbanBoard";
import VAPerformance from "@/components/tabs/VAPerformance";
import NewLeadModal from "@/components/modals/NewLeadModal";
import LeadDetailModal from "@/components/modals/LeadDetailModal";
import type { Lead } from "@/lib/data";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [showNewLead, setShowNewLead] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  function handleTabChange(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-base">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar activeTab={activeTab} onTabChange={handleTabChange} onNewLead={() => setShowNewLead(true)} />

        <main className="flex-1 overflow-hidden">
          {activeTab === "all" && (
            <AllLeads onLeadClick={setSelectedLead} />
          )}
          {activeTab === "unclaimed" && (
            <FilteredLeads
              filterStatus={["Unclaimed", "New"]}
              emptyMessage="No unclaimed leads right now."
              onLeadClick={setSelectedLead}
            />
          )}
          {activeTab === "followup" && (
            <FilteredLeads
              filterStatus="Follow-up"
              emptyMessage="No leads need follow-up."
              onLeadClick={setSelectedLead}
            />
          )}
          {activeTab === "nurture" && (
            <FilteredLeads
              filterStatus="Nurture"
              emptyMessage="No leads in nurture sequence."
              onLeadClick={setSelectedLead}
            />
          )}
          {activeTab === "booked" && (
            <FilteredLeads
              filterStatus="Booked"
              emptyMessage="No bookings this month yet."
              onLeadClick={setSelectedLead}
            />
          )}
          {activeTab === "kanban" && (
            <KanbanBoard onLeadClick={setSelectedLead} />
          )}
          {activeTab === "va" && (
            <VAPerformance />
          )}
        </main>
      </div>

      {showNewLead && <NewLeadModal onClose={() => setShowNewLead(false)} />}
      {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}
    </div>
  );
}
