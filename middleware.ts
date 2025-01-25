import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { restaurants } from '@/app/mocks/placeholder-data';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/restaurants`, request.url));
  }
  return NextResponse.redirect(
    new URL(`/restaurants/${restaurants[0].id}/menu`, request.url)
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/restaurants'],
};
