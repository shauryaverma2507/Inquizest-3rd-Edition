/**
 * CENTRAL EVENT DATA
 * ------------------
 * accent  -> one of the logo-derived accent keys (see ACCENTS)
 * prop    -> which illustrated graphic prop composition is used (0-5)
 */

import { PLATES } from "./brochurePlates";

export const ACCENTS = ["red", "cyan", "yellow", "violet", "lime", "orange"] as const;
export type Accent = (typeof ACCENTS)[number];

export type EventEntry = {
  id: string;
  /** Two digit index shown as huge editorial numeral */
  index: string;
  title: string;
  /** short expressive label, e.g. "QUIZ", "STAGE", "SOLO" */
  kind: string;
  blurb: string;
  when: string;
  where: string;
  classes: string;
  participants: string;
  accent: Accent;
  prop: number;
  /** the original brochure page for this event */
  plate: string;
};

type EventSource = Omit<EventEntry, "id" | "index" | "accent" | "prop" | "plate">;

const RAW: EventSource[] = [
  { title: "INDIAN SOLO SINGING", kind: "MUSIC VIDEO EDITION", blurb: "A Hindi solo performance shaped as a two-minute music video, with styling and locations chosen to match its mood.", when: "DAY 0 · SUBMIT 1 OCTOBER", where: "ONLINE", classes: "7–12", participants: "1" },
  { title: "SOLO DRUM CHALLENGE", kind: "WAR OF DRUMS", blurb: "A two-to-three-minute drum composition judged for equipment use, energy, creativity and skill.", when: "DAY 0 · SUBMIT 1 OCTOBER", where: "ONLINE", classes: "8–12", participants: "1" },
  { title: "TARANNUM", kind: "SUFI GROUP SONG", blurb: "Traditional or contemporary Sufi music led by voice, rhythm, harmony and musical expression.", when: "DAY 1 · 10:30–12:00", where: "MAIN STAGE", classes: "7–12", participants: "5–7" },
  { title: "SOLILOQUY", kind: "MONOLOGUE", blurb: "An original mysterious or unconventional monologue built through character, voice and storytelling.", when: "DAY 1 · 10:30–12:00", where: "AUDITORIUM", classes: "9–12", participants: "1" },
  { title: "ROBO SOCCER", kind: "1V1 ROBOT CHAMPIONSHIP", blurb: "Remote-controlled robots face off across two halves for goals, control, build quality and sportsmanship.", when: "DAY 1 · 10:30–12:00", where: "ROBOTICS LAB", classes: "7–12", participants: "4" },
  { title: "HUES", kind: "MONOCHROMATIC PAINTING", blurb: "Create A Face in Fragments using the shades, tints and tones of a single colour on canvas.", when: "DAY 1 · 10:30–13:30", where: "ROOM VII-C", classes: "9–12", participants: "1" },
  { title: "MATH AUCTION", kind: "MATH QUIZ", blurb: "A strategic mathematics contest where accuracy meets decision-making under pressure.", when: "DAY 1 · 10:30–12:00", where: "ROOM IX-B", classes: "9–12", participants: "2" },
  { title: "TAPESTRY", kind: "WALL GRAFFITI", blurb: "A team-built Colourful Abstract mural combining original imagery, symbols and lettering on campus walls.", when: "DAY 1 · 10:30–13:30", where: "SCHOOL CAMPUS", classes: "9–12", participants: "3–5" },
  { title: "DEVIL WEARS PRADA", kind: "RAMP WALK", blurb: "A two-person fashion performance judged through costume, styling, confidence and stage presence.", when: "DAY 1 · 12:00–13:30", where: "MAIN STAGE", classes: "9–12", participants: "2" },
  { title: "CROSSROADS", kind: "DUET SINGING", blurb: "Two voices meet in a coordinated duet shaped by harmony, expression and stage presentation.", when: "DAY 1 · 12:00–13:30", where: "AUDITORIUM", classes: "7–12", participants: "2" },
  { title: "PENUMBRA", kind: "BLACKOUT POETRY", blurb: "Discover a poem hidden inside existing text, then turn it into a chromatic visual composition.", when: "DAY 1 · 12:00–13:30", where: "ROOM VII-A", classes: "9–12", participants: "1" },
  { title: "PARADOX", kind: "DUET DANCE", blurb: "A two-person dance performance driven by synchronisation, expression and choreographic contrast.", when: "DAY 1 · 14:00–15:00", where: "MAIN STAGE", classes: "9–12", participants: "2" },
  { title: "LIVEWIRE", kind: "NEWS BROADCAST", blurb: "A live newsroom performance balancing delivery, accuracy, language and broadcast presence.", when: "DAY 1 · 14:00–15:00", where: "AUDITORIUM", classes: "9–12", participants: "1–3" },
  { title: "EUREKA", kind: "SCIENCE QUIZ", blurb: "A fast, precise science challenge testing knowledge, reasoning and accuracy.", when: "DAY 1 · 14:00–15:00", where: "ROOM VIII-C", classes: "11–12", participants: "2" },
  { title: "MEME BUZZ", kind: "MEME MAKING", blurb: "Capture an original photograph on campus and transform it into a sharp, funny English-language meme.", when: "DAY 1 · SUBMIT 14:00–15:00", where: "JUNIOR COMPUTER LAB", classes: "9–12", participants: "2" },
  { title: "BEATX", kind: "WAR OF DJS", blurb: "A live DJ clash judged through track selection, mixing skill, energy and crowd connection.", when: "DAY 1 · 15:00 ONWARDS", where: "MAIN STAGE", classes: "9–12", participants: "1" },
  { title: "गूंज", kind: "NUKKAD NATAK", blurb: "Street theatre that turns a social message into an immediate, energetic ensemble performance.", when: "DAY 2 · 09:00–10:30", where: "MAIN STAGE", classes: "7–12", participants: "7–10" },
  { title: "VENTURIST", kind: "DIGITAL BRAND PITCH", blurb: "Build and pitch a digital brand idea with a clear identity, strategy and feasible concept.", when: "DAY 2 · 09:00–10:30", where: "AUDITORIUM", classes: "9–12", participants: "2–3" },
  { title: "GENIE ON A BOTTLE", kind: "BOTTLE PAINTING", blurb: "Transform a bottle into an original painted object through concept, craft and composition.", when: "DAY 2 · 09:00–12:00", where: "ROOM VII-C", classes: "7–8", participants: "1" },
  { title: "DANCE UNLEASHED", kind: "GROUP DANCE", blurb: "A high-impact ensemble performance judged through choreography, coordination and stage command.", when: "DAY 2 · 10:30–12:00", where: "MAIN STAGE", classes: "7–12", participants: "5–7" },
  { title: "तर्कशास्त्र", kind: "HINDI TURNCOAT DEBATE", blurb: "Argue both sides in Hindi, switching position with speed, logic and spontaneous control.", when: "DAY 2 · 12:00–13:30", where: "AUDITORIUM", classes: "9–12", participants: "1" },
  { title: "BOT RUMBLE", kind: "1V1 ROBOT RACING", blurb: "Remote-controlled robots race head-to-head for speed, maneuverability and reliable build quality.", when: "DAY 2 · 10:30–12:00", where: "ROBOTICS LAB", classes: "7–12", participants: "4" },
  { title: "WORDSMITH", kind: "LITERARY QUIZ", blurb: "A two-person literary challenge built around knowledge, speed and consistency.", when: "DAY 2 · 10:30–12:00", where: "ROOM IX-A", classes: "7–8", participants: "2" },
  { title: "KNOCKOUT", kind: "FC MOBILE ESPORTS", blurb: "A one-versus-one knockout tournament advancing from the round of 16 to a final showdown.", when: "DAY 2 · 10:30–12:00", where: "JUNIOR COMPUTER LAB", classes: "7–12", participants: "2" },
  { title: "REEL’D IN", kind: "REEL MAKING", blurb: "Cut the strongest moments from both days into a focused 60–90 second festival reel.", when: "DAYS 1–2 · SUBMIT 12:00–13:30", where: "SENIOR COMPUTER LAB", classes: "9–12", participants: "2–3" },
  { title: "AMPED UP", kind: "BATTLE OF BANDS", blurb: "A full-band performance built around musical command, stage presence and genre transformation.", when: "DAY 2 · 14:00–15:00", where: "MAIN STAGE", classes: "7–12", participants: "5–7" },
];

export const EVENTS: EventEntry[] = RAW.map((event, i) => ({
  ...event,
  id: `event-${i + 1}`,
  index: String(i + 1).padStart(2, "0"),
  accent: ACCENTS[i % ACCENTS.length]!,
  prop: i % 6,
  plate: PLATES[i]!,
}));

export const WHEEL_A = EVENTS.slice(0, 16);
export const WHEEL_B = EVENTS.slice(16);
