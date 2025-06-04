import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header pageTitle={pageTitle} />
      <main
        className={cn(
          'ml-64',                     // Offset for fixed w-64 sidebar
          'mt-[70px]',                 // Offset for fixed h-[70px] header
          'h-[calc(100vh-70px)]',      // Full viewport height minus header height
          'overflow-y-auto',         // Enable vertical scrolling for main content area
          'p-6',                     // Padding for the content itself
          'bg-background',             // Background color for the main content area
          'flex flex-col gap-6'      // Layout for direct children as per MainContent requirements
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
