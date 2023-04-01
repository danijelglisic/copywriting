import { ICta } from "@/@types/generated/contentful";
import Link from "next/link";
import React, { FC, ReactElement, useState } from "react";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";

interface Props {
  children: ReactElement | ReactElement[];
  links?: ICta[];
}

const Layout: FC<Props> = ({ children, links }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="fixed bg-white h-[80px] w-full z-50">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <span className="text-black heading-4">Slaviša Bogdanović</span>
            </Link>
            <div className="hidden lg:flex gap-10">
              {links?.map((link, id) => {
                return (
                  <Link
                    key={id}
                    className={`hover:underline whitespace-nowrap p-2 body-2 ${
                      id === links.length - 1
                        ? "bg-secondary text-white rounded-sm"
                        : "text-black"
                    }`}
                    href={link.fields.url || ""}
                  >
                    {link.fields.text || ""}
                  </Link>
                );
              })}
            </div>
            <div className="lg:hidden">
              <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            {isOpen && (
              <div className="fixed bg-white top-[80px] bottom-0 left-0 right-0">
                <div className="container">
                  <div className="flex flex-col items-start lg:hidden gap-6 lg:gap-10">
                    {links?.map((link, id) => {
                      return (
                        <Link
                          key={id}
                          className={`hover:underline whitespace-nowrap p-2 body-2 ${
                            id === links.length - 1
                              ? "bg-secondary text-white rounded-sm"
                              : "text-black"
                          }`}
                          href={link.fields.url || ""}
                        >
                          {link.fields.text || ""}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <main className="pt-[80px]" id="#main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
