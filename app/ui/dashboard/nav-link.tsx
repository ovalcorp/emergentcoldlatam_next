'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hook/useAuth';

type NavItem =
  | { name: string; href: string; icon: string }
  | {
      name: string;
      icon: string;
      children: { name: string; href: string; icon: string }[];
    };

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: 'M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z' },
  {
    name: 'Administración',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    children: [
      { name: 'Usuarios', href: '/dashboard/administration/users', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { name: 'Paises', href: '/dashboard/administration/countries', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M21 12v-2.945a2 2 0 00-2-2 2 2 0 01-2-2V9a2 2 0 00-2-2h-1.055' },
      { name: 'Sites', href: '/dashboard/administration/sites', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    ],
  },
  {
    name: 'Mesa de Operaciones',
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
    children: [
      { name: 'Mesa de operaciones', href: '/dashboard/operation_desk/desk', icon: 'M5 6h14v10H5z M3 18h18' },
      { name: 'Calendario', href: '/dashboard/operation_desk/calendar', icon: 'M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z' },
      { name: 'Indicadores', href: '/dashboard/operation_desk/indicators', icon: 'M5 12h2v7H5zM11 9h2v10h-2zM17 6h2v13h-2z' },
    ],
  },
  {
    name: 'Operaciones',
    icon: 'M3 7h18M3 12h18M3 17h18',
    children: [
      { name: 'Recepción', href: '/dashboard/operations/reception', icon: 'M4 7h16v10H4z M9 11h6 M12 8v6' },
      { name: 'Despacho', href: '/dashboard/operations/dispatch', icon: 'M3 10h11l4 4v4H3z M14 10V6h5' },
    ],
  },
  {
    name: 'Calidad',
    icon: 'M9 12l2 2 4-4 M12 2a10 10 0 100 20 10 10 0 000-20z',
    children: [
      { name: 'Temperaturas', href: '/dashboard/quality/temperatures', icon: 'M10 3a2 2 0 00-2 2v7.586a2 2 0 000 2.828l1.414 1.414a3 3 0 104.243-4.243L12 13.414V5a2 2 0 00-2-2z' },
    ],
  },
  {
    name: 'Gestión Humana',
    icon: 'M12 14c4.418 0 8 1.79 8 4v2H4v-2c0-2.21 3.582-4 8-4z M12 12a4 4 0 100-8 4 4 0 000 8z',
    children: [
      { name: 'Asistencia', href: '/dashboard/human_management/attendance', icon: 'M8 7V3m8 4V3M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z' },
    ],
  },
  {
    name: 'IT',
    icon: 'M4 6h16v10H4z M8 20h8',
    children: [
      { name: 'Inventario', href: '/dashboard/it/inventory', icon: 'M4 4h16v4H4z M4 10h16v10H4z' },
      { name: 'Checklist Infraestructura', href: '/dashboard/it/checklist_infrastructure', icon: 'M9 12l2 2 4-4 M4 6h16v12H4z' },
      { name: 'Checklist Aplicaciones', href: '/dashboard/it/checklist_applications', icon: 'M5 4h14v16H5z M9 9h6 M9 13h6' },
    ],
  },
  {
    name: 'Mantenimiento',
    icon: 'M14.7 6.3a1 1 0 010 1.4l-7 7a1 1 0 01-.7.3H5v-2h1.59l6.7-6.7a1 1 0 011.41 0z M4 20h5',
    children: [
      { name: 'Checklist Apilador', href: '/dashboard/maintenance/checklist_forklift', icon: 'M3 13h6v7H3z M9 3h4v10H9z M13 8h8' },
    ],
  },
  {
    name: 'WMS',
    icon: 'M4 4h16v4H4z M4 10h16v10H4z',
    children: [
      { name: 'Recepción', href: '/dashboard/wms/reception', icon: 'M4 7h16v10H4z M12 9v4 M10 11h4' },
      { name: 'Despacho', href: '/dashboard/wms/dispatch', icon: 'M3 10h11l4 4v4H3z M14 10V6h5' },
    ],
  },
  {
    name: 'Mantenedor',
    icon: 'M12 6V3m0 3a3 3 0 013 3h3M12 6a3 3 0 00-3 3H6m6 3v9',
    children: [
      { name: 'Clientes', href: '/dashboard/maintainer/clients', icon: 'M5 20h14v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2z M12 10a4 4 0 100-8 4 4 0 000 8z' },
      { name: 'Tipo de Carga', href: '/dashboard/maintainer/cargo_type', icon: 'M4 7h16M4 12h16M4 17h16' },
    ],
  },
  {
    name: 'Especiales',
    icon: 'M12 8v4l3 3 M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    children: [
      { name: 'Cencosud', href: '/dashboard/specials/cencosud', icon: 'M12 8v4l3 3 M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    ],
  },
]

// ─────────────────────────────────────────
// Permisos por sección
// ─────────────────────────────────────────
const NAV_PERMISSIONS: Record<string, string[]> = {
  'Dashboard':           [],                                    // solo auth + active
  'Administración':      ['super_user', 'it'],
  'Mesa de Operaciones': ['super_user', 'mesa_operaciones'],
  'Operaciones':         ['super_user', 'operaciones'],
  'Calidad':             ['super_user', 'calidad'],
  'Gestión Humana':      ['super_user', 'gestion_humana'],
  'IT':                  ['super_user', 'it'],
  'Mantenimiento':       ['super_user', 'mantenimiento'],
  'WMS':                 ['super_user', 'operaciones', 'mesa_operaciones', 'wms'],
  'Mantenedor':          ['super_user', 'it'],
  'Especiales':          ['super_user', 'especial'],
}

function IconSvg({ d }: { d: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  )
}

export default function NavLinks() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  // ✅ Extrae los nombres de metadata del usuario
  const userMetadata: string[] = useMemo(() =>
    user?.metadata_names?.map((m: { name: string }) => m.name) ?? []
  , [user?.metadata_names])

  // ✅ Verifica si el usuario tiene acceso a una sección
  const hasAccess = useMemo(() => (itemName: string): boolean => {
    // Condición base — debe estar autenticado y activo
    if (!isAuthenticated || !user?.is_active) return false

    // Dashboard solo requiere auth + active
    if (itemName === 'Dashboard') return true

    // El resto requiere además is_staff
    if (!user?.is_staff) return false

    // Verifica si tiene alguno de los metadata permitidos
    const allowed = NAV_PERMISSIONS[itemName] ?? []
    return allowed.some(permission => userMetadata.includes(permission))
  }, [isAuthenticated, user, userMetadata])

  const itemsToShow = useMemo(() =>
    navItems.filter(item => hasAccess(item.name))
  , [hasAccess])

  return (
    <>
      {itemsToShow.map((item) => {
        if ('children' in item) {
          const isActive = item.children.some((c) => pathname === c.href)
          return (
            <NavGroup key={item.name} label={item.name} icon={item.icon} isActive={isActive}>
              {item.children.map((child) => (
                <li key={child.name}>
                  <Link
                    href={child.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 pl-11 hover:bg-gray-800 ${
                      pathname === child.href ? 'bg-gray-800' : ''
                    }`}
                  >
                    <IconSvg d={child.icon} />
                    <span>{child.name}</span>
                  </Link>
                </li>
              ))}
            </NavGroup>
          )
        }
        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 ${
                pathname === item.href ? 'bg-gray-800' : ''
              }`}
            >
              <IconSvg d={item.icon} />
              <span>{item.name}</span>
            </Link>
          </li>
        )
      })}
    </>
  )
}

function NavGroup({
  label,
  icon,
  isActive,
  children,
}: {
  label: string
  icon: string
  isActive: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(isActive)

  useEffect(() => {
    if (isActive) setOpen(true)
  }, [isActive])

  return (
    <li className="space-y-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-3 rounded-md p-3 text-left hover:bg-gray-800 ${
          isActive ? 'bg-gray-800/80' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <IconSvg d={icon} />
          <span>{label}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <ul className="space-y-0.5">{children}</ul>}
    </li>
  )
}