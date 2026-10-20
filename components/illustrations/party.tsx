// Bunting strung across the top above a folding table holding a two-tier birthday cake.
import { Illustration, type IllustrationProps } from "./frame";

export function PartyIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <path d="M24 22 L52 26 L38 47 Z" className="fill-chart-1" />
      <path d="M66 27 L93 28 L79 52 Z" className="fill-chart-2" />
      <path d="M107 28 L134 27 L121 52 Z" className="fill-chart-3" />
      <path d="M148 26 L176 22 L162 47 Z" className="fill-chart-1" />
      <path d="M14 20 Q100 36 186 20" />

      <path d="M24 136 H176" />
      <path d="M50 116 L74 136 M74 116 L50 136" />
      <path d="M126 116 L150 136 M150 116 L126 136" />
      <rect x={40} y={110} width={132} height={12} rx={3} className="fill-foreground" stroke="none" />
      <rect x={34} y={104} width={132} height={12} rx={3} className="fill-background" />

      <rect x={66} y={84} width={68} height={20} rx={4} className="fill-chart-1" />
      <path
        d="M66 84 H134 V93 Q125.5 101 117 93 Q108.5 101 100 93 Q91.5 101 83 93 Q74.5 101 66 93 Z"
        className="fill-background"
      />
      <rect x={80} y={66} width={40} height={18} rx={3} className="fill-chart-2" />
      <rect x={96} y={54} width={8} height={12} rx={2} className="fill-background" />
      <path d="M100 38 C106 43 107 49 100 51 C93 49 94 43 100 38 Z" className="fill-chart-2" />
    </Illustration>
  );
}
