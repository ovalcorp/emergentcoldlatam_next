'use client';

import { Dispatch, SetStateAction, Suspense } from 'react';
import Image from 'next/image';
import { BRAND_COLOR } from '../../globals';
import { useAuth } from '../../hook/useAuth';
import { HeaderSkeleton } from '../skeletons/header-skeletons';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const { logout, user } = useAuth();
  const username = user?.username;
  const firstName = user?.first_name;
  const email = user?.email;

  return (
    <header className="text-white p-4 flex items-center justify-between" style={{ backgroundColor: BRAND_COLOR }}>
        {/*Contenedor de los botones y el logo --  lado izquierdo */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-800 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <div className="rounded-full border-2 border-white bg-white p-0.5">
            <Image
              src="/logo-emergentcold.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
              loading="lazy"
            />
          </div>
          {/*Nombre del logo*/}
          <span className="font-bold text-xl">DASHBOARD</span>
        </div>
      </div>
      
      {/* Lado derecho: usuario y logout */}
      <div className="flex items-center gap-4">
        <Suspense fallback={<HeaderSkeleton />}>
          <div className="hidden md:flex items-center gap-3 rounded-lg border border-white/20 bg-white/5 px-4 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
              {(firstName?.[0] || username?.[0] || email?.[0] || 'U').toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                Bienvenido
              </span>
              <span className="text-sm font-medium text-white">
                {firstName || username || email || 'Usuario'}
              </span>
            </div>
          </div>
        </Suspense>

        <div className="hidden h-8 w-px bg-white/20 md:block" aria-hidden />

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:border-white/30"
          title="Cerrar sesión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
} 
