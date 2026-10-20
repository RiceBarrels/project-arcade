// An empty two-shelf cabinet with a magnifying glass showing a question mark.
import { Illustration, type IllustrationProps } from "./frame";

export function EmptySearchIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <line x1={14} y1={134} x2={186} y2={134} />
      <rect x={28} y={24} width={116} height={100} rx={6} className="fill-foreground" stroke="none" />
      <rect x={32} y={112} width={12} height={20} rx={3} className="fill-chart-2" />
      <rect x={116} y={112} width={12} height={20} rx={3} className="fill-chart-2" />
      <rect x={22} y={18} width={116} height={106} rx={6} className="fill-chart-2" />
      <rect x={34} y={30} width={92} height={34} rx={4} className="fill-muted" />
      <rect x={34} y={78} width={92} height={34} rx={4} className="fill-muted" />
      <rect
        x={-7}
        y={0}
        width={14}
        height={34}
        rx={5}
        transform="translate(156 96) rotate(-45)"
        className="fill-foreground"
        stroke="none"
      />
      <rect
        x={-7}
        y={0}
        width={14}
        height={34}
        rx={5}
        transform="translate(150 90) rotate(-45)"
        className="fill-chart-1"
      />
      <circle cx={140} cy={80} r={28} className="fill-foreground" stroke="none" />
      <circle cx={134} cy={74} r={28} className="fill-background" />
      <path d="M125 66 A9 9 0 1 1 138 74 Q134 76 134 82" />
      <circle cx={134} cy={92} r={3} className="fill-foreground" strokeWidth={4} />
    </Illustration>
  );
}
