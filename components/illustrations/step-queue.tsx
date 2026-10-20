import { Illustration, type IllustrationProps } from "./frame";

// Three figures, growing in size, queue in a line toward a lidded box.
export function StepQueueIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <path d="M16 128 H184" />

      <rect x={154} y={100} width={32} height={28} rx={3} className="fill-foreground" stroke="none" />
      <rect x={150} y={90} width={40} height={12} rx={3} className="fill-foreground" stroke="none" />
      <rect x={148} y={94} width={32} height={34} rx={3} className="fill-chart-2" />
      <rect x={144} y={84} width={40} height={12} rx={3} className="fill-chart-2" />
      <path d="M164 96 V128" strokeWidth={4} />

      <path d="M30 128 V112 a12 12 0 0 1 24 0 V128 Z" className="fill-chart-3" />
      <circle cx={42} cy={90} r={10} className="fill-background" />
      <circle cx={46} cy={88} r={2.5} className="fill-foreground" stroke="none" />

      <path d="M63 128 V108 a15 15 0 0 1 30 0 V128 Z" className="fill-chart-1" />
      <circle cx={78} cy={80} r={12} className="fill-background" />
      <circle cx={83} cy={78} r={3} className="fill-foreground" stroke="none" />

      <path d="M100 128 V104 a18 18 0 0 1 36 0 V128 Z" className="fill-chart-3" />
      <circle cx={118} cy={70} r={14} className="fill-background" />
      <circle cx={124} cy={68} r={3.5} className="fill-foreground" stroke="none" />
    </Illustration>
  );
}
