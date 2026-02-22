import { NextResponse } from 'next/server';

const isProd = process.env.NODE_ENV === 'production';

const baseCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'strict' as const,
  path: '/',
};

export function setAuthCookies(
  response: NextResponse,
  access: string,
  refresh: string
) {
  response.cookies.set('access', access, {
    ...baseCookieOptions,
    // maxAge: 60 * 15,
  });

  response.cookies.set('refresh', refresh, {
    ...baseCookieOptions,
    // maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set('access', '', {
    ...baseCookieOptions,
    expires: new Date(0),
  });

  response.cookies.set('refresh', '', {
    ...baseCookieOptions,
    expires: new Date(0),
  });
}
