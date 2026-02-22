import { fetchWithAuth } from '../../lib/api-client';

export async function GET() {
  const result = await fetchWithAuth('/api/users/');
  return result.response;
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await fetchWithAuth('/api/users/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return result.response
}