import React from "react";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Isti razlog kao kod [AnimatedText]: Framer Motion `whileInView` je krenuo od
 * opacity 0 i umeo da se zamrzne, pa je sadrzaj ostajao nevidljiv. CSS keyframe
 * uvek dodje do kraja i ne zavisi od IntersectionObserver-a.
 */
export const FadeUp = ({ children, delay = 0, className }: FadeUpProps) => (
  <div
    className={`animate-fade-up motion-reduce:animate-none ${className || ""}`}
    style={delay ? { animationDelay: `${delay}s` } : undefined}
  >
    {children}
  </div>
);
