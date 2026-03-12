import { ICta } from "@/@types/generated/contentful";
import Link from "next/link";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { useRouter } from "next/router";
import ScrollProgress from "./ScrollProgress";

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
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-[9999] min-w-[120px]">
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

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div>
      <div className="fixed bg-white h-[80px] w-full z-50">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            <Link href={isEnglish ? "/en" : "/"} legacyBehavior>
              <a>
                <span className="text-secondary  heading-4">
                  Slaviša Bogdanović
                </span>
              </a>
            </Link>
            {isEnglish ? (
              <div className="flex items-center gap-4">
                <button className="bg-secondary text-white rounded-sm whitespace-nowrap p-2 body-2">
                  Contact
                </button>
                <LanguageSwitcher isEnglish={isEnglish} />
              </div>
            ) : (
              <>
                <div className="hidden lg:flex gap-10 items-center">
                  {links?.map((link, id) => {
                    return (
                      <Link
                        legacyBehavior
                        key={id}
                        href={"/" + (link.fields as any)?.url || ""}
                      >
                        <a
                          className={`hover:underline whitespace-nowrap p-2 body-2 ${
                            id === links.length - 1
                              ? "bg-secondary text-white rounded-sm"
                              : "text-black"
                          }`}
                        >
                          {(link.fields as any)?.text || ""}
                        </a>
                      </Link>
                    );
                  })}
                  <LanguageSwitcher isEnglish={isEnglish} />
                </div>
                <div className="lg:hidden flex items-center gap-4">
                  <LanguageSwitcher isEnglish={isEnglish} />
                  <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                {isOpen && (
                  <div className="fixed bg-white top-[80px] bottom-0 left-0 right-0">
                    <div className="container">
                      <div className="flex flex-col items-start lg:hidden gap-6 lg:gap-10">
                        {links?.map((link, id) => {
                          return (
                            <Link
                              legacyBehavior
                              key={id}
                              href={"/" + (link.fields as any)?.url || ""}
                            >
                              <a
                                className={`hover:underline whitespace-nowrap p-2 body-2 ${
                                  id === links.length - 1
                                    ? "bg-secondary text-white rounded-sm"
                                    : "text-black"
                                }`}
                              >
                                {(link.fields as any)?.text || ""}
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ScrollProgress />
      <main className="pt-[80px]" id="#main-content">
        {children}
      </main>
      <footer className="border-t-4 border-secondary py-10">
        <div className="container text-center text-secondary space-y-8">
          <div className="subtitle-1">
            <p>© 2025 Slaviša Bogdanović, All Rights Reserved.</p>
          </div>
          <div className="flex gap-4 items-center justify-center regular-1">
            {isEnglish ? (
              <>
                <Link href="/en/privacy-policy" legacyBehavior>
                  <a className="hover:underline">Privacy Policy</a>
                </Link>
                <Link href="/en/terms-of-use" legacyBehavior>
                  <a className="hover:underline">Terms of Use</a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/politika-privatnosti" legacyBehavior>
                  <a className="hover:underline">Politika privatnosti</a>
                </Link>
                <Link href="/uslovi-koriscenja-sajta" legacyBehavior>
                  <a className="hover:underline">Uslovi korišćenja sajta</a>
                </Link>
              </>
            )}
          </div>
          <div className="regular-1">
            <p>Created by: Danijel Glišić</p>
            <div className="text-primary-contrast underline gap-4 flex items-center justify-center">
              <a href="https://www.linkedin.com/in/danijel-glisic/">Linkedin</a>
              <a href="mailto:dglisic8@gmail.com">E-mail</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
