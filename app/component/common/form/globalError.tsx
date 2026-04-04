import { errorColor, borderColor } from '../../../globals'

export function GlobalError({ globalError }: { globalError: string }) {
  return (
    <div 
        className="mb-6 flex items-start gap-3 p-4 rounded-lg border text-sm" 
        style={{ background: '#FEF2F2', borderColor: borderColor, color: errorColor }}>
      {/* Ícono de error */}
      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
      {globalError}
    </div>
  )
}