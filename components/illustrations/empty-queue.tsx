import { Illustration, type IllustrationProps } from "./frame";

// Two queue posts joined by a drooping rope with nobody in line, and an arrow pointing onward.
export function EmptyQueueIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <path d="M16 128 H184" />

      <path d="M40 56 Q78 100 116 56 L116 68 Q78 112 40 68 Z" className="fill-chart-1" />

      <rect x={40} y={56} width={12} height={68} rx={3} className="fill-foreground" stroke="none" />
      <rect x={34} y={50} width={12} height={74} rx={3} className="fill-chart-2" />
      <rect x={26} y={118} width={28} height={10} rx={4} className="fill-background" />
      <circle cx={40} cy={46} r={9} className="fill-chart-2" />

      <rect x={116} y={56} width={12} height={68} rx={3} className="fill-foreground" stroke="none" />
      <rect x={110} y={50} width={12} height={74} rx={3} className="fill-chart-2" />
      <rect x={102} y={118} width={28} height={10} rx={4} className="fill-background" />
      <circle cx={116} cy={46} r={9} className="fill-chart-2" />

      <path
        d="M142 86 H162 V72 L188 98 L162 124 V110 H142 Z"
        className="fill-foreground"
        stroke="none"
      />
      <path d="M136 80 H156 V66 L182 92 L156 118 V104 H136 Z" className="fill-chart-3" />
    </Illustration>
  );
}
