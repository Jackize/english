# eng-growth design direction

Read this before any UI work. `anti-slop/` holds audits against it.

## Identity

eng-growth is a step-by-step IELTS course (A1 to C2) for Vietnamese learners: grammar and vocabulary lessons, a daily plan, and spaced review. The product promise is "học chậm mà chắc": short sessions, done every day, that stay remembered.

- **Motif:** a plant that grows with course progress (seed, sprout, stem, branches, leaves, fruit). Growth, seasons and patience are the visual metaphor. Reach for it before reaching for decoration.
- **Voice:** calm, encouraging, specific. Talk about the learner's real numbers ("3 từ đến hạn ôn"), never invented ones. Vietnamese UI copy, English only for the learning content itself.
- **Audience:** students and working adults studying 10 to 30 minutes a day, often on a phone.

Design Read: learning dashboard for Vietnamese IELTS learners, calm botanical language, dial **ENERGY 2 / RHYTHM 2 / MOTION 1**.

- ENERGY 2: warm and friendly, but the lesson content is the focus, not the chrome.
- RHYTHM 2: a consistent card system, broken where the content differs (the plant section, the closing guest invitation).
- MOTION 1: hover and press feedback only. No looping or scroll-triggered animation. Respect `prefers-reduced-motion`.

## Palette

Tokens live in `src/app/globals.css` (`@theme`).

| Role | Token | Value | Why |
|------|-------|-------|-----|
| Core: brand | `--color-brand` | `#17663d` | Leaf green, the plant motif. All primary actions and progress fills. |
| Core: ink | `--color-ink` | `#0e1e15` | Green-tinted near-black, so text belongs to the same family as the brand. |
| Core: background | `--color-background` | `#f5f6f1` | Warm sage paper rather than pure white, which is calmer for long reading. |
| Accent | `--color-gold` | `#a8691a` | Streak and "in progress" only: the one warm note against the greens. Use `#8a5a14` for small text on light gold backgrounds (contrast). |
| Status | `--color-danger` | `#b42318` | Errors only. |

Neutrals (`surface`, `surface-muted`, `line`, `muted`) are tints of the same green-grey.

**Level colours** (`LEVEL_META` in `src/lib/curriculum.ts`) are a data encoding, not decoration. Each CEFR level keeps one colour everywhere it appears (roadmap, level cards, badges) so learners can recognise a level at a glance. They move from greens (A1 to B1) through teal and slate (B2, C1) to bronze (C2, "fruit"). Use them only to mark a level, never as general UI colour. Each one is at least 5.3:1 on white.

## Typography

- **Inter** for both body and display. Reason: complete, well-hinted Vietnamese diacritics at small sizes (stacked marks like "ễ", "ặ" stay legible at 11 to 13px), and tabular figures for progress numbers. Display headings get character from weight 700 and tight tracking (`.display`), not from a second typeface.
- `.eyebrow` (small uppercase label) is allowed only when it adds a fact the heading lacks, for example "Kế hoạch · A1 · Ngày 3/100". It never repeats the heading below it.
- Other small labels use sentence case without wide tracking.

## Components

- **Cards:** `.card` (flat, 1px line) is the default. `.card-elevated` (soft shadow) marks the one or two blocks the learner should act on first on a screen (today's plan, review due).
- **Radius:** cards 1.25 to 1.5rem, list rows 0.75rem, buttons and small status chips fully rounded.
- **Arrows:** the `arrow_forward` icon marks only the main "continue" action of a view and rows that open a lesson. Secondary links do without.
- **Icons:** Material Symbols Outlined, subset by `scripts/subset-material-symbols.py`. Re-run that script whenever a new icon name is used, or it renders as text. Decorative icons get `aria-hidden="true"`.

## Content rules

- Every number on screen comes from the database. If there is no data yet, show an empty state that says what to do first.
- Guests see what the course contains (levels, lessons, questions), never their own 0% progress.
- No em dashes in UI copy.
