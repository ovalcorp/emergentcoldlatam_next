'use client'

/**
 * DashboardError
 * Captura errores inesperados dentro del dashboard.
 * Cubre todas las páginas bajo /dashboard automáticamente.
 * No reemplaza el layout — el header y sidebar siguen visibles.
 * 
 * Casos de uso:
 * - Crash inesperado en una página
 * - Error de red grave no controlado
 * - Bug en el render de un componente
 * 
 * IMPORTANTE: Los errores controlados del fetch (como 404, 401, 500 de la API)
 * se manejan con ErrorMessage en cada tabla — este archivo es solo para crashes.
 */
'use client'

import { useEffect } from 'react'
import { Button } from '@headlessui/react'
export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    // Aquí puedes integrar Sentry, Datadog, o cualquier servicio de monitoreo
    console.error('[DashboardError]', error)
  }, [error])

  return (
    <div className="w-full flex flex-col justify-center items-center h-96 gap-6 px-4">

      {/* Ícono de error */}
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
        <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>

      {/* Mensaje */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Algo salió mal
        </h2>
        <p className="text-gray-500 text-sm max-w-md">
          Ocurrió un error inesperado en esta página. Puedes intentar de nuevo o volver al inicio.
        </p>
      </div>

      {/* Código de error para soporte técnico — solo visible si existe */}
      {error.digest && (
        <p className="text-xs text-gray-400">
          Código de error: <span className="font-mono">{error.digest}</span>
        </p>
      )}

      {/* Acciones */}
      <div className="flex gap-3">
        <Button
          onClick={unstable_retry}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm transition-colors"
        >
          Intentar de nuevo
        </Button>
        <Button
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 text-sm transition-colors"
        >
          Ir al inicio
        </Button>
      </div>

    </div>
  )
}