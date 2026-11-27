import PropertyInput from "./PropertyInput";
import type { EditableStyles } from "../lib/inspector";

type Props = {
  styles: EditableStyles;
  canReset: boolean;
  onReset: () => void;
  onPropertyChange: (property: string, value: string) => void;
};

function ModifyPanel({ styles, canReset, onReset, onPropertyChange }: Props) {
  return (
    <section className="max-h-80 space-y-2 overflow-y-auto py-3">
      <details className="group overflow-hidden rounded-md border border-solid border-stroke">
        <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-[9px] tracking-widest text-secondary transition-colors hover:bg-surface">
          TYPOGRAPHY
          <span className="text-base leading-none transition-transform duration-150 group-open:rotate-90">
            ›
          </span>
        </summary>

        <div className="space-y-2 border-t border-solid border-stroke p-3">
          <PropertyInput
            label="Font size"
            value={styles.fontSize}
            min={1}
            onChange={(value) => onPropertyChange("font-size", `${value}px`)}
          />

          <PropertyInput
            label="Font weight"
            value={styles.fontWeight}
            unit=""
            min={1}
            onChange={(value) => onPropertyChange("font-weight", String(value))}
          />

          <PropertyInput
            label="Line height"
            value={styles.lineHeight}
            onChange={(value) => onPropertyChange("line-height", `${value}px`)}
          />
        </div>
      </details>

      <details className="group overflow-hidden rounded-md border border-solid border-stroke">
        <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-[9px] tracking-widest text-secondary transition-colors hover:bg-surface">
          SPACING
          <span className="text-base leading-none transition-transform duration-150 group-open:rotate-90">
            ›
          </span>
        </summary>

        <div className="space-y-2 border-t border-solid border-stroke p-3">
          <PropertyInput
            label="Padding X"
            value={styles.paddingX}
            onChange={(value) =>
              onPropertyChange("padding-inline", `${value}px`)
            }
          />

          <PropertyInput
            label="Padding Y"
            value={styles.paddingY}
            onChange={(value) =>
              onPropertyChange("padding-block", `${value}px`)
            }
          />

          <PropertyInput
            label="Margin X"
            value={styles.marginX}
            min={-Infinity}
            onChange={(value) =>
              onPropertyChange("margin-inline", `${value}px`)
            }
          />

          <PropertyInput
            label="Margin Y"
            value={styles.marginY}
            min={-Infinity}
            onChange={(value) => onPropertyChange("margin-block", `${value}px`)}
          />

          <PropertyInput
            label="Gap"
            value={styles.gap}
            onChange={(value) => onPropertyChange("gap", `${value}px`)}
          />
        </div>
      </details>

      <div className="flex items-center justify-between pt-1">
        <p className="text-[9px] text-muted">Press Enter to apply</p>

        <button
          type="button"
          title="Reset modifications"
          aria-label="Reset modifications"
          disabled={!canReset}
          onClick={onReset}
          className="cursor-pointer rounded-sm p-1 text-secondary transition-colors hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 1 9 9" />
            <path d="M3 4v8h8" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default ModifyPanel;
