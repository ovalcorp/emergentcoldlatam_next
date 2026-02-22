import { NextResponse } from 'next/server';
import { BASE_API_URL } from '../../../lib/utils';
import { setAuthCookies } from '../../../lib/auth-cookies';


export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 });
        }
        const url = `${BASE_API_URL}/api/auth/login/`;
        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }
        const response = await fetch(url, params);
        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json(
                { error: data.detail || 'Credenciales incorrectas' },
                { status: response.status }
            )
        }

        const { access, refresh } = data;

        const result = NextResponse.json({ success: true })
        
        setAuthCookies(result, access, refresh);

        return result;

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
    }
}