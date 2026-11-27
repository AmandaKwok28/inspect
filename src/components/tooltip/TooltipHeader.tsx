/**
 * Displays the inspector's title and current selection status.
 */

type Props = {
  isLocked: boolean;
};

export default function TooltipHeader({ isLocked }: Props) {
  return (
    <header className="flex items-center justify-between pb-2.5 text-[9px] tracking-widest">
      <span className="text-secondary">INSPECT / 01</span>

      <span className="flex items-center gap-1.5 text-status">
        <span className="size-1 rounded-full bg-status" />

        {isLocked ? "LOCKED" : "LIVE"}
      </span>
    </header>
  );
}
