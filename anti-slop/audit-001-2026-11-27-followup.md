# antislop audit 001: follow-up (fixes 1-5)

- Date: 2026-11-27
- Approved: 1, 2, 3, 4, 5. Findings 6-17 are untouched.

| # | Rule | Status | What changed |
|---|------|--------|--------------|
| 1 | R-02 | Fixed | Em dashes replaced: `page.tsx` (comma), `DailyGoalCard.tsx` (period), `PlantGrowth.tsx` (colon). A grep of the home page files finds no em dashes in UI text (SVG code comments are left as they are). |
| 2 | R-39 | Fixed | `aria-hidden="true"` added to every decorative Material Symbols span in `page.tsx` (11/11), `DailyTaskRow.tsx`, `DailyGoalCard.tsx`, `ReviewMomentumCard.tsx`. Screen readers no longer read "arrow_forward" and similar icon names. |
| 3 | R-25 | Fixed | "Đang học" badge text changed from `text-gold` to `#8a5a14`: 4.06:1 becomes 5.37:1 on `#fdf3e2`. |
| 4 | R-27 | Fixed | New `src/app/error.tsx` (Next 16 convention, `unstable_retry` per `node_modules/next/dist/docs/01-app/01-getting-started/10-error-handling.md`). It explains that loading failed, says saved progress is safe, shows the error digest when there is one, and offers "Thử tải lại" (retry) and "Về trang chủ". Both controls are 44px high, the button has `cursor-pointer`, and the danger icon is 6.57:1 on white. |
| 5 | R-38 / C-5 | Fixed | New `liveStreak(streak, lastStudyDate)` in `src/lib/streak.ts`, which returns 0 when the last study day is more than one day ago. `getOverview` and `getHeaderStats` in `learning.ts` (now selecting `lastStudyDate`) and `getHomeMotivation` all use it. So the home cards, the header badge, `/daily` and `/roadmap` now show the same number. |

## Verification

- `tsc --noEmit`: no errors in source (the only errors come from stale `.next/dev/types` entries for writing pages that no longer exist).
- `eslint src/app src/lib src/components/learning`: clean.
- `liveStreak` checked with sample dates: today 10, yesterday 10, 2 days ago 0, a week ago 0, never studied 0.
- Browser click-through: see the next section. Still untested: a VoiceOver pass, and "Về trang chủ" on the error page (it is a plain `<a href="/">`).

## Browser verification (Chrome, localhost:3000, signed in as a fresh demo account)

- Logged-in home: renders with no console errors. Header streak badge shows 0, matching "Giữ nhịp học mỗi ngày" (0 ngày) and "Nhịp học: Bắt đầu một chuỗi mới" (finding 5).
- Empty states: "Lịch ôn của bạn đang trống" with "Học từ vựng" link, 14 empty day squares with today outlined, "0/14 ngày có học".
- Fixed during the check: with no words, the "Ôn tập" card stretched to the rhythm card's height and left a large blank area. It now sizes to its content (`lg:items-start` when the memory total is 0).
- Fixed during the check: the icon font is a subset built by `scripts/subset-material-symbols.py`, so the new icons (`cloud_off`, `park`) rendered as raw text ("☁_OFF"). Re-ran the script: 502 icons kept, none missing, 42KB.
- Error page (finding 4): with a temporary `throw` in `HomePage`, the page shows the message, error digest and both buttons, and the icon renders. After the throw was removed, "Thử tải lại" brought the home page back. The temporary throw is gone (file diffed identical to the backup).
- Mobile (500px, Chrome's minimum window width): no horizontal overflow (`scrollWidth` = viewport width); cards stack in one column.
- Not yet seen: the populated states (words due, Leitner bar, streak at risk, active days), because the demo account has no progress.

## New observations (not fixed, not in the approved list)

- `loading.tsx` / `LoadingShell` shows a "Đăng nhập" button in the header while a signed-in user's page loads (same family as finding 14).
- PlantGrowth on mobile: the "0% / TOÀN KHOÁ HỌC" block keeps `text-right` while sitting under the description, so it looks misaligned.
- Mobile menu button is 36px, below the 44px tap target (R-03).

---

# Fixes 6-17

| # | Rule | Status | What changed |
|---|------|--------|--------------|
| 6 | R-37 | Fixed | New `DESIGN.md`: identity, plant motif, voice, Design Read (ENERGY 2 / RHYTHM 2 / MOTION 1), palette with a reason per token, typography, component and content rules. `AGENTS.md` now points UI work at it. |
| 7 | R-09 | Fixed | Guest pill above the H1 removed. "Lộ trình IELTS từ A1 đến C2." now opens the subheadline. |
| 8 | R-08 | Fixed | Arrows kept only on the main action per view ("Tiếp tục: …", "Bắt đầu học miễn phí") and on lesson rows. Removed from "Xem cả kế hoạch", "Bắt đầu thiết lập", "Xem toàn bộ lộ trình", track cards, "Ôn ngay" and "Xem kế hoạch hôm nay". |
| 9 | R-06 | Fixed | Removed eyebrows that repeated their heading: greeting, "Thiết lập lộ trình", "Nội dung", "Cấp độ", "Ôn tập", "Nhịp học". Kept the fact-bearing ones ("Kế hoạch · A1 · Ngày 1/100", "Bài học tiếp theo"). Small uppercase wide-tracked labels are now sentence case in the next-lesson card, track cards, `DailyGoalCard`, `DailyTaskRow` and `PlantGrowth`. |
| 10 | R-01 | Fixed | Blurred mint orb removed from the closing banner. |
| 11 | R-38 | Fixed | Guest lesson preview footer no longer shows "Chuỗi 5 ngày" / "+20 XP". It now states the real feature: "Câu trả lời sai sẽ được đưa vào lịch ôn tập." |
| 12 | C-3 | Fixed | Closing banner shows to guests only, with a real action ("Tạo tài khoản miễn phí", to `/register`). Logged-in users no longer see it. |
| 13 | C-3 | Fixed | Guests: Plant section hidden, track cards show no "0/N" or progress bar, level cards show "N bài" with no % or bar. |
| 14 | R-27 | Fixed | `loading.tsx` now mirrors the logged-in layout (greeting + CTA, plan/goal grid, review/rhythm grid with 14 day cells), with a `role="status"` screen-reader message. `LoadingShell` no longer shows a "Đăng nhập" button while loading; it shows a neutral placeholder. |
| 15 | R-06 | Fixed | Inter's reason recorded in `DESIGN.md` (Vietnamese diacritics at small sizes, tabular figures). |
| 16 | R-29 | Fixed | Level colours documented as a data encoding in `DESIGN.md` and in a comment on `LEVEL_META`. Colours unchanged (all at least 5.3:1 on white). |
| 17 | R-39 | Fixed | `StudyRhythmCard` day labels moved from `aria-label` on `<li>` to `sr-only` text inside each item. |

## Verification

- `tsc --noEmit` and `eslint src/app src/components src/lib`: clean.
- Chrome, signed in, after one vocabulary lesson: "15 mục đang chờ bạn ôn" with "Ôn ngay"; memory bar with 15 words in box 1; "Chuỗi 1 ngày, hôm nay đã tính" with today filled; header badge 1, daily-goal card 1 ngày (all consistent). No closing banner for the logged-in user. No console errors.
- Guest HTML (fetched without a session): new subheadline, honest preview footer, guest banner with register link, no Plant section, no "bài đã hoàn thành", level cards with "120 bài", no blur orb, no wide-tracked labels, 1 arrow, every icon `aria-hidden`, no em dashes. Not viewed visually, because the browser shares your signed-in session.
- Mobile 500px: no horizontal overflow.
- Not observed: the new loading skeleton on screen (it appears too briefly to capture).

## Remaining items (fixed)

| Item | Rule | What changed | Checked |
|------|------|--------------|---------|
| PlantGrowth score block | R-03 | `text-right` became `sm:text-right`: left-aligned under the description on phones, right-aligned beside it from `sm` up. | 500px: `text-align: start`, "0%" sits flush left under the text. Desktop unchanged. |
| Mobile menu button | R-03 | `h-9 w-9` (36px) became `h-11 w-11` (44px) in `HeaderBar.tsx`. | 500px: measured 44 x 44. |
| `LessonRow.tsx:91` | R-02 | Empty score "—" became "Chưa kiểm tra". | Typecheck + lint clean. |

Mobile measurements were taken in a 500px same-origin iframe, because Chrome would not resize the maximized window. No horizontal overflow (`scrollWidth` 496 = viewport 496). Screen readers now get the day labels in the rhythm card ("T7 14/11: chưa học") through the new `sr-only` text.

Audit 001 has no open items left.
