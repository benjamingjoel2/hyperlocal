export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="13" cy="13" r="12" fill="#1d1b19" />
        <circle cx="13" cy="13" r="4.5" fill="#f6f1e7" />
        <circle cx="13" cy="13" r="1.75" fill="#c4573a" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">
        Hyperlocal
      </span>
    </span>
  );
}
