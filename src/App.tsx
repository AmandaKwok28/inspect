/**
 * Assembles the inspector's interface and manages
 * the active tab and selected theme.
 */

import { useState } from "react";

import InspectPanel from "./components/InspectPanel";
import ModifyPanel from "./components/ModifyPanel";
import SettingsPanel from "./components/SettingsPanel";

import Tooltip from "./components/tooltip/Tooltip";
import TooltipHeader from "./components/tooltip/TooltipHeader";
import TooltipTabs from "./components/tooltip/TooltipTabs";
import TooltipFooter from "./components/tooltip/TooltipFooter";

import { useTheme } from "./hooks/useTheme";

import type { Tab } from "./constants/tabs";
import type { EditableStyles } from "./lib/inspector";

type Props = {
  tag: string;
  width: number;
  height: number;
  classes: string[];
  top: number;
  left: number;
  zoom: number;
  isLocked: boolean;
  styles: EditableStyles;
  canReset: boolean;
  onPropertyChange: (property: string, value: string) => void;
  onReset: () => void;
};

export default function App({
  tag,
  width,
  height,
  classes,
  top,
  left,
  zoom,
  isLocked,
  styles,
  canReset,
  onPropertyChange,
  onReset,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("inspect");
  const { theme, changeTheme } = useTheme();

  // Always display the Inspect panel when unlocked.
  const currentTab = isLocked ? activeTab : "inspect";

  return (
    <Tooltip
      top={top}
      left={left}
      zoom={zoom}
      theme={theme}
      isLocked={isLocked}
    >
      <TooltipHeader isLocked={isLocked} />

      <TooltipTabs
        activeTab={currentTab}
        isLocked={isLocked}
        onTabChange={setActiveTab}
      />

      {currentTab === "inspect" && (
        <InspectPanel
          tag={tag}
          width={width}
          height={height}
          classes={classes}
        />
      )}

      {currentTab === "modify" && (
        <ModifyPanel
          styles={styles}
          canReset={canReset}
          onReset={onReset}
          onPropertyChange={onPropertyChange}
        />
      )}

      {currentTab === "settings" && (
        <SettingsPanel theme={theme} onThemeChange={changeTheme} />
      )}

      <TooltipFooter isLocked={isLocked} />
    </Tooltip>
  );
}
