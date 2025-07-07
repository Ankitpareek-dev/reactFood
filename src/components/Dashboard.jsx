import { useState } from "react";

const tabs = [
  { id: "menu", label: "Menu" },
  { id: "active", label: "Active Orders" },
  { id: "all", label: "All Orders" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div
      className="min-h-screen font-sans antialiased bg-[oklch(0.994_0_0)] text-[oklch(0_0_0)]"
      style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        letterSpacing: "-0.025em",
      }}
    >
      {/* Fixed Sidebar */}
      <aside className="fixed top-[6rem] left-0 w-64 h-[calc(100vh-6rem)] p-6 bg-[oklch(0.93_0.0094_286.2156)] rounded-tr-[1.4rem] rounded-br-[1.4rem] shadow-xl z-30">
        <h2 className="text-2xl font-bold mb-10 tracking-tight">Dashboard</h2>
        <nav className="space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-3 rounded-[1.4rem] font-semibold transition-colors text-sm
                ${
                  activeTab === tab.id
                    ? "bg-[oklch(0.5393_0.2713_286.7462)] text-white shadow"
                    : "bg-white text-black border border-[oklch(0.93_0.0094_286.2156)] hover:bg-[oklch(0.95_0_0)]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content (left padded for sidebar) */}
      <main className="pl-64 px-4 md:px-8 py-8 mt-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-[1.4rem] shadow-xl border border-[oklch(0.93_0.0094_286.2156)] min-h-[70vh]">
            {activeTab === "menu" && (
              <div>
                <h1 className="text-4xl font-extrabold mb-6">Menu</h1>
                <p className="text-lg text-gray-700">
                  All your restaurant items listed here.
                </p>
              </div>
            )}
            {activeTab === "active" && (
              <div>
                <h1 className="text-4xl font-extrabold mb-6">Active Orders</h1>
                <p className="text-lg text-gray-700">
                  Orders currently in progress.
                </p>
              </div>
            )}
            {activeTab === "all" && (
              <div>
                <h1 className="text-4xl font-extrabold mb-6">All Orders</h1>
                <p className="text-lg text-gray-700">
                  Order history and past deliveries.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
