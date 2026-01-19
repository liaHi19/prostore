import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "./auth.config";

const authMiddleware = NextAuth(authConfig);

export async function proxy() {
  const session = await authMiddleware.auth();

  if (session) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
