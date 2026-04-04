import { fetchWithAuth } from '@/app/lib/api-client'

interface Params {
  params: Promise<{ id: string }>
}

/* 🔹 GET → obtener país */
export async function GET(_: Request, { params }: Params) {
  const { id } = await params

  const result = await fetchWithAuth(`/api/countries/${id}/`)
  return result.response
}

/* 🔹 PUT → actualizar completo */
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params
  const body = await req.json()

  const result = await fetchWithAuth(`/api/countries/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return result.response
}

/* 🔹 PATCH → actualizar parcial */
export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params
  const body = await req.json()

  const result = await fetchWithAuth(`/api/countries/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return result.response
}

/* 🔹 DELETE → eliminar */
export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params

  const result = await fetchWithAuth(`/api/countries/${id}/`, {
    method: 'DELETE',
  })

  return result.response
}