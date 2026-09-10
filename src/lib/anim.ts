/** Small, dependency-free animation math utilities. */

export const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

/** Remap v from [inMin,inMax] to [outMin,outMax], clamped. */
export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 1,
) => {
  if (inMax === inMin) return outMin;
  return outMin + clamp((v - inMin) / (inMax - inMin)) * (outMax - outMin);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Smooth 0..1 easing (smootherstep). */
export const smooth = (t: number) => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

/** 0 at edges, 1 in the middle of [a,b]. */
export const pulse = (v: number, a: number, b: number) => {
  const t = mapRange(v, a, b);
  return Math.sin(t * Math.PI);
};

export const DEG = Math.PI / 180;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
