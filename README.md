# Emergent Cold Latam — Frontend

Aplicación web **Next.js** para **Emergent Cold Latam**: logística y cadena de frío en Latinoamérica (Perú, Ecuador, Chile). Este cliente consume la API REST del backend **EmergentColdLatam_django** mediante rutas BFF en `app/api` (cookies HTTP-only, JWT y refresh).

---

## Stack

| Tecnología | Uso |
|------------|-----|
| **Next.js 16** | App Router, Route Handlers (`app/api`) |
| **React 19** | UI |
| **TypeScript 5** | Tipado |
| **Tailwind CSS v4** | Estilos (`@tailwindcss/postcss`) |
| **Headless UI** | Componentes accesibles (Fieldset, etc.) |
| **Formik + Yup** | Formularios y validación |
| **React Toastify** | Notificaciones |
| **date-fns** / **moment** | Fechas |
| **react-big-calendar** | Calendario (Mesa de operaciones) |

---

## Requisitos

- **Node.js 18+** (recomendado 20 LTS)
- **npm**, yarn, pnpm o bun
- Backend Django en ejecución (ver variable de entorno)

---

## Instalación

```bash
cd emergentcoldlatam_next
npm install
```

### Variables de entorno

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL base del backend Django **sin** barra final (ej. `http://127.0.0.1:8000`). Usada por `app/lib/api-client.ts` y `app/lib/utils.ts` (`BASE_API_URL`). |

> El archivo `.env.example` incluye un valor de ejemplo para desarrollo local.

---

## Desarrollo y producción

```bash
npm run dev      # http://localhost:3000
npm run build    # Build de producción
npm run start    # Servidor tras build
npm run lint     # ESLint (eslint-config-next)
```

Asegúrate de que el backend responda en `NEXT_PUBLIC_API_URL` y que CORS/cookies estén alineados con tu entorno.

---

## Arquitectura resumida

1. **Login** (`/login`): credenciales → `POST /api/auth/login` → cookies de sesión (access/refresh).
2. **Rutas `app/api/*`**: proxy seguro hacia Django (`fetchWithAuth` en `app/lib/api-client.ts`), reenvío de JWT desde cookies y **refresh** automático en 401.
3. **Cliente (hooks / componentes)**: `fetch` a **`/api/...`** del mismo origen Next (`credentials: 'include'`), no llama al dominio de Django desde el navegador.
4. **`next.config.ts`**: `rewrites` opcionales hacia el backend; las **Route Handlers** definidas en `app/api` tienen prioridad cuando existen.

---

## Estructura del proyecto

```
emergentcoldlatam_next/
├── app/
│   ├── api/                    # BFF → Django (auth + recursos)
│   │   ├── auth/               # login, logout, refresh, me
│   │   ├── countries/          # CRUD países
│   │   ├── sites/              # CRUD sites (+ filtros/paginación)
│   │   ├── users/              # usuarios
│   │   ├── operations/         # operaciones
│   │   ├── departments/        # departamentos (master data)
│   │   ├── areas/              # áreas (?department=…)
│   │   ├── metadata/           # metadata
│   │   └── guia-carnica/       # consulta guía cárnica (WMS)
│   ├── component/              # Formularios, tablas, modal, etc.
│   │   ├── administration/     # users, sites, countries
│   │   ├── common/form/
│   │   └── operations/
│   ├── context/                # AuthProvider, auth-context
│   ├── dashboard/              # Layout + páginas del panel
│   ├── hook/                   # useAuth, useUser, useCountry, useSite,
│   │                           # useDepartment, useArea, useMetadata,
│   │                           # useOperation, useGuiaCarnica, …
│   ├── lib/                    # api-client, auth-cookies, utils
│   ├── login/
│   ├── services/               # crudService (GET/POST/PATCH/DELETE genéricos)
│   ├── ui/                     # login-form, dashboard header/sidenav
│   ├── utils/                  # handleRequest, extractErrorMessage
│   ├── layout.tsx, page.tsx, globals.css
│   └── globals.ts              # colores de marca (BRAND, SECONDARY, …)
├── proxy.ts                    # utilidades de proxy (si aplica)
├── next.config.ts
├── package.json
└── react-big-calendar.d.ts     # tipos locales
```

---

## Dashboard y permisos

El menú lateral (`app/ui/dashboard/nav-link.tsx`) agrupa **Administración**, **Mesa de Operaciones**, **Operaciones**, **Calidad**, **Gestión Humana**, **IT**, **Mantenimiento**, **WMS**, **Mantenedor**, **Especiales**, etc.

El **acceso por sección** se controla con los **metadata** del usuario (`metadata_names` en el perfil): cada ítem del menú exige que el usuario tenga al menos uno de los permisos configurados en `NAV_PERMISSIONS` (además de autenticación, usuario activo y, salvo el Dashboard, `is_staff`).

### Páginas implementadas (ejemplos)

- **Dashboard** — `/dashboard`
- **Administración** — usuarios, países, sites (`/dashboard/administration/...`)
- **Mesa de operaciones** — mesa, calendario, indicadores
- **WMS** — recepción y despacho (guía cárnica) — `/dashboard/wms/reception`, `/dashboard/wms/dispatch`

Otras entradas del menú pueden apuntar a rutas aún en desarrollo; conviene alinear `href` en `nav-link.tsx` con carpetas reales bajo `app/dashboard/`.

---

## Hooks y datos

- **`useAuth`**: contexto de sesión y usuario.
- **CRUD maestros**: `useCountry`, `useSite`, `useDepartment`, `useArea` (filtro por departamento), `useMetadata`, `useUser`, `useOperation`.
- **`useGuiaCarnica`**: consulta POST a guía cárnica vía `/api/guia-carnica`.
- **`crudService`**: `getAll`, `createOne`, `updateOne`, `deleteOne` sobre `/api/{endpoint}`.

---

## Backend

Repositorio relacionado: **EmergentColdLatam_django**. Este frontend asume:

- API bajo `/api/...` en el mismo host configurado en `NEXT_PUBLIC_API_URL`.
- Autenticación JWT coherente con las rutas `app/api/auth/*`.

---

## Despliegue

Compatible con plataformas como **Vercel** u otros hosts Node.js:

1. Definir `NEXT_PUBLIC_API_URL` con la URL pública del API en producción.
2. Configurar cookies seguras (`Secure`, dominio, SameSite) según tu dominio front/back.
3. `npm run build` y `npm run start` (o el comando del proveedor).

---

## Licencia / empresa

Uso interno **Emergent Cold Latam**. Ajusta licencia y contacto según políticas de tu organización.
