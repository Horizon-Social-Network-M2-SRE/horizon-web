export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-10 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8 dark:bg-zinc-950 dark:ring-zinc-800">
        <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight">Horizon</h1>
        {children}
      </div>
    </div>
  );
}
