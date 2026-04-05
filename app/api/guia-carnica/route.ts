import { fetchWithAuth } from '../../lib/api-client'

export async function POST(request: Request) {
  const body = await request.json()

  const result = await fetchWithAuth('/api/guia-carnica/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return result.response
}