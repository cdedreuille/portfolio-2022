import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  PRIVATE_ACCESS_COOKIE,
  PRIVATE_ACCESS_COOKIE_VALUE,
} from "lib/private-access";
import { getProjects } from "lib/projects";

// The home page is static and ships public projects only. Unlocked visitors
// fetch the full list from here, where the access cookie is checked again.
export async function GET() {
  const cookieStore = await cookies();

  if (
    cookieStore.get(PRIVATE_ACCESS_COOKIE)?.value !== PRIVATE_ACCESS_COOKIE_VALUE
  ) {
    return new NextResponse(null, { status: 401 });
  }

  return NextResponse.json(getProjects(), {
    headers: { "Cache-Control": "no-store" },
  });
}
