// A grid of game tiles with a magnifying glass zooming in on one of them.
import { Illustration, type IllustrationProps } from "./frame";

export function StepBrowseIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <rect x={22} y={20} width={42} height={36} rx={6} className="fill-chart-3" />
      <rect x={70} y={20} width={42} height={36} rx={6} className="fill-background" />
      <rect x={118} y={20} width={42} height={36} rx={6} className="fill-chart-2" />
      <rect x={22} y={66} width={42} height={36} rx={6} className="fill-background" />
      <rect x={70} y={66} width={42} height={36} rx={6} className="fill-chart-3" />
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
