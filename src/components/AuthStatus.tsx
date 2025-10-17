'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';

/**
 * Component to display authentication status and provide logout functionality
 * Only shows in development mode
 */
export default function AuthStatus() {
    const { isAuthenticated, isLoading, logout } = useAuth();

    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    if (isLoading) {
        return (
            <div className="fixed top-4 right-4 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">
                🔍 Checking auth...
            </div>
        );
    }

    return (
        <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm z-50">
            <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">Auth Status:</span>
                <span className={`px-2 py-1 rounded text-xs ${isAuthenticated
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
                </span>
            </div>

            {isAuthenticated && (
                <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="w-full text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                >
                    🚪 Logout
                </Button>
            )}

            <div className="mt-2 text-xs text-gray-500">
                <div>Cookie: {isAuthenticated ? '✅' : '❌'}</div>
                <div>LocalStorage: {localStorage.getItem('token') ? '✅' : '❌'}</div>
            </div>
        </div>
    );
}
