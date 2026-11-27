/**
 * Displays the tooltip's navigation tabs.
 * Tabs can only be selected when an element is locked.
 */

import { TABS, type Tab } from "../../constants/tabs";

type Props = {
  activeTab: Tab;
  isLocked: boolean;
  onTabChange: (tab: Tab) => void;
};

export default function TooltipTabs({
  activeTab,
  isLocked,
  onTabChange,
}: Props) {
  return (
    <nav className="flex w-full gap-1 rounded-md border border-solid border-stroke bg-surface p-1">
      {TABS.map((tab) => (
        <button
          key={tab}
          disabled={!isLocked}
          onClick={() => onTabChange(tab)}
          className={`flex-1 cursor-pointer rounded-sm py-1.5 text-center capitalize transition-colors ${
            activeTab === tab
              ? "bg-active text-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
