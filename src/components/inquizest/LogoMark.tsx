/**
 * INQUIZEST wordmark, drawn as crisp vector so it can be masked, recoloured and
 * scaled without ever going soft.
 *
 * TO SWAP IN THE OFFICIAL LOGO FILE:
 * drop the SVG's <path> data into this component (keep the two `tone` modes and
 * the viewBox), or replace the <svg> body with the official artwork's paths.
 * Everything else — the reveal, the masking, the colour flow — keeps working.
 */

type Tone = "paper" | "ink" | "color";

const LETTERS = "INQUIZEST";

export function LogoMark({
  tone = "paper",
  className,
  style,
}: {
  tone?: Tone;
  className?: string;
  style?: React.CSSProperties;
}) {
  const fill =
    tone === "ink" ? "var(--ink)" : tone === "paper" ? "var(--paper)" : "url(#iq-color)";

  return (
    <svg
      viewBox="0 0 1200 300"
      className={className}
      style={style}
      role="img"
      aria-label="INQUIZEST 3.0"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="iq-color" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="var(--accent-red)" />
          <stop offset="22%" stopColor="var(--accent-orange)" />
          <stop offset="44%" stopColor="var(--accent-yellow)" />
          <stop offset="64%" stopColor="var(--accent-lime)" />
          <stop offset="82%" stopColor="var(--accent-cyan)" />
          <stop offset="100%" stopColor="var(--accent-violet)" />
        </linearGradient>
      </defs>

      <text
        x="600"
        y="196"
        textAnchor="middle"
        fill={fill}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 205,
          letterSpacing: "-2px",
        }}
      >
        {LETTERS}
      </text>
      <text
        x="600"
        y="262"
        textAnchor="middle"
        fill={fill}
        opacity={0.9}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 40,
          letterSpacing: "26px",
        }}
      >
        3.0
      </text>
    </svg>
  );
}
