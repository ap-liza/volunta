import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware (request: NextRequest){
    const path = request.nextUrl.pathname

// Define public paths that do not require authentication
    const isPublicPath = path === '/login' || path === '/signup' || path ==='/ '

    
// Get the token from the cookies
    const token = request.cookies.get('token') ?.value || ''

 // Redirect logged-in users trying to access the home page to the dashboard
 if (path === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
}



// Allow access to the home page if the path is '
    if (path === '/') {
        return NextResponse.next();
    }

// Redirect logged-in users trying to access public paths to the home page    
    if(isPublicPath  && token){
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config ={
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/dashboard/:path*' // Protects /dashboard and all its subpaths

    ]
}