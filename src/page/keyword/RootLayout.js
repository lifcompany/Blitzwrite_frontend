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

    <div className="min-h-screen img-bg bg-cover bg-center bg-fixed">
      <div className=" relative min-h-screen flex flex-col">
        <HamburgerMenu />
        <Header />
        <div className='lg:ml-[270px] mt-12 flex-1 '>
          <SideBar showSidebar={showSidebar} />
          {children}

        </div>
      </div>
    </div>
  );
};

export default RootLayout;
