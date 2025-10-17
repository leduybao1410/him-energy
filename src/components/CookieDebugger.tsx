'use client';

import { useState, useEffect } from 'react';
import { getCookie, areCookiesEnabled } from '@/lib/cookies';

/**
 * Debug component to check cookie status
 * Only shows in development mode
 */
export default function CookieDebugger() {
    const [cookieStatus, setCookieStatus] = useState<{
        enabled: boolean;
        accessToken: string | null;
        allCookies: string;
    }>({
        enabled: false,
        accessToken: null,
        allCookies: ''
    });

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const checkCookies = () => {
                setCookieStatus({
                    enabled: areCookiesEnabled(),
                    accessToken: getCookie('ACCESS_TOKEN'),
                    allCookies: document.cookie
                });
            };

            // Check immediately
            checkCookies();

            // Check every 2 seconds to see changes
            const interval = setInterval(checkCookies, 2000);

            return () => clearInterval(interval);
        }
    }, []);

    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
            <h3 className="font-bold mb-2">🍪 Cookie Debug</h3>
            <div className="space-y-1">
                <div>
                    <span className="font-semibold">Enabled:</span>{' '}
                    <span className={cookieStatus.enabled ? 'text-green-400' : 'text-red-400'}>
                        {cookieStatus.enabled ? '✅ Yes' : '❌ No'}
                    </span>
                </div>
                <div>
                    <span className="font-semibold">ACCESS_TOKEN:</span>{' '}
                    <span className={cookieStatus.accessToken ? 'text-green-400' : 'text-yellow-400'}>
                        {cookieStatus.accessToken ? '✅ Set' : '⚠️ Not set'}
                    </span>
                </div>
                <div className="mt-2">
                    <span className="font-semibold">All Cookies:</span>
                    <div className="bg-gray-800 p-2 rounded mt-1 text-xs break-all">
                        {cookieStatus.allCookies || 'No cookies'}
                    </div>
                </div>
            </div>
        </div>
    );
}
