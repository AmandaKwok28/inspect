import type { Theme } from "../lib/settings";

type Props = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

function SettingsPanel({ theme, onThemeChange }: Props) {
  return (
    <section className="space-y-3 py-3">
      <p className="text-[9px] tracking-widest text-muted">APPEARANCE</p>

      <div className="flex items-center justify-between">
        <span className="text-secondary">Theme</span>

        <div className="flex gap-1 rounded-md border border-solid border-stroke bg-surface p-1">
          {(["light", "dark"] as const).map((option) => (
            <button
              key={option}
              onClick={() => onThemeChange(option)}
              className={`cursor-pointer rounded-sm px-3 py-1 capitalize transition-colors ${
                theme === option
                  ? "bg-active text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[9px] text-muted">
        Preferences are saved automatically.
      </p>
    </section>
  );
}

export default SettingsPanel;
