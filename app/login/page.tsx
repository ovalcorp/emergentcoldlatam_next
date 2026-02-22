'use client';

import Image from 'next/image';
import { BRAND_COLOR } from '../globals';
import LoginForm from '../ui/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo: marca */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white"
        style={{ backgroundColor: BRAND_COLOR }}
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border-2 border-white bg-white p-1">
              <Image
                src="/logo-emergentcold.png"
                alt="Logo Emergent Cold"
                width={48}
                height={48}
                className="rounded-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Emergent Cold</h1>
              <p className="text-sm text-white/80">Latam</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium text-white/90">
            La mayor red de logística con temperatura controlada en América Latina.
          </p>
          <p className="mt-2 text-sm text-white/70">
            Accede a tu cuenta para gestionar operaciones y reportes.
          </p>
        </div>
      </div>

      {/* Panel derecho: formulario */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo y título en móvil */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="rounded-full border-2 p-1" style={{ borderColor: BRAND_COLOR, backgroundColor: 'white' }}>
              <Image
                src="/logo-emergentcold.png"
                alt="Logo"
                width={44}
                height={44}
                className="rounded-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Emergent Cold</h1>
              <p className="text-xs text-slate-500">Latam</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: BRAND_COLOR }}
              aria-hidden
            />
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Iniciar sesión</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Ingresa tus credenciales para acceder
                </p>
              </div>
              <LoginForm />
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © Emergent Cold Latam. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
