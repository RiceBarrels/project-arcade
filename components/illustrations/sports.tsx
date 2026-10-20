// Two crossed badminton rackets with a shuttlecock resting below the cross.
import { Illustration, type IllustrationProps } from "./frame";

const HEAD = { cx: 0, cy: -40, rx: 22, ry: 28 };
const HANDLE = { x: -7, y: 20, width: 14, height: 32, rx: 5 };
const SKIRT = "M84 94 H116 L107 118 H93 Z";
const CORK = "M92 118 H108 V121 A8 8 0 0 1 92 121 Z";

function RacketShadow({ transform }: { transform: string }) {
  return (
    <g transform={transform} className="fill-foreground" stroke="none">
      <ellipse {...HEAD} />
      <rect {...HANDLE} />
    </g>
  );
}

function Racket({ transform, headClassName }: { transform: string; headClassName: string }) {
  return (
    <g transform={transform}>
      <line x1={0} y1={-12} x2={0} y2={20} />
      <ellipse {...HEAD} className={headClassName} />
      <path d="M-8 -64 V-16 M8 -64 V-16 M-19 -48 H19 M-19 -32 H19" strokeWidth={4} />
      <rect {...HANDLE} className="fill-chart-2" />
    </g>
  );
}

export function SportsIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <RacketShadow transform="translate(106 76) rotate(45)" />
      <RacketShadow transform="translate(106 76) rotate(-45)" />
      <path d={SKIRT} transform="translate(6 6)" className="fill-foreground" stroke="none" />
      <path d={CORK} transform="translate(6 6)" className="fill-foreground" stroke="none" />
      <Racket transform="translate(100 70) rotate(45)" headClassName="fill-chart-1" />
      <Racket transform="translate(100 70) rotate(-45)" headClassName="fill-chart-3" />
      <path d={SKIRT} className="fill-background" />
      <path d="M96 118 L91 94 M104 118 L109 94 M88.5 106 H111.5" strokeWidth={4} />
      <path d={CORK} className="fill-chart-1" />
    </Illustration>
  );
}
