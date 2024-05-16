import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
'/beranda', 'belanja-modal', '/belanja-modal', '/abt', 
'/admin', '/admin/belanja-modal', '/admin/abt',
'/super-admin', '/super-admin/akun-penguna', '/super-admin/kode-akun', '/super-admin/mata-uang', 
]);