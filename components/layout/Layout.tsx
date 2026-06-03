import { ICta } from "@/@types/generated/contentful";
import Link from "next/link";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { useRouter } from "next/router";
import ScrollProgress from "./ScrollProgress";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: ReactElement | ReactElement[];
  links?: ICta[];
  isEnglish?: boolean;
}

const LanguageSwitcher = ({ isEnglish }: { isEnglish?: boolean }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = isEnglish ? "EN" : "SR";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 p-2 body-2 text-black hover:text-secondary transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {current}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200  shadow-lg overflow-hidden z-[9999] min-w-[120px]">
          <Link href="/" legacyBehavior>
            <a
              className={`block px-4 py-2 body-2 hover:bg-gray-50 transition-colors ${
                !isEnglish ? "font-bold text-secondary" : "text-black"
              }`}
              onClick={() => setOpen(false)}
            >
              Srpski
            </a>
          </Link>
          <Link href="/en" legacyBehavior>
            <a
              className={`block px-4 py-2 body-2 hover:bg-gray-50 transition-colors ${
                isEnglish ? "font-bold text-secondary" : "text-black"
              }`}
              onClick={() => setOpen(false)}
            >
              English
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

const Layout: FC<Props> = ({ children, links, isEnglish }) => {
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

  return (
    <div>
      <div className={`fixed h-[72px] w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"}`}>
        <div className="container h-full">
          <div className="flex justify-between items-center h-full">
            <Link href={isEnglish ? "/en" : "/"} legacyBehavior>
              <a>
                <span className="text-secondary heading-4">Slaviša Bogdanović</span>
              </a>
            </Link>
            {isEnglish ? (
              <div className="flex items-center gap-4">
                <button className="bg-secondary text-white whitespace-nowrap px-4 py-2 body-2 hover:bg-primary-contrast transition-colors">
                  Contact
                </button>
                <LanguageSwitcher isEnglish={isEnglish} />
              </div>
            ) : (
              <>
                <div className="hidden lg:flex gap-8 items-center">
                  {links?.map((link, id) => (
                    <Link legacyBehavior key={id} href={"/" + (link.fields as any)?.url || ""}>
                      <a className={`whitespace-nowrap body-2 transition-colors ${
                        id === links.length - 1
                          ? "bg-secondary text-white px-4 py-2 hover:bg-primary-contrast"
                          : "text-gray-600 hover:text-secondary"
                      }`}>
                        {(link.fields as any)?.text || ""}
                      </a>
                    </Link>
                  ))}
                  <LanguageSwitcher isEnglish={isEnglish} />
                </div>
                <div className="lg:hidden flex items-center gap-4">
                  <LanguageSwitcher isEnglish={isEnglish} />
                  <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="fixed bg-dark top-[72px] bottom-0 left-0 right-0 z-40"
                    >
                      <div className="container pt-10">
                        <div className="flex flex-col items-start gap-2">
                          {links?.map((link, id) => (
                            <Link legacyBehavior key={id} href={"/" + (link.fields as any)?.url || ""}>
                              <a className={`whitespace-nowrap py-3 body-1 w-full border-b border-white/10 transition-colors ${
                                id === links.length - 1
                                  ? "text-secondary font-bold"
                                  : "text-white hover:text-secondary"
                              }`}>
                                {(link.fields as any)?.text || ""}
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>
      <ScrollProgress />
      <main className="pt-[72px]" id="#main-content">
        {children}
      </main>
      <footer className="bg-dark text-white">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="heading-4 text-white">Slaviša Bogdanović</span>
              <p className="text-gray-400 body-3 mt-1">Copywriter</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-gray-400 body-3">
              {isEnglish ? (
                <>
                  <Link href="/en/privacy-policy" legacyBehavior>
                    <a className="hover:text-white transition-colors">Privacy Policy</a>
                  </Link>
                  <Link href="/en/terms-of-use" legacyBehavior>
                    <a className="hover:text-white transition-colors">Terms of Use</a>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/politika-privatnosti" legacyBehavior>
                    <a className="hover:text-white transition-colors">Politika privatnosti</a>
                  </Link>
                  <Link href="/uslovi-koriscenja-sajta" legacyBehavior>
                    <a className="hover:text-white transition-colors">Uslovi korišćenja sajta</a>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 body-4">
            <p>© 2025 Slaviša Bogdanović. All Rights Reserved.</p>
            <p>
              Created by{" "}
              <a href="https://www.linkedin.com/in/danijel-glisic/" className="hover:text-white transition-colors underline">
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
