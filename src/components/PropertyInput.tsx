import { useState } from "react";

type Props = {
  label: string;
  value: number;
  unit?: string;
  min?: number;
  onChange: (value: number) => void;
};

function PropertyInput({
  label,
  value,
  unit = "px",
  min = 0,
  onChange,
}: Props) {
  const [draft, setDraft] = useState<string | null>(null);

  function applyValue() {
    if (draft === null) return;

    const parsed = Number(draft);

    if (draft.trim() !== "" && Number.isFinite(parsed) && parsed >= min) {
      onChange(parsed);
    }

    setDraft(null);
  }

  return (
    <label className="flex items-center justify-between">
      <span className="text-secondary">{label}</span>

      <div className="flex items-center gap-1 rounded-sm border border-solid border-stroke bg-surface px-2 py-1 transition-colors focus-within:border-secondary">
        <input
          type="text"
          inputMode="decimal"
          value={draft ?? String(value)}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.stopPropagation();

              applyValue();
              event.currentTarget.blur();
            }
          }}
          onBlur={() => setDraft(null)}
          className="w-10 bg-transparent text-right text-foreground outline-none"
        />

        <span className="text-muted">{unit}</span>
      </div>
    </label>
  );
}

export default PropertyInput;
