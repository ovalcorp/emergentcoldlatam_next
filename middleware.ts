import { NextRequest, NextResponse } from "next/server"

// Rutas que requieren login
const protectedRoutes = ["/dashboard"]

// Rutas públicas
const publicRoutes = ["/login", "/"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ¿La ruta empieza con /dashboard?
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  // ¿Es ruta pública?
  const isPublicRoute = publicRoutes.includes(pathname)

  // 🍪 Leer cookie JWT (HttpOnly, solo existencia)
  const accessToken = req.cookies.get("access")?.value

  /**
   * 1️⃣ Usuario NO logeado intentando entrar a dashboard
   */
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  /**
   * 2️⃣ Usuario logeado intentando ir a login o signup
   */
  if (isPublicRoute && accessToken && pathname !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // 3️⃣ Todo lo demás continúa normal
  return NextResponse.next()
}
