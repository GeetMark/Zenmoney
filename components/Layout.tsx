
import React from 'react';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: ICONS.Dashboard },
    { id: 'transactions', label: 'Wallet', icon: ICONS.Transactions },
    { id: 'insights', label: 'AI Tips', icon: ICONS.AI },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">Z</div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">ZenMoney</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto p-4 sm:p-6 overflow-x-hidden">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            {tab.icon}
            <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
