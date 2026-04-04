'use client'

/**
 * GlobalError
 * Captura errores en el root layout — la última línea de defensa.
 * Se activa cuando falla algo en el layout raíz de la aplicación.
 * Debe incluir sus propios <html> y <body> ya que reemplaza el root layout.
 * 
 * Casos de uso:
 * - Fallo en providers globales (AuthProvider, ThemeProvider, etc.)
 * - Error en el layout raíz
 */
'use client'
import { useEffect } from 'react'
import { Button } from '@headlessui/react'

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    // Aquí puedes integrar Sentry, Datadog, o cualquier servicio de monitoreo
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <html lang="es">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-6 px-4">

          {/* Ícono de error */}
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>

          {/* Mensaje */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Error crítico de la aplicación
            </h1>
            <p className="text-gray-500 text-sm max-w-md">
              Ocurrió un error inesperado en la aplicación. Por favor intenta de nuevo o contacta al administrador.
            </p>
          </div>

          {/* Código de error para soporte técnico */}
          {error.digest && (
            <p className="text-xs text-gray-400">
              Código de error: <span className="font-mono">{error.digest}</span>
            </p>
          )}

          {/* Acción */}
          <Button
            onClick={unstable_retry}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm transition-colors"
          >
            Intentar de nuevo
          </Button>

        </div>
      </body>
    </html>
  )
}