"use client";

import { useEffect, useRef } from "react";

// Confirmation that replaces the control the user just used. It takes focus on
// mount, so keyboard focus doesn't fall back to <body> and screen readers read it out.
export function FocusStatus({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <p ref={ref} role="status" tabIndex={-1} className={`outline-none ${className ?? ""}`}>
      {children}
    </p>
  );
}
