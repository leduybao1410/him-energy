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

                if (!hasToken) {
                    console.log('🔒 No authentication token found');
                } else {
                    console.log('✅ Authentication token found');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = () => {
        try {
            // Clear cookie (if possible from client side)
            document.cookie = 'ACCESS_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            // Clear localStorage
            localStorage.removeItem('token');

            // Update state
            setIsAuthenticated(false);

            // Redirect to home page
            router.push('/');

            console.log('🚪 User logged out successfully');
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
