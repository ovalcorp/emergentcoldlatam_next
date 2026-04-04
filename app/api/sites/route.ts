import { fetchWithAuth } from '../../lib/api-client';

export async function GET(request: Request) {
  const url = new URL(request.url);

  // ✅ Captura todos los parámetros
  const search   = url.searchParams.get('search')
  const page     = url.searchParams.get('page')
  const pageSize = url.searchParams.get('page_size')

  // ✅ Construye el query string para Django
  const params = new URLSearchParams()
  if (search)   params.append('search', search)
  if (page)     params.append('page', page)
  if (pageSize) params.append('page_size', pageSize)

  const qs = params.toString() ? `?${params.toString()}` : ''

  const result = await fetchWithAuth(`/api/sites/${qs}`);
  return result.response;
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await fetchWithAuth('/api/sites/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return result.response
}