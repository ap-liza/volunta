import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getDataFromToken } from "./helpers/getDataFromToken";

export function middleware (request: NextRequest){
    const path = request.nextUrl.pathname

// Define public paths that do not require authentication
    const isPublicPath = path === '/login' || path === '/signup' || path ==='/ ' 

try{
    // Get the token from the cookies
    const token = request.cookies.get('token') ?.value || ''

    // If token is available, verify and get the user data
    if (token) {
        const userId = getDataFromToken(request); 
        // Will throw error if token is expired or invalid
    }

    // Redirect logged-in users trying to access the home page to the dashboard
    if (path === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    // Allow access to the home page if the path is '
    if (path === '/') {
        return NextResponse.next();
    }

    // Redirect logged-in users trying to access public paths to the dashboard page    
    if(isPublicPath  && token){
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
}  catch(error:any){
    // If the token has expired or is invalid, catch the error and redirect to the login page
    if (error.message === 'Token has expired' || error.message === 'Invalid token') {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}


 // If no token and trying to access protected paths, redirect to login

    if(!isPublicPath && !request.cookies.get('token')){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    return NextResponse.next();
}

export const config ={
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/events',
        '/dashboard/:path*' // Protects /dashboard and all its subpaths

    ]
}