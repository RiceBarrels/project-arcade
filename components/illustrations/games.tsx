import { Illustration, type IllustrationProps } from "./frame";

// A chunky game controller with a d-pad and two buttons, with a tilted die beside it.
export function GamesIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <path
        d="M 42 38 H 110 C 126 38 134 50 136 66 L 138 94 C 140 108 126 114 116 104 L 104 92 H 48 L 36 104 C 26 114 12 108 14 94 L 16 66 C 18 50 26 38 42 38 Z"
        transform="translate(6 6)"
        className="fill-foreground"
        stroke="none"
      />
      <path
        d="M 42 38 H 110 C 126 38 134 50 136 66 L 138 94 C 140 108 126 114 116 104 L 104 92 H 48 L 36 104 C 26 114 12 108 14 94 L 16 66 C 18 50 26 38 42 38 Z"
        className="fill-chart-3"
      />
      <path
        d="M 40 50 H 52 V 60 H 62 V 72 H 52 V 82 H 40 V 72 H 30 V 60 H 40 Z"
        className="fill-background"
      />
      <circle cx={118} cy={60} r={8} className="fill-chart-2" />
      <circle cx={100} cy={72} r={8} className="fill-chart-1" />
      <line x1={70} y1={56} x2={74} y2={56} strokeWidth={4} />
      <line x1={81} y1={56} x2={85} y2={56} strokeWidth={4} />
      <g transform="rotate(10 168 80)">
        <rect
          x={151}
          y={63}
          width={34}
          height={34}
          rx={7}
          transform="translate(6 6)"
          className="fill-foreground"
          stroke="none"
        />
        <rect x={151} y={63} width={34} height={34} rx={7} className="fill-background" />
        <circle cx={168} cy={80} r={1.5} strokeWidth={4} className="fill-foreground" />
        <circle cx={159} cy={71} r={1.5} strokeWidth={4} className="fill-foreground" />
        <circle cx={177} cy={71} r={1.5} strokeWidth={4} className="fill-foreground" />
        <circle cx={159} cy={89} r={1.5} strokeWidth={4} className="fill-foreground" />
        <circle cx={177} cy={89} r={1.5} strokeWidth={4} className="fill-foreground" />
      </g>
    </Illustration>
  );
}
