import { Illustration, type IllustrationProps } from "./frame";

// An acoustic guitar laid diagonally over a round backdrop, headstock top-right.
const BODY =
  "M100 59 C112.8 59 120.8 67.8 120.8 79 C120.8 87 115.2 90.2 115.2 93.4 C115.2 96.6 127.2 99.8 127.2 114.2 C127.2 130.2 114.4 139.8 100 139.8 C85.6 139.8 72.8 130.2 72.8 114.2 C72.8 99.8 84.8 96.6 84.8 93.4 C84.8 90.2 79.2 87 79.2 79 C79.2 67.8 87.2 59 100 59 Z";

export function MusicIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <circle cx={100} cy={75} r={50} className="fill-chart-3" />
      <g transform="translate(6 6) rotate(45 100 75)" className="fill-foreground" stroke="none">
        <path d={BODY} />
        <rect x={92.5} y={22} width={15} height={58} />
        <rect x={89} y={4} width={22} height={21} rx={5} />
      </g>
      <g transform="rotate(45 100 75)">
        <line x1={89} y1={10} x2={83} y2={10} />
        <line x1={89} y1={18} x2={83} y2={18} />
        <line x1={111} y1={10} x2={117} y2={10} />
        <line x1={111} y1={18} x2={117} y2={18} />
        <path d={BODY} className="fill-chart-2" />
        <rect x={92.5} y={22} width={15} height={58} className="fill-chart-1" />
        <line x1={92.5} y1={40} x2={107.5} y2={40} strokeWidth={4} />
        <line x1={92.5} y1={55} x2={107.5} y2={55} strokeWidth={4} />
        <line x1={92.5} y1={68} x2={107.5} y2={68} strokeWidth={4} />
        <rect x={89} y={4} width={22} height={21} rx={5} className="fill-chart-1" />
        <circle cx={100} cy={100} r={12} className="fill-chart-1" />
        <circle cx={100} cy={100} r={7} className="fill-foreground" stroke="none" />
        <rect x={88} y={120} width={24} height={6} rx={2} className="fill-foreground" />
      </g>
    </Illustration>
  );
}
