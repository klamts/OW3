
import React from 'react';
import type { TabInfo } from '../data/topics';
import type { ActiveTab } from '../types';

interface TabsListProps {
  tabs: TabInfo[];
  activeTab: ActiveTab;
  onSelectTab: (tabId: ActiveTab) => void;
}

export const TabsList: React.FC<TabsListProps> = ({ tabs, activeTab, onSelectTab }) => {
  const TabButton: React.FC<{ tab: TabInfo }> = ({ tab }) => {
    const isActive = activeTab === tab.tabId;
    const activeClasses = 'bg-blue-500 text-white shadow-sm';
    const inactiveClasses = 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';
    return (
      <button
        onClick={() => onSelectTab(tab.tabId)}
        className={`w-full px-4 py-2 font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-sm ${isActive ? activeClasses : inactiveClasses}`}
        aria-pressed={isActive}
      >
        {tab.title}
      </button>
    );
  };

  return (
    <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-1 bg-slate-200 dark:bg-slate-700/50 rounded-lg">
      {tabs.map((tab) => (
        <TabButton key={tab.tabId} tab={tab} />
      ))}
    </div>
  );
};
