'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    fallback?: React.ReactNode;
}

/**
 * Component that protects routes requiring authentication
 * Shows fallback while checking auth, redirects if not authenticated
 */
export default function ProtectedRoute({
    children,
    redirectTo = '/login',
    fallback = <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated === false) {
            console.log('🔒 Access denied - redirecting to home page');
            router.push(redirectTo);
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    // Show loading state while checking authentication
    if (isLoading) {
        return <>{fallback}</>;
    }

    // Show nothing while redirecting (prevents flash of content)
    if (isAuthenticated === false) {
        return null;
    }

    // User is authenticated, show protected content
    return <>{children}</>;
}
