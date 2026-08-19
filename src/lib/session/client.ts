"use client";

import {
  DEMO_SESSION_COOKIE,
  DEMO_SESSION_MAX_AGE,
  parseDemoSessionCookie,
  serializeDemoSession,
  type DemoSession,
} from "./demo-session";

function readCookieRaw(name: string): string | undefined {
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));

  return match?.slice(name.length + 1);
}

export function readDemoSessionCookie(): DemoSession | null {
  return parseDemoSessionCookie(readCookieRaw(DEMO_SESSION_COOKIE));
}

export function writeDemoSessionCookie(session: DemoSession): void {
  document.cookie = `${DEMO_SESSION_COOKIE}=${serializeDemoSession(session)}; path=/; max-age=${DEMO_SESSION_MAX_AGE}; samesite=lax`;
}

export function clearDemoSessionCookie(): void {
  document.cookie = `${DEMO_SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
