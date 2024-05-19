import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyUserPage = ['/beranda', '/belanja-modal', '/abt']
const onlyAdminPage = ['/admin', '/admin/belanja-modal', '/admin/abt', '/admin/rekapitulasi'];
const onlySuperAdminPage = ['/super-admin', '/super-admin/akun-pengguna', '/super-admin/kode-akun', '/super-admin/mata-uang']

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

      if (!token) {
        const url = new URL('/auth/login', req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // Check if user role is not allowed for requested page
      if ((token.role === 'admin' && !onlyAdminPage.includes(pathname)) ||
          (token.role === 'user' && !onlyUserPage.includes(pathname)) ||
          (token.role === 'superadmin' && !onlySuperAdminPage.includes(pathname))) {
        // Redirect to appropriate page based on user role
        if (token.role === 'admin') {
          return NextResponse.redirect(new URL('/admin', req.url));
        } else if (token.role === 'user') {
          return NextResponse.redirect(new URL('/beranda', req.url));
        } else if (token.role === 'superadmin') {
          return NextResponse.redirect(new URL('/super-admin', req.url));
        }
      }
    }
    
    // If user is authenticated and role is allowed, proceed with middleware
    return middleware(req, next);
  };
}
