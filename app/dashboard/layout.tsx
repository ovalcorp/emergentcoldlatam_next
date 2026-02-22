'use client';

import { useState } from 'react';
import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '@/app/ui/dashboard/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <div className="flex flex-1 overflow-hidden">
        <div className={`transition-all duration-300 ${isMenuOpen ? 'w-64' : 'w-0'}`}>
          <SideNav/>
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}