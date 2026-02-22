'use client';

import NavLinks from './nav-link';
import { BRAND_COLOR_LIGHT } from '../../globals';

interface SideNavProps {
  isMenuOpen: boolean;
}

export default function SideNav() {
  return (
    <nav
      className="text-white h-full flex flex-col transition-colors"
      style={{ backgroundColor: BRAND_COLOR_LIGHT }}
    >
      <div className="p-4">
        <ul className="space-y-2">
          <NavLinks />
        </ul>
      </div>
    </nav>
  );
}

