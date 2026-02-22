import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { BASE_API_URL } from '../../../lib/utils';
import { setAuthCookies, clearAuthCookies } from '../../../lib/auth-cookies';

type RefreshResponse = {
  access: string;
  refresh?: string;
};

export async function POST(request: Request) {
  try {
    // 1) Leer refresh: primero de cookies, luego del body
    const cookieStore = await cookies();
    let refresh = cookieStore.get('refresh')?.value;

    if (!refresh) {
      const body = await request.json().catch(() => ({}));
      refresh = body?.refresh as string | undefined;
    }

    if (!refresh) {
      const res = NextResponse.json(
        { error: 'Falta el token de refresh' },
        { status: 400 }
      );
      clearAuthCookies(res);
      return res;
    }

    // 2) Enviar refresh al backend
    const baseUrl = BASE_API_URL?.replace(/\/$/, '') || '';
    const upstream = await fetch(`${baseUrl}/api/auth/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (!upstream.ok) {
      let detail = 'Refresh inválido';
      try {
        const err = await upstream.json();
        detail = err?.detail || err?.error || detail;
      } catch {
        /* ignore */
      }
      const res = NextResponse.json({ error: detail }, { status: 401 });
      clearAuthCookies(res);
      return res;
    }

    // 3) Backend devuelve access y refresh
    const data = (await upstream.json()) as RefreshResponse;

    if (!data?.access) {
      return NextResponse.json(
        { error: 'El backend no devolvió un access token' },
        { status: 502 }
      );
    }

    // 4) Setear ambas cookies (access y refresh) en la respuesta
    const newRefresh = data.refresh ?? refresh;
    const res = NextResponse.json({ success: true });
    setAuthCookies(res, data.access, newRefresh);

    return res;
  } catch {
    return NextResponse.json(
      { error: 'Error en refresh' },
      { status: 500 }
    );
  }
}