'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: 'M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z' },
  { name: 'Users', href: '/dashboard/users', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Operaciones', href: '/dashboard/operations', icon: 'M9 17v-6h13v6M9 5h13M9 11h13M3 5h.01M3 11h.01M3 17h.01' },
  { name: 'Transporte', href: '/dashboard/transport', icon: 'M3 13h2l1-2h12l1 2h2v6h-2a2 2 0 01-4 0H7a2 2 0 01-4 0H1v-6h2zm3 0h12' },
  { name: 'Reportes', href: '/dashboard/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h7a2 2 0 012 2v4' },
  { name: 'Asistencia', href: '/dashboard/reports/attendance', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'Recepción', href: '/dashboard/reports/reception', icon: 'M3 7h18M5 7v12h14V7M9 11h6' },
  { name: 'Despacho', href: '/dashboard/reports/shipping', icon: 'M20 8h-3V4H7v4H4l-1 9h18l-1-9zM7 8h10' },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {navItems.map((item) => (
                <li key={item.name}>
                    <Link
                        href={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 ${
                            pathname === item.href ? 'bg-gray-800' : ''
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={item.icon}
                            />
                        </svg>
                        <span>{item.name}</span>
                    </Link>
                </li>
            ))}
        </>
    );
}