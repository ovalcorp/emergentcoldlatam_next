# Emergent Cold Latam - Frontend

Frontend Next.js para **Emergent Cold Latam**, el mayor proveedor de soluciones de logística con cadena de frío en Latinoamérica (Perú, Ecuador, Chile).

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **Headless UI**, Formik, Yup, React Toastify

## Requisitos

- Node.js 18+
- npm, yarn, pnpm o bun

## Instalación

```bash
npm install
# o
yarn install
# o
pnpm install
```

## Variables de entorno

Copia el archivo de ejemplo y configura tus valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL del backend Django (ej: `http://127.0.0.1:8000`) |

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La app se conecta al backend en la URL configurada en `NEXT_PUBLIC_API_URL`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Ejecutar ESLint |

## Estructura principal

```
app/
├── api/              # Rutas API (auth proxy)
├── component/        # Componentes reutilizables
├── context/          # AuthProvider
├── dashboard/        # Páginas del dashboard
├── hook/             # useUser, useAuth
├── lib/              # api-client, utils, auth-cookies
├── login/
└── ui/               # UI del dashboard (header, sidenav)
```

## Backend

Este frontend consume la API REST del proyecto **EmergentColdLatam_django**. Asegúrate de tener el backend corriendo en la URL configurada en `NEXT_PUBLIC_API_URL`.

## Deploy

Compatible con [Vercel](https://vercel.com). Configura `NEXT_PUBLIC_API_URL` con la URL de tu API en producción.
