import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Set a custom header to identify admin pages
  const res = NextResponse.next();
  
  // Check if it's an admin page
  if (req.nextUrl.pathname.startsWith('/admin')) {
    res.headers.set('x-page-type', 'admin');
  } else {
    res.headers.set('x-page-type', 'client');
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 