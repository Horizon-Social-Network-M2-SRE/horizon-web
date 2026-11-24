import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-black/90">
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-4">
          <Link href="/feed" className="text-lg font-semibold tracking-tight">
            Horizon
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/feed" className="hover:underline">
              Feed
            </Link>
            {/* Plain link until there is a session to clear. */}
            <Link href="/login" className="text-zinc-600 hover:underline dark:text-zinc-400">
              Sign out
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
