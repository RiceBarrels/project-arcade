// A lending counter with a green tent, a red toolbox and a camera sitting on top, ready to borrow.
import { Illustration, type IllustrationProps } from "./frame";

export function HeroIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <rect x={16} y={104} width={180} height={36} rx={4} className="fill-foreground" stroke="none" />
      <rect x={18} y={110} width={164} height={30} className="fill-chart-3" />
      <rect x={10} y={98} width={180} height={14} rx={4} className="fill-chart-2" />
      <path d="M60 122 H140" strokeWidth={4} />

      <path d="M52 52 L28 104 L82 104 Z" className="fill-foreground" stroke="none" />
      <path d="M46 46 L18 98 L74 98 Z" className="fill-chart-4" />
      <path d="M46 62 L37 98 H55 Z" className="fill-background" />
      <line x1={46} y1={46} x2={40} y2={36} />
      <line x1={46} y1={46} x2={52} y2={36} />

      <rect x={92} y={70} width={52} height={34} rx={4} className="fill-foreground" stroke="none" />
      <path d="M100 64 V54 H122 V64" />
      <rect x={86} y={64} width={52} height={34} rx={4} className="fill-chart-1" />
      <path d="M86 76 H138" strokeWidth={4} />
      <rect x={106} y={71} width={12} height={10} rx={2} strokeWidth={4} className="fill-background" />

      <rect x={154} y={74} width={36} height={30} rx={6} className="fill-foreground" stroke="none" />
      <path d="M156 68 L160 60 H172 L176 68 Z" className="fill-chart-5" />
      <rect x={148} y={68} width={36} height={30} rx={6} className="fill-chart-5" />
      <circle cx={166} cy={83} r={10} className="fill-background" />
      <circle cx={166} cy={83} r={4} className="fill-foreground" stroke="none" />
    </Illustration>
  );
}
