import { Illustration, type IllustrationProps } from "./frame";

// A taped cardboard box with a shipping label and a tag hanging off its corner.
export function GearGenericIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <polygon
        points="36,60 56,42 146,42 146,108 126,126 36,126"
        className="fill-foreground"
        stroke="none"
      />
      <rect x={30} y={54} width={90} height={66} className="fill-chart-2" />
      <polygon points="30,54 120,54 140,36 50,36" className="fill-chart-2" />
      <polygon points="120,54 140,36 140,102 120,120" className="fill-chart-2" />
      <polygon points="67,54 83,54 103,36 87,36" className="fill-chart-3" />
      <rect x={67} y={54} width={16} height={24} className="fill-chart-3" />
      <rect x={38} y={92} width={26} height={18} rx={2} strokeWidth={4} className="fill-background" />
      <line x1={44} y1={101} x2={58} y2={101} strokeWidth={4} />
      <path d="M134 44 C148 34 160 52 164 70" strokeWidth={4} />
      <g transform="rotate(10 164 70)">
        <polygon points="154,70 164,60 174,70 174,104 154,104" className="fill-chart-1" />
        <circle cx={164} cy={70} r={3} strokeWidth={4} className="fill-background" />
        <line x1={159} y1={86} x2={169} y2={86} strokeWidth={4} />
        <line x1={159} y1={94} x2={166} y2={94} strokeWidth={4} />
      </g>
    </Illustration>
  );
}
