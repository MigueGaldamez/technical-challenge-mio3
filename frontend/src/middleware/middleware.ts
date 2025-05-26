import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // 👈 this should have value

  if (!token && request.nextUrl.pathname.startsWith('/todos')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Protect /todos route
export const config = {
  matcher: ['/todos'],
};