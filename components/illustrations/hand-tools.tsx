// A crossed wrench and screwdriver in front of an upright claw hammer.
import { Illustration, type IllustrationProps } from "./frame";

export function HandToolsIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <rect x="92" y="40" width="16" height="96" rx="6" className="fill-chart-2" />
      <rect x="62" y="20" width="60" height="26" rx="4" className="fill-background" />
      <rect x="54" y="16" width="14" height="34" rx="3" className="fill-background" />

      <g transform="rotate(45 100 75)">
        <rect x="92" y="34" width="16" height="84" rx="6" className="fill-chart-3" />
        <path
          d="M93 7.3 L93 26 L107 26 L107 7.3 A20 20 0 1 1 93 7.3 Z"
          className="fill-chart-3"
        />
        <circle cx="100" cy="124" r="14" className="fill-chart-3" />
        <circle cx="100" cy="124" r="5" className="fill-background" />
      </g>

      <g transform="rotate(-45 100 75)">
        <path d="M95 22 L97 14 H103 L105 22 V80 H95 Z" className="fill-background" />
        <rect x="90" y="72" width="20" height="12" rx="3" className="fill-background" />
        <rect x="86" y="82" width="28" height="54" rx="10" className="fill-chart-1" />
        <line x1="96" y1="96" x2="96" y2="122" strokeWidth={4} />
        <line x1="104" y1="96" x2="104" y2="122" strokeWidth={4} />
      </g>
    </Illustration>
  );
}
