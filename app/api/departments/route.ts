import { fetchWithAuth } from '../../lib/api-client';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const qs = search ? `?search=${encodeURIComponent(search)}` : '';

  const result = await fetchWithAuth(`/api/departments/${qs}`);
  return result.response;
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await fetchWithAuth('/api/departments/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return result.response;
}
