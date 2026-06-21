/** Fixed, ambient backdrop: warm aurora blobs + masked grid + film grain. */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -left-[12%] -top-[12%] h-[58vh] w-[58vh] rounded-full opacity-30 blur-[110px] animate-aurora dark:opacity-50"
        style={{ background: "radial-gradient(circle, var(--accent-3), transparent 60%)" }}
      />
      <div
        className="absolute -right-[8%] top-[18%] h-[46vh] w-[46vh] rounded-full opacity-25 blur-[120px] animate-aurora [animation-delay:-6s] dark:opacity-40"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 60%)" }}
      />
      <div
        className="absolute bottom-[-14%] left-[28%] h-[52vh] w-[52vh] rounded-full opacity-20 blur-[130px] animate-aurora [animation-delay:-12s] dark:opacity-30"
        style={{ background: "radial-gradient(circle, var(--accent-2), transparent 65%)" }}
      />

      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_55%,var(--background))]" />
    </div>
  );
}
