export async function handleRequest(
  fn: () => Promise<void>,
  setLoading: (v: boolean) => void,
  setError: (v: string | null) => void
) {
  setLoading(true)
  setError(null)

  try {
    await fn()
  } catch (err: any) {
    const message = err.message || 'Error inesperado'
    setError(message)
    throw new Error(message) // ✅ relanza para que el catch del formulario lo reciba
  } finally {
    setLoading(false)
  }
}