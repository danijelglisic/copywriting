import Link from "next/link";
import React, { FC, useEffect } from "react";

export interface NavItem {
  text: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

/**
 * Mobilni meni.
 *
 * Dva pravila drze ovo ispravnim:
 *
 * 1. Pozadina je na spoljasnjem sloju koji se NIKAD ne animira. Ranije je
 *    opacity celog panela bio animiran i znao je da se zaglavi na ~0.15, pa je
 *    meni ostajao providan i tekst strane se video kroz njega.
 * 2. Ulazna animacija je CSS, ne Framer Motion. Framer koristi requestAnimation-
 *    Frame i u praksi se zamrzavao na pola (transform je ostajao na -10px). CSS
 *    animacija uvek dodje do kraja.
 */
const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, items }) => {
  // Zakljucaj skrol pozadine dok je meni otvoren.
  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const links = items.slice(0, -1);
  const cta = items[items.length - 1];

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="lg:hidden fixed top-[72px] bottom-0 left-0 right-0 z-40 bg-navy overflow-y-auto overscroll-contain"
    >
      <nav
        className="container flex min-h-full flex-col pb-10 pt-6 animate-menu-in motion-reduce:animate-none"
        aria-label="Main"
      >
        <ul className="flex flex-col">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between border-b border-white/10 py-5 text-white subtitle-2 transition-colors hover:text-primary active:text-primary"
              >
                {item.text}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/30"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        {cta && (
          <Link
            href={cta.href}
            onClick={onClose}
            className="mt-8 block bg-secondary px-6 py-4 text-center body-2 font-bold text-white transition-colors hover:bg-primary-contrast active:bg-primary-contrast"
          >
            {cta.text}
          </Link>
        )}

        <p className="mt-auto pt-10 text-white/40 body-4">
          Slaviša Bogdanović — Copywriter
        </p>
      </nav>
    </div>
  );
};

export default MobileMenu;
