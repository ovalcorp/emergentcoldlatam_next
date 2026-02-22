import { fetchWithAuth } from '../../../lib/api-client';

export async function GET() {
  const result = await fetchWithAuth('/api/auth/me/');
  return result.response;
}
