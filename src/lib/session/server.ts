import "server-only";
import { cookies } from "next/headers";

import {
  DEMO_SESSION_COOKIE,
  parseDemoSessionCookie,
  type DemoSession,
} from "./demo-session";

/** Reads the demo session in a Server Component — avoids a client hydration flicker. */
export async function getDemoSession(): Promise<DemoSession | null> {
  const store = await cookies();
  return parseDemoSessionCookie(store.get(DEMO_SESSION_COOKIE)?.value);
}
