// A red A-frame tent with its door flap pinned open, a pine tree beside it, on a ground line.
import { Illustration, type IllustrationProps } from "./frame";

export function CampingIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <line x1={14} y1={128} x2={186} y2={128} />
      <path
        d="M79 44 L28 134 L130 134 Z M160 34 L142 70 L178 70 Z M160 52 L138 96 L182 96 Z M160 72 L134 120 L186 120 Z M154 116 H166 V134 H154 Z"
        className="fill-foreground"
        stroke="none"
      />
      <path d="M73 38 L22 128 L124 128 Z" className="fill-chart-1" />
      <path d="M73 52 L58 128 L88 128 Z" className="fill-background" />
      <path d="M73 52 L88 128 L102 104 Z" className="fill-chart-2" />
      <line x1={73} y1={38} x2={66} y2={26} />
      <line x1={73} y1={38} x2={80} y2={26} />
      <rect x={148} y={110} width={12} height={18} className="fill-foreground" />
      <path d="M154 66 L128 114 L180 114 Z" className="fill-chart-4" />
      <path d="M154 46 L132 90 L176 90 Z" className="fill-chart-4" />
      <path d="M154 28 L136 64 L172 64 Z" className="fill-chart-4" />
    </Illustration>
  );
}
