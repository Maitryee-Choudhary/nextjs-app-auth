import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //have token not accessible public paths like login & signup

  //do not have token not access to profile

  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path=== '/forgotpassword' || path === '/resetpassword';
  const token = request.cookies.get("token")?.value || '';
  
  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }
  
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/profile/:path*',
    '/verifyemail',
    '/resetpassword',
    '/forgotpassword'
  ]
}