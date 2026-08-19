import { LogoMark } from "@/components/brand/logo";

/**
 * Root loading fallback, shown on first navigation into the app before any
 * route has rendered — the closest thing this app has to a splash screen.
 *
 * Nested routes should override this with a skeleton that mirrors their own
 * layout — this is the floor, not the target.
 */
export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LogoMark className="size-10 animate-pulse" />
    </div>
  );
}
