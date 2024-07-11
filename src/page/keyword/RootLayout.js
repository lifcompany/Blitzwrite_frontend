import React, { useState } from 'react';
import { FiAlignJustify } from "react-icons/fi";
import SideBar from '../../component/sidebar/SideBar';
import TopBar from '../../component/sidebar/TopBar';
import InitPage from './InitPage';

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
          <SideBar showSidebar={showSidebar} />
          <div className="p-4 xl:ml-[270px] relative">
            <FiAlignJustify onClick={toggleSidebar} className="absolute xl:hidden right-4" size={30} />
            <TopBar />
            {children}
            {/* <InitPage/> */}
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
