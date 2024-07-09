import React from 'react';
import SideBar from '../../component/sidebar/SideBar';
import TopBar from '../../component/sidebar/TopBar';
import InitPage from './InitPage';

export const metadata = {
  title: 'Article AI Generator',
  description: 'Article AI',
};


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50/50">
          <SideBar />
          <div className="p-4 xl:ml-[270px]">
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
