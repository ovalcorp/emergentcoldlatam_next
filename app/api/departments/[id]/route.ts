import { fetchWithAuth } from '@/app/lib/api-client';

interface Params {
  params: Promise<{ id: string }>;
}

/* GET → obtener departamento (incluye áreas si el backend devuelve detalle) */
export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  const result = await fetchWithAuth(`/api/departments/${id}/`);
  return result.response;
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  const result = await fetchWithAuth(`/api/departments/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return result.response;
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  const result = await fetchWithAuth(`/api/departments/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return result.response;
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  const result = await fetchWithAuth(`/api/departments/${id}/`, {
    method: 'DELETE',
  });

  return result.response;
}
