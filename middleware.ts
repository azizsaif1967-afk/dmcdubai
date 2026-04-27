import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/studio') || pathname.includes('.')) return;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (!hasLocale) {
    const accept = req.headers.get('accept-language') ?? '';
    const target = accept.toLowerCase().startsWith('ar') ? 'ar' : defaultLocale;
    return NextResponse.redirect(new URL(`/${target}${pathname === '/' ? '' : pathname}`, req.url));
  }
}

export const config = { matcher: ['/((?!_next|api|studio|.*\\..*).*)'] };
