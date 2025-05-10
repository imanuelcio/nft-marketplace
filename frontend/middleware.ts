import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("token", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    // Bisa simpan payload ke header kalau mau dipakai di route selanjutnya
    const response = NextResponse.next();
    response.headers.set("x-user-id", String(payload.userId));
    return response;
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Tentukan paths mana yang pakai middleware
export const config = {
  matcher: ["/profile/:path*"], // sesuaikan dengan route private-mu
};
