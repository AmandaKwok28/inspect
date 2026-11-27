/**
 * Displays contextual instructions and keyboard shortcuts.
 */

type Props = {
  isLocked: boolean;
};

export default function TooltipFooter({ isLocked }: Props) {
  return (
    <footer className="mt-2.5 flex justify-between border-t border-solid border-stroke pt-2.5 text-[9px] text-muted">
      <span>{isLocked ? "Selection locked" : "Click to lock"}</span>

      <span>ESC ↗</span>
    </footer>
  );
}
