// A cooking pot with a domed lid, side handles and rising steam.
import { Illustration, type IllustrationProps } from "./frame";

export function KitchenIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <path d="M24 134 H176" />
      <path d="M100 30 q-7 -4 0 -8 q7 -4 0 -8" />
      <path d="M66 44 q-7 -4 0 -8 q7 -4 0 -8" />
      <path d="M134 44 q-7 -4 0 -8 q7 -4 0 -8" />
      <path
        d="M56 76 H156 V118 Q156 134 140 134 H72 Q56 134 56 118 Z"
        className="fill-foreground"
        stroke="none"
      />
      <rect x={28} y={80} width={26} height={14} rx={7} className="fill-chart-2" />
      <rect x={146} y={80} width={26} height={14} rx={7} className="fill-chart-2" />
      <path
        d="M50 70 H150 V112 Q150 128 134 128 H66 Q50 128 50 112 Z"
        className="fill-chart-1"
      />
      <rect x={50} y={92} width={100} height={14} className="fill-background" />
      <rect x={44} y={64} width={112} height={12} rx={4} className="fill-chart-1" />
      <rect x={90} y={36} width={20} height={14} rx={5} className="fill-chart-2" />
      <path d="M44 64 Q100 28 156 64 Z" className="fill-chart-3" />
    </Illustration>
  );
}
