import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // -----------------------------------------------------------------
    // STAGING GATE (Password Protection)
    // -----------------------------------------------------------------
    const { pathname, searchParams } = request.nextUrl;

    // 1. Check if user already has the "internal_access" cookie
    const hasAccessCookie = request.cookies.get('internal_access')?.value === 'true';

    // 2. Check if user is trying to enter with the password
    const passwordParam = searchParams.get('pass');
    const isCorrectPassword = passwordParam === 'dev0652';

    // 3. Logic:
    //    If NO cookie AND NO correct password -> BLOCK (401)
    if (!hasAccessCookie && !isCorrectPassword) {
        return new NextResponse(
            `
            <html>
            <head><title>Restricted Access</title></head>
            <body style="font-family: monospace; background: #0f172a; color: #e2e8f0; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
                <div style="text-align: center;">
                    <h1 style="color: #ef4444;">401 Unauthorized</h1>
                    <p>Internal Development Portal. Restricted Access.</p>
                </div>
            </body>
            </html>
            `,
            { status: 401, headers: { 'content-type': 'text/html' } }
        );
    }

    //    If NO cookie BUT correct password -> ALLOW & SET COOKIE
    if (!hasAccessCookie && isCorrectPassword) {
        // Redirect to homepage (removing the ?pass=... from URL for cleanliness)
        const response = NextResponse.redirect(new URL('/', request.url));

        // Set the cookie for future access (valid for 1 day)
        response.cookies.set('internal_access', 'true', {
            path: '/',
            maxAge: 60 * 60 * 24
        });

        return response;
    }

    // -----------------------------------------------------------------
    // EXISTING APP AUTHENTICATION
    // -----------------------------------------------------------------
    const authUser = request.cookies.get('auth_user');
    const hasAuth = authUser && authUser.value;

    // Paths that don't require authentication (inside the gate)
    const publicPaths = ['/login', '/assets'];

    // Check if the current path is public
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    if (!hasAuth && !isPublicPath) {
        // Redirect to login if not authenticated and trying to access protected route
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (hasAuth && pathname === '/login') {
        // Redirect to home if already authenticated and trying to access login
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
