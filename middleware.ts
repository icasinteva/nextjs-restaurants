import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fetchFirstRestaurantId } from './app/lib/data';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/restaurants`, request.url));
  }

  const id = await fetchFirstRestaurantId();

  return NextResponse.redirect(new URL(`/restaurants/${id}/menu`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/restaurants'],
};
