// A lending counter with a green tent, a red toolbox and a camera sitting on top, ready to borrow.
import { Illustration, type IllustrationProps } from "./frame";

export function HeroIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <rect x={16} y={114} width={180} height={34} rx={4} className="fill-foreground" stroke="none" />
      <rect x={18} y={120} width={164} height={22} className="fill-chart-3" />
      <rect x={10} y={108} width={180} height={14} rx={4} className="fill-chart-2" />
      <path d="M60 132 H140" strokeWidth={4} />

      <path d="M52 36 L18 114 L86 114 Z" className="fill-foreground" stroke="none" />
      <path d="M46 30 L12 108 L80 108 Z" className="fill-chart-4" />
      <path d="M46 52 L36 108 H56 Z" className="fill-background" />
      <line x1={46} y1={30} x2={40} y2={20} />
      <line x1={46} y1={30} x2={52} y2={20} />

      <rect x={92} y={68} width={56} height={46} rx={4} className="fill-foreground" stroke="none" />
      <path d="M100 62 V50 H128 V62" />
      <rect x={86} y={62} width={56} height={46} rx={4} className="fill-chart-1" />
      <path d="M86 78 H142" strokeWidth={4} />
      <rect x={108} y={72} width={12} height={12} rx={2} strokeWidth={4} className="fill-background" />

      <rect x={156} y={76} width={40} height={38} rx={6} className="fill-foreground" stroke="none" />
      <path d="M160 70 L164 60 H178 L182 70 Z" className="fill-chart-5" />
      <rect x={150} y={70} width={40} height={38} rx={6} className="fill-chart-5" />
      <circle cx={170} cy={89} r={13} className="fill-background" />
      <circle cx={170} cy={89} r={5} className="fill-foreground" stroke="none" />
    </Illustration>
  );
}
