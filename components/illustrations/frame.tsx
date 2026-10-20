import type { SVGProps } from "react";

export type IllustrationProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children"> & {
  /** Pass a title only when the picture carries meaning; otherwise it's decorative (aria-hidden). */
  title?: string;
};

// Shared frame for every illustration: 200x150 canvas, thick black outlines,
// flat fills from the theme tokens (fill-chart-1..5, fill-background, fill-muted),
// so the art matches the neo-brutalism theme and follows any theme change.
export function Illustration({
  title,
  className,
  children,
  ...props
}: IllustrationProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`stroke-foreground ${className ?? ""}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}
