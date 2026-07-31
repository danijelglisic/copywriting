import React from "react";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Isti razlog kao kod [AnimatedText]: Framer Motion `whileInView` je krenuo od
 * opacity 0 i umeo da se zamrzne, pa je sadrzaj ostajao nevidljiv.
 *
 * Ime je ostalo zbog broja mesta gde se koristi, ali ovo vise nije fade —
 * animira se samo pomeraj. Providnost se namerno ne dira da sadrzaj ne bi
 * mogao da ostane nevidljiv ni ako se animacija nikad ne pokrene.
 */
export const FadeUp = ({ children, delay = 0, className }: FadeUpProps) => (
  <div
    className={`animate-rise motion-reduce:animate-none ${className || ""}`}
    style={delay ? { animationDelay: `${delay}s` } : undefined}
  >
    {children}
  </div>
);
