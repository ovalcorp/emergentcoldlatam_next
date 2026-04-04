import { fetchWithAuth } from '@/app/lib/api-client';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  const result = await fetchWithAuth(`/api/areas/${id}/`);
  return result.response;
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  const result = await fetchWithAuth(`/api/areas/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return result.response;
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  const result = await fetchWithAuth(`/api/areas/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return result.response;
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  const result = await fetchWithAuth(`/api/areas/${id}/`, {
    method: 'DELETE',
  });

  return result.response;
}
