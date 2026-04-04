import { fetchWithAuth } from '../../lib/api-client';

/**
 * Lista de áreas. Reenvía la query al backend (ej. ?department=1, ?search=, ?ordering=).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const qs = url.search || '';

  const result = await fetchWithAuth(`/api/areas/${qs}`);
  return result.response;
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await fetchWithAuth('/api/areas/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return result.response;
}
