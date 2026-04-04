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
    area_name: string
    department: string;
    department_name: string
    country: string;
    country_name: string
    site: string;
    site_name: string
    metadata: number[]
    metadata_names: { id: number; name: string }[]
    permissions_sites: number[]
    permissions_sites_names: { id: number; name: string }[]
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