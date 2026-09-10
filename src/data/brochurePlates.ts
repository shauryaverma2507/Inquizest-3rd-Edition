export const PLATES: string[] = Array.from(
  { length: 26 },
  (_, i) =>
    `/Inquizest-3rd-Edition/brochure/event-${String(i + 1).padStart(2, "0")}.png`,
);
