'use client';

import { createContext } from 'react';

export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    identification_number: string;
    position: string;
    area: string;
    department: string;
    country: string;
    site: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    initialized: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);