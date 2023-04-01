import React, { useState } from "react";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const HamburgerMenu = ({ isOpen, setIsOpen }: MenuProps) => {
  const genericHamburgerLine = `h-1 w-9 my-1 rounded-full bg-secondary transition ease transform duration-300`;

  return (
    <button
      className="flex flex-col h-12 w-12 rounded justify-center items-start group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "rotate-45 translate-y-3" : ""
        }`}
      />
      <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""}`} />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "-rotate-45 -translate-y-3" : ""
        }`}
      />
    </button>
  );
};

export default HamburgerMenu;
