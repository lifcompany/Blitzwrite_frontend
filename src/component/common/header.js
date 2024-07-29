import React from "react";
import MenuGroup from "./MenuGroup";
import IconGroup from "./IconGroup";
import LogoGroup from "./LogoGroup";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {

  return (
    <header>
      <HamburgerMenu />
      <nav className="flex justify-between items-center img-bg h-24 px-20 text-xl">
        <div className="flex items-center gap-7">
          <LogoGroup />
          <MenuGroup />
        </div>
        <IconGroup />
      </nav>
    </header>
  );
};

export default Header;
