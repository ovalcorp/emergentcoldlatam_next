/**
 * extractErrorMessage
 * Lee el body del error que devuelve Django y extrae un mensaje legible.
 * Cubre todos los formatos que puede devolver Django REST Framework.
 */
export async function extractErrorMessage(res: Response, fallback: string): Promise<string> {
    try {
      const data = await res.json()
  
      // { "detail": "mensaje" } — errores de autenticación/permisos
      if (data.detail) return data.detail
  
      // { "error": "mensaje" } — errores personalizados del servidor
      if (data.error) return data.error
  
      // { "message": "mensaje" } — otro formato común
      if (data.message) return data.message
  
      // { "name": ["error"], "country": ["error"] } — errores de campo
      const fieldErrors = Object.entries(data)
        .map(([field, errors]) => {
          const messages = Array.isArray(errors) ? errors.join(', ') : String(errors)
          return `${field}: ${messages}`
        })
        .join(' | ')
  
      if (fieldErrors) return fieldErrors
  
    } catch {
      // Si no se puede parsear el JSON usa el fallback
    }
    return fallback
  }