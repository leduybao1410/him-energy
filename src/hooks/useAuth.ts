'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/cookies';

/**
 * Custom hook for authentication state management
 */
export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            try {
                // Check for ACCESS_TOKEN cookie
                const accessToken = getCookie('ACCESS_TOKEN');

                // Also check localStorage as fallback
                const localStorageToken = localStorage.getItem('token');

                const hasToken = !!(accessToken || localStorageToken);
                setIsAuthenticated(hasToken);

            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            // Attempt to clear cookie on client side (best effort)
            document.cookie = 'ACCESS_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            // Clear localStorage token fallback
            localStorage.removeItem('token');

            // Call backend logout endpoint to clear httpOnly cookie
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // The backend returns message but not { success: true }, so handle accordingly
            if (response.ok) {
                setIsAuthenticated(false);
                router.push('/');
            } else {
                // Optionally handle error cases here (logout failed)
                console.error('Logout failed:', await response.json());
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const requireAuth = (redirectTo: string = '/') => {
        if (isAuthenticated === false) {
            router.push(redirectTo);
            return false;
        }
        return true;
    };

    return {
        isAuthenticated,
        isLoading,
        logout,
        requireAuth
    };
}
