// A grid of catalogue cards (tent, ball, box, mug, guitar) with a magnifying glass zooming in on a game.
import { Illustration, type IllustrationProps } from "./frame";

export function StepBrowseIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <rect x={22} y={20} width={42} height={36} rx={6} className="fill-chart-3" />
      <rect x={70} y={20} width={42} height={36} rx={6} className="fill-background" />
      <rect x={118} y={20} width={42} height={36} rx={6} className="fill-chart-2" />
      <rect x={22} y={66} width={42} height={36} rx={6} className="fill-background" />
      <rect x={70} y={66} width={42} height={36} rx={6} className="fill-chart-3" />

      <path d="M43 28 L32 48 H54 Z" strokeWidth={4} className="fill-background" />
      <circle cx={91} cy={38} r={10} strokeWidth={4} className="fill-chart-1" />
      <path d="M81 38 H101" strokeWidth={4} />
      <rect x={128} y={28} width={22} height={20} rx={2} strokeWidth={4} className="fill-background" />
      <path d="M139 28 V48" strokeWidth={4} />
      <rect x={32} y={74} width={18} height={20} rx={3} strokeWidth={4} className="fill-chart-1" />
      <path d="M50 79 h4 a5 5 0 0 1 0 10 h-4" strokeWidth={4} />
      <circle cx={88} cy={89} r={7} strokeWidth={4} className="fill-chart-2" />
      <path d="M93 84 L104 73" strokeWidth={4} />
      <rect
        x={-7}
        y={0}
        width={14}
        height={32}
        rx={5}
        transform="translate(158 103) rotate(-45)"
        className="fill-foreground"
        stroke="none"
      />
      <circle cx={145} cy={90} r={26} className="fill-foreground" stroke="none" />
      <rect
        x={-7}
        y={0}
        width={14}
        height={32}
        rx={5}
        transform="translate(152 97) rotate(-45)"
        className="fill-chart-1"
      />
      <circle cx={139} cy={84} r={26} className="fill-background" />
      <rect x={125} y={70} width={28} height={28} rx={5} className="fill-chart-1" />
      <polygon points="134,77 134,91 147,84" strokeWidth={4} className="fill-background" />
    </Illustration>
  );
}
