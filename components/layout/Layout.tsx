import Link from "next/link";
import React, { FC, ReactElement, useEffect, useState } from "react";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { useRouter } from "next/router";
import ScrollProgress from "./ScrollProgress";
import MobileMenu, { NavItem } from "./MobileMenu";

// Navigacija je zakucana u kodu jer u Contentfulu postoji samo jedan `header`
// entry i on ima srpske linkove. Kada se u CMS-u napravi engleski header, ovo
// se moze zameniti podacima iz njega.
const NAV: NavItem[] = [
  { text: "Portfolio", href: "/en/portfolio" },
  { text: "Video Ads", href: "/en/video-ads" },
  { text: "Email Sequences", href: "/en/email-sequences" },
  { text: "Landing Pages", href: "/en/landing-pages" },
  { text: "Contact", href: "/en/contact" },
];

interface Props {
  children: ReactElement | ReactElement[];
}

const Layout: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = NAV;

  return (
    <div>
      <div
        className={`fixed h-[72px] w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <div className="container h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/" legacyBehavior>
              <a>
                <span className="text-navy heading-4">Slaviša Bogdanović</span>
              </a>
            </Link>

            <div className="hidden lg:flex gap-8 items-center">
              {navItems.map((item, id) => (
                <Link legacyBehavior key={id} href={item.href}>
                  <a
                    className={`whitespace-nowrap body-2 transition-colors ${
                      id === navItems.length - 1
                        ? "bg-secondary text-white px-4 py-2 hover:bg-primary-contrast"
                        : "text-gray-600 hover:text-secondary"
                    }`}
                  >
                    {item.text}
                  </a>
                </Link>
              ))}
            </div>

            <div className="lg:hidden flex items-center">
              <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>

      {/* Meni je namerno van header diva: header je fixed sa z-50 i pravi svoj
          stacking context, pa je ugnjezdeni panel zavisio od njega. */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={navItems}
      />

      <ScrollProgress />
      <main className="pt-[72px]" id="#main-content">
        {children}
      </main>
      <footer className="bg-navy text-white">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="heading-4 text-white">Slaviša Bogdanović</span>
              <p className="text-gray-400 body-3 mt-1">Copywriter</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-gray-400 body-3">
              <Link href="/en/privacy-policy" legacyBehavior>
                <a className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/en/terms-of-use" legacyBehavior>
                <a className="hover:text-white transition-colors">
                  Terms of Use
                </a>
              </Link>
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 body-4">
            <p>© 2025 Slaviša Bogdanović. All Rights Reserved.</p>
            <p>
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/danijel-glisic/"
                className="hover:text-white transition-colors underline"
              >
                Danijel Glišić
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
