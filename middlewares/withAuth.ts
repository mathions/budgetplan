import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdminPage = ['/admin', '/admin/belanja-modal', '/admin/abt', '/admin/rekapitulasi'];
const onlyUserPage = ['/beranda', '/belanja-modal', '/abt']

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if(!token) {
        const url = new URL('/login', req.url)
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url)
      }

      if(token.role !== 'umum' && onlyAdminPage.includes(pathname)) {
        return NextResponse.redirect(new URL('/beranda', req.url));
      }

      if(token.role !== 'satker' && onlyUserPage.includes(pathname)) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }

    }
    return middleware(req, next);
  };
}