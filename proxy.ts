import { NextResponse, type NextRequest } from "next/server";
import {
  PRIVATE_ACCESS_COOKIE,
  PRIVATE_ACCESS_COOKIE_MAX_AGE,
  PRIVATE_ACCESS_COOKIE_VALUE,
  PRIVATE_ACCESS_HINT_COOKIE,
  PRIVATE_ACCESS_HINT_VALUE,
  PRIVATE_ACCESS_QUERY_PARAM,
  PRIVATE_ACCESS_QUERY_VALUE,
  PUBLIC_ONLY_QUERY_VALUE,
} from "lib/private-access";
import { getPrivateProjectSlugs } from "lib/projects";

const privatePaths = new Set(
  getPrivateProjectSlugs().map((slug) => `/${slug}`)
);

function hasAccess(request: NextRequest) {
  return (
    request.cookies.get(PRIVATE_ACCESS_COOKIE)?.value ===
    PRIVATE_ACCESS_COOKIE_VALUE
  );
}

export function proxy(request: NextRequest) {
  const view = request.nextUrl.searchParams.get(PRIVATE_ACCESS_QUERY_PARAM);

  // `?view=` works on every route. Redirect to the same page without it so the
  // switch never lingers in the URL, browser history, or a shared screenshot.
  if (view !== null) {
    const destination = request.nextUrl.clone();
    destination.searchParams.delete(PRIVATE_ACCESS_QUERY_PARAM);

    const response = NextResponse.redirect(destination);

    if (view === PRIVATE_ACCESS_QUERY_VALUE) {
      const options = {
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: PRIVATE_ACCESS_COOKIE_MAX_AGE,
      };

      response.cookies.set(PRIVATE_ACCESS_COOKIE, PRIVATE_ACCESS_COOKIE_VALUE, {
        ...options,
        httpOnly: true,
      });

      // No maxAge: a session cookie the client reads once and deletes, so it
      // can't keep resurrecting a localStorage flag the visitor cleared.
      response.cookies.set(PRIVATE_ACCESS_HINT_COOKIE, PRIVATE_ACCESS_HINT_VALUE, {
        sameSite: options.sameSite,
        secure: options.secure,
        path: options.path,
        httpOnly: false,
      });
    }

    if (view === PUBLIC_ONLY_QUERY_VALUE) {
      response.cookies.delete(PRIVATE_ACCESS_COOKIE);
      response.cookies.delete(PRIVATE_ACCESS_HINT_COOKIE);
    }

    return response;
  }

  if (!privatePaths.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (hasAccess(request)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images|sounds|favicon).*)"],
};
