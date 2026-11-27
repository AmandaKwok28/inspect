/**
 * Displays the inspected element's tag, dimensions,
 * and inferred Tailwind utility classes.
 */

type Props = {
  tag: string;
  width: number;
  height: number;
  classes: string[];
};

export default function InspectPanel({ tag, width, height, classes }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between py-2.5">
        <span className="text-[11px]">{`<${tag}>`}</span>

        <span className="text-secondary">
          {Math.round(width)} × {Math.round(height)}
        </span>
      </div>

      <p className="mb-1.5 text-[9px] tracking-widest text-muted">TAILWIND</p>

      <div className="flex max-h-24 flex-wrap gap-1 overflow-auto">
        {classes.map((name) => (
          <span
            key={name}
            className="rounded-sm bg-surface px-1.5 py-0.5 text-[9px] break-all"
          >
            {name}
          </span>
        ))}

        {classes.length === 0 && <span className="text-muted">No classes</span>}
      </div>
    </section>
  );
}
