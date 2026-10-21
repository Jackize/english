# eng-growth — English Vocabulary App

A full-stack vocabulary learning app for Vietnamese learners. Import vocabulary from public Google Docs, study with flashcards, and track progress with spaced repetition.

## Features

- **Google Doc import** — Paste a public doc URL; words are parsed by category (e.g. `[C12T1] - Cork`)
- **Flashcard study** — English word + IPA on front; Vietnamese meaning prominent on reveal
- **Spaced repetition** — Know / Hard / Again review system
- **Review history** — Stats, search, and mastery tracking
- **Admin panel** — Browse, search, edit, and delete vocabulary

## Tech Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite
- NextAuth.js (credentials)
- cheerio (Google Doc HTML parsing)

## Getting Started

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Account

- Email: `demo@eng-growth.app`
- Password: `demo1234`

## Google Doc Import

1. Share your Google Doc as **"Anyone with the link can view"**
2. Go to **Admin → Import Google Doc**
3. Paste the URL and click **Preview Import**
4. Confirm to save categories and words

Expected table columns: Word | IPA | Word Form | English Meaning | Nghĩa tiếng Việt

## Project Structure

```
src/
  app/           # Pages and API routes
  components/    # UI components
  lib/           # Parser, auth, SRS, Prisma
mockups/         # Original HTML design references
prisma/          # Database schema and migrations
```

## Environment Variables

Copy `.env` and set:

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```
