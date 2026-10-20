import { Illustration, type IllustrationProps } from "./frame";

// Two people stand face to face; one passes a taped box to the other, with an arrow showing which way it goes.
export function StepBorrowIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <path d="M12 136 H188" />
      <path d="M80 44 Q100 30 120 44" />
      <path d="M111 38 L120 44 L110 48" />

      <path d="M22 136 V104 a24 24 0 0 1 48 0 V136 Z" className="fill-chart-3" />
      <circle cx={46} cy={62} r={16} className="fill-background" />
      <circle cx={53} cy={60} r={3} className="fill-foreground" stroke="none" />

      <path d="M130 136 V104 a24 24 0 0 1 48 0 V136 Z" className="fill-chart-1" />
      <circle cx={154} cy={62} r={16} className="fill-background" />
      <circle cx={147} cy={60} r={3} className="fill-foreground" stroke="none" />

      <rect x={58} y={88} width={28} height={14} rx={7} className="fill-chart-3" />
      <rect x={114} y={88} width={28} height={14} rx={7} className="fill-chart-1" />

      <rect x={82} y={82} width={48} height={40} rx={3} className="fill-foreground" stroke="none" />
      <rect x={76} y={76} width={48} height={40} rx={3} className="fill-chart-2" />
      <rect x={94} y={76} width={12} height={40} className="fill-background" />
    </Illustration>
  );
}
