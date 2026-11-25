export function TourMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="currentColor" />
      <path
        d="M20.791 20.791V11.209H11.209M20.791 11.209 11.209 20.791"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
