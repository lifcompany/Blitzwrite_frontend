import React, { useState } from 'react';
import { FiAlignJustify } from "react-icons/fi";
import SideBar from '../../component/sidebar/SideBar';
import TopBar from '../../component/sidebar/TopBar';
import InitPage from './InitPage';
import UserMenu from '../../component/common/userMenu';
import Header from '../../component/common/header';
import IconGroup from '../../component/common/IconGroup';
import MenuGroup from '../../component/common/MenuGroup';
import HamburgerMenu from '../../component/common/HamburgerMenu';

export const metadata = {
  title: 'Article AI Generator',
  description: 'Article AI',
};


const RootLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen img-bg bg-cover bg-center bg-fixed">
          {/* <SideBar showSidebar={showSidebar} /> */}
          <div className=" relative">
            {/* <FiAlignJustify onClick={toggleSidebar} className="absolute xl:hidden top-9 right-4" size={30} /> */}
            <HamburgerMenu />
            <Header />
            {/* <nav className="flex justify-between items-center img-bg h-24 px-20 text-xl">
              <div className="flex items-center gap-7">
                <MenuGroup />
              </div>
              <IconGroup />
            </nav> */}
            <div className='lg:ml-[270px] mt-12'>
              <SideBar showSidebar={showSidebar} />
              {children}

            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
