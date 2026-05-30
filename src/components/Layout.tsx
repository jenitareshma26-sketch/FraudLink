import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-dark-bg'>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className='min-h-screen flex flex-col md:ml-64 overflow-hidden'>
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content Area */}
        <main className='flex-1 overflow-y-auto pt-16 bg-dark-bg'>
          <div className='px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
