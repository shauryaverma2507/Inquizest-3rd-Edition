/** Illustrated graphic props — flat 2D ink/print shapes, one per event. */

export function Prop({ kind, className }: { kind: number; className?: string }) {
  const k = ((kind % 6) + 6) % 6;
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <defs>
        <pattern id="halftone-p" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      {k === 0 && (
        <g>
          <circle cx="200" cy="200" r="150" fill="url(#halftone-p)" opacity="0.5" />
          <path d="M60 320 L340 80" stroke="currentColor" strokeWidth="3" />
          <rect x="150" y="150" width="180" height="180" fill="none" stroke="currentColor" strokeWidth="3" />
        </g>
      )}
      {k === 1 && (
        <g>
          <path d="M200 40 L360 330 L40 330 Z" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M200 120 L290 290 L110 290 Z" fill="url(#halftone-p)" opacity="0.6" />
          <circle cx="200" cy="230" r="8" fill="currentColor" />
        </g>
      )}
      {k === 2 && (
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1={40 + i * 40} y1="40" x2={40 + i * 40} y2="360" stroke="currentColor" strokeWidth={i % 2 ? 1 : 3} opacity={0.5 + i * 0.05} />
          ))}
          <circle cx="200" cy="200" r="90" fill="var(--ink)" />
          <circle cx="200" cy="200" r="90" fill="url(#halftone-p)" opacity="0.7" />
        </g>
      )}
      {k === 3 && (
        <g>
          <path d="M40 200 Q200 20 360 200 Q200 380 40 200 Z" fill="url(#halftone-p)" opacity="0.55" />
          <path d="M40 200 Q200 20 360 200 Q200 380 40 200 Z" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="1" />
        </g>
      )}
      {k === 4 && (
        <g>
          <rect x="60" y="60" width="280" height="280" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M60 340 L340 60" stroke="currentColor" strokeWidth="1" />
          <path d="M120 200 h160 M200 120 v160" stroke="currentColor" strokeWidth="3" />
          <circle cx="340" cy="60" r="26" fill="url(#halftone-p)" />
        </g>
      )}
      {k === 5 && (
        <g>
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx="200" cy="200" r={40 + i * 32} fill="none" stroke="currentColor" strokeWidth={i === 2 ? 3 : 1} opacity={0.8 - i * 0.12} />
          ))}
          <path d="M200 200 L360 140" stroke="currentColor" strokeWidth="3" />
          <path d="M330 120 L360 140 L336 160" fill="none" stroke="currentColor" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}
