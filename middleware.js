import { NextResponse } from "next/server";

export function middleware(req) {
  

  const token = req.cookies.get("token")?.value; // ✅ Correct way to access cookies in middleware
  console.log("Token in Middleware:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mychats"], // Protect this route
};
