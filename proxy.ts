import { NextRequest, NextResponse } from "next/server";

import { auth } from "./auth";

const protectedPaths = [
  /\/shipping-address/,
  /\/payment-method/,
  /\/place-order/,
  /\/profile/,
  /\/user\/(.*)/,
  /\/order\/(.*)/,
  /\/admin/,
];

export async function proxy(request: NextRequest) {
  const authState = await auth();
  const { pathname } = request.nextUrl;

  if (!authState && protectedPaths.some((p) => p.test(pathname))) {
    return NextResponse.redirect(`${request.nextUrl.origin}/sign-in`);
  }

  if (!request.cookies.get("sessionCartId")) {
    // Generate new session cart id cookie
    const sessionCartId = crypto.randomUUID();

    // Create new response and add the new headers
    const response = NextResponse.next({
      request: {
        headers: new Headers(request.headers),
      },
    });

    // Set newly generated sessionCartId in the response cookies
    response.cookies.set("sessionCartId", sessionCartId);

    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
