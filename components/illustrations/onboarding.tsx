// Onboarding screens 2-4 (docs/copy-en.md 18.1). Screen 1 reuses the hero.
// No hands anywhere (owner feedback on the earlier art): figures, objects and badges only.
import { Illustration, type IllustrationProps } from "./frame";

/** Three figures in line for one item on a pedestal; a "48" clock badge over the first in line. */
export function OnboardingQueueIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <path d="M12 132 H188" />

      <rect x={152} y={102} width={36} height={30} className="fill-foreground" stroke="none" />
      <rect x={146} y={96} width={36} height={36} className="fill-chart-3" />
      <rect x={154} y={76} width={28} height={22} rx={3} className="fill-foreground" stroke="none" />
      <rect x={150} y={70} width={28} height={26} rx={3} className="fill-chart-2" />
      <path d="M164 70 V96" strokeWidth={4} />

      <path d="M18 132 V116 a11 11 0 0 1 22 0 V132 Z" className="fill-chart-1" />
      <circle cx={29} cy={96} r={9} className="fill-background" />

      <path d="M50 132 V112 a14 14 0 0 1 28 0 V132 Z" className="fill-chart-3" />
      <circle cx={64} cy={88} r={11} className="fill-background" />

      <path d="M88 132 V108 a18 18 0 0 1 36 0 V132 Z" className="fill-chart-1" />
      <circle cx={106} cy={78} r={14} className="fill-background" />
      <circle cx={112} cy={76} r={3} className="fill-foreground" stroke="none" />

      <circle cx={112} cy={32} r={19} className="fill-foreground" stroke="none" />
      <circle cx={106} cy={26} r={19} className="fill-chart-2" />
      <text
        x={106}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight={900}
        className="fill-foreground"
        stroke="none"
      >
        48
      </text>
    </Illustration>
  );
}

/** A taped box with a crack down its front and a price tag on a string. No coins, no card. */
export function OnboardingDamageIllustration(props: IllustrationProps) {
  return (
    <Illustration {...props}>
      <path d="M12 134 H188" />
      <rect x={46} y={52} width={84} height={76} rx={3} className="fill-foreground" stroke="none" />
      <rect x={40} y={46} width={84} height={76} rx={3} className="fill-chart-2" />
      <rect x={76} y={46} width={12} height={28} className="fill-background" />
      <path d="M96 46 L88 64 L100 78 L86 96 L96 122" />

      <path d="M124 56 C140 50 146 58 150 66" strokeWidth={4} />
      <path d="M156 72 L188 72 L188 104 L156 104 L144 88 Z" transform="translate(5 5)" className="fill-foreground" stroke="none" />
      <path d="M156 72 L188 72 L188 104 L156 104 L144 88 Z" className="fill-chart-1" />
      <circle cx={156} cy={88} r={4} strokeWidth={4} className="fill-background" />
      <path d="M166 84 H180 M166 94 H176" strokeWidth={4} />
    </Illustration>
  );
}

/** A chat bubble carrying a shield with a check; an envelope with a padlock and a "no" badge. */
export function OnboardingSafetyIllustration(props: IllustrationProps) {
  const bubble =
    "M24 22 H94 a10 10 0 0 1 10 10 V82 a10 10 0 0 1 -10 10 H52 L34 112 V92 H24 a10 10 0 0 1 -10 -10 V32 a10 10 0 0 1 10 -10 Z";
  return (
    <Illustration {...props}>
      <path d={bubble} transform="translate(6 6)" className="fill-foreground" stroke="none" />
      <path d={bubble} className="fill-chart-3" />
      <path d="M59 32 L80 40 V58 C80 72 70 80 59 84 C48 80 38 72 38 58 V40 Z" className="fill-background" />
      <path d="M49 58 L56 65 L70 50" />

      <rect x={120} y={68} width={70} height={50} rx={3} className="fill-foreground" stroke="none" />
      <rect x={114} y={62} width={70} height={50} rx={3} className="fill-background" />
      <path d="M114 64 L149 90 L184 64" strokeWidth={4} />
      <path d="M143 96 V90 a6 6 0 0 1 12 0 V96" strokeWidth={4} />
      <rect x={138} y={96} width={22} height={14} rx={2} strokeWidth={4} className="fill-chart-2" />

      <circle cx={182} cy={58} r={13} className="fill-chart-1" />
      <path d="M176 52 L188 64 M188 52 L176 64" strokeWidth={4} />
    </Illustration>
  );
}
