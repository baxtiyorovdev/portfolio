export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Loading
        </span>
      </div>
    </div>
  );
}
