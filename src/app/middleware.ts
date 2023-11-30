import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("Middleware Called");

  // TODO: Check whether user is logged in here
  if (false) return NextResponse.redirect(new URL("/", request.url));
}

// Catching everything inside dashboard
export const config = {
  matcher: "/dashboard:path*",
};
