// Chunky red mirrorless camera, front view, big round lens and a yellow flash bump.
import { Illustration, type IllustrationProps } from "./frame";

export function CamerasIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <rect x={40} y={34} width={24} height={16} rx={3} className="fill-chart-2" />
      <rect x={136} y={36} width={22} height={14} rx={4} className="fill-background" />
      <path d="M78 48 L88 28 H112 L122 48 Z" className="fill-chart-1" />
      <rect x={36} y={51} width={140} height={80} rx={12} className="fill-foreground" stroke="none" />
      <rect x={30} y={45} width={140} height={80} rx={12} className="fill-chart-1" />
      <rect x={38} y={56} width={18} height={58} rx={8} className="fill-background" />
      <circle cx={106} cy={91} r={32} className="fill-foreground" stroke="none" />
      <circle cx={100} cy={85} r={32} className="fill-background" />
      <circle cx={100} cy={85} r={21} className="fill-chart-3" />
      <circle cx={100} cy={85} r={9} className="fill-foreground" />
      <circle cx={92} cy={77} r={4} className="fill-background" stroke="none" />
      <circle cx={153} cy={60} r={5} className="fill-background" strokeWidth={4} />
      <path d="M144 112 H158" strokeWidth={4} />
    </Illustration>
  );
}
