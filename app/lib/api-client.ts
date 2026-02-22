import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { BASE_API_URL } from './utils';
import { setAuthCookies, clearAuthCookies } from './auth-cookies';

export type ApiClientResult<T> =
  | { ok: true; data: T; response: NextResponse }
  | { ok: false; status: number; response: NextResponse };

// 🔐 Cache para evitar múltiples refresh simultáneos
let refreshPromise: Promise<{
  access: string;
  refresh: string;
}> | null = null;

function buildUrl(path: string) {
  const baseUrl = BASE_API_URL?.replace(/\/$/, '') || '';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function parseResponse<T>(res: Response): Promise<T | null> {
  if (res.status === 204) return null;

  const contentType = res.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return res.json();
  }

  const text = await res.text();
  return text as unknown as T;
}

async function refreshTokens(
  baseUrl: string,
  refresh: string
): Promise<{ access: string; refresh: string }> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(`${baseUrl}/api/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || 'Sesión expirada');
      }

      return {
        access: data.access,
        refresh: data.refresh ?? refresh,
      };
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function fetchWithAuth<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiClientResult<T>> {
  const url = buildUrl(path);
  const baseUrl = BASE_API_URL?.replace(/\/$/, '') || '';

  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;
  const refresh = cookieStore.get('refresh')?.value;

  if (!access && !refresh) {
    const res = errorResponse('No autorizado', 401);
    clearAuthCookies(res);
    return { ok: false, status: 401, response: res };
  }

  const doFetch = (token: string) => {
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(url, { ...options, headers });
  };

  // 1️⃣ Intentar con access
  if (access) {
    const res = await doFetch(access);

    if (res.ok) {
      const data = await parseResponse<T>(res);
      return {
        ok: true,
        data: data as T,
        response: NextResponse.json(data),
      };
    }

    if (res.status !== 401) {
      const errorData = await parseResponse(res);
      return {
        ok: false,
        status: res.status,
        response: errorResponse(
          (errorData as any)?.error || 'Error del servidor',
          res.status
        ),
      };
    }
  }

  // 2️⃣ Access expirado → intentar refresh
  if (!refresh) {
    const res = errorResponse('Sesión expirada', 401);
    clearAuthCookies(res);
    return { ok: false, status: 401, response: res };
  }

  try {
    const { access: newAccess, refresh: newRefresh } =
      await refreshTokens(baseUrl, refresh);

    // 3️⃣ Reintentar request original
    const retryRes = await doFetch(newAccess);

    if (!retryRes.ok) {
      const errorData = await parseResponse(retryRes);
      return {
        ok: false,
        status: retryRes.status,
        response: errorResponse(
          (errorData as any)?.error || 'Error tras refresh',
          retryRes.status
        ),
      };
    }

    const data = await parseResponse<T>(retryRes);
    const response = NextResponse.json(data);

    setAuthCookies(response, newAccess, newRefresh);

    return { ok: true, data: data as T, response };
  } catch (err: any) {
    const res = errorResponse(err.message || 'Sesión expirada', 401);
    clearAuthCookies(res);
    return { ok: false, status: 401, response: res };
  }
}
