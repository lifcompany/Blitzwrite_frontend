import React, { useState } from 'react';
import SideBar from '../../component/sidebar/SideBar';
import Header from '../../component/common/header';
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
