import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Naslov sa suptilnim ulaznim efektom.
 *
 * Ranije je ovo bio Framer Motion sa `whileInView` i stagger-om po recima:
 * svaka rec je krenula od opacity 0 i cekala svoj red. Kad bi se animacija
 * zaustavila na pola — a to se realno desavalo na telefonima — polovina
 * naslova bi ostala nevidljiva. Klijent je to prijavio na Contact i Portfolio
 * stranama.
 *
 * Sada je ceo naslov jedan CSS keyframe, bez IntersectionObserver-a i bez
 * deljenja na reci. CSS animacija nema JS petlju koja moze da stane.
 *
 * Uz to: stara verzija je reci stavljala u inline-flex sa CSS razmakom, pa u
 * DOM-u nije bilo pravih razmaka — naslov se citao kao "Viewsdon'tpaythebills."
 * i Googlu i citacima ekrana. Sada je obican tekst.
 */
export const AnimatedText = ({ text, className, delay }: AnimatedTextProps) => (
  <span
    className={`inline-block animate-fade-up motion-reduce:animate-none ${
      className || ""
    }`}
    style={delay ? { animationDelay: `${delay}s` } : undefined}
  >
    {text}
  </span>
);
