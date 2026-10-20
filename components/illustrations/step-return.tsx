import { Illustration, type IllustrationProps } from "./frame";

// A parcel box ringed by a big circular return arrow, with a check mark badge.
export function StepReturnIllustration(props: IllustrationProps) {
  const ring =
    "M151.96 43 A60 60 0 1 1 48.04 43 L39.38 38 L65.1 27.45 L68.82 55 L60.16 50 A46 46 0 1 0 139.84 50 Z";

  return (
    <Illustration {...props}>
      <path d={ring} transform="translate(6 6)" className="fill-foreground" stroke="none" />
      <path d={ring} className="fill-chart-3" />

      <path d="M82 66 H130 V78 H126 V104 H86 V78 H82 Z" className="fill-foreground" stroke="none" />
      <rect x={80} y={70} width={40} height={28} rx={3} className="fill-chart-2" />
      <rect x={76} y={60} width={48} height={12} rx={3} className="fill-chart-2" />
      <path d="M100 72 V98" strokeWidth={4} />

      <circle cx={154} cy={116} r={18} className="fill-foreground" stroke="none" />
      <circle cx={148} cy={110} r={18} className="fill-chart-4" />
      <path d="M139 110 L146 117 L158 103" />
    </Illustration>
  );
}
