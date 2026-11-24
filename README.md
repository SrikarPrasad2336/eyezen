# EyeZen 🌿

**A calm, installable web app that helps people relax and rest their eyes.**
Guided eye exercises, gentle mini-games, daily habit tracking, an eye-healthy food guide and a simple eye-conditions guide, all in a peaceful, premium-feeling design.

**🔗 Live app: https://eyezen-tau.vercel.app**

> ⚠️ **Educational only.** EyeZen does not diagnose, treat or cure any eye condition and never replaces an eye doctor. Exercises are for comfort and relaxation. They do not fix vision problems or cure disease. See [Safety](#-safety-and-disclaimer).

---

## Table of contents

1. [Features](#-features)
2. [Design](#-design)
3. [Tech stack](#-tech-stack)
4. [Getting started](#-getting-started)
5. [Scripts](#-scripts)
6. [Project structure](#-project-structure)
7. [How it works](#-how-it-works)
8. [Customizing](#-customizing)
9. [PWA and offline](#-pwa-and-offline)
10. [Deploying to Vercel](#-deploying-to-vercel)
11. [Updating the app](#-updating-the-app)
12. [Data and privacy](#-data-and-privacy)
13. [Safety and disclaimer](#-safety-and-disclaimer)
14. [Troubleshooting](#-troubleshooting)
15. [Known limitations](#-known-limitations)
16. [Roadmap](#-roadmap)
17. [Build history](#-build-history)

---

## ✨ Features

### 🧘 Eye exercises
11 guided exercises, each with a name, duration, how-to steps, a safety note, an animated guide, start/pause/skip controls and a calm finish (soft glow, ripple, optional chime and vibration):

20-20-20 Break, Blink Training, Palming (dark, dim screen), Near-Far Focus, Figure-8 Tracing, Up-Down-Left-Right Tracking, Eye Circles, Neck and Shoulder Release, Gentle Eye Massage (with a clear "never press the eyeball" warning), Warm Compress and Box Breathing.

- **4 ready-made routines:** Quick 2-min Reset, Work Break 5-min, Bedtime 10-min, Deep Relax 15-min.
- **Custom routine builder:** pick, reorder and save your own routines (up to 12 exercises).
- **20-20-20 reminder:** every 20 minutes, with snooze, and an optional system notification. It works while the app is open.
- Exercises pause automatically if you switch tabs or apps.

### 🎮 Calm mini-games
8 games, each with **Easy / Medium / Hard**, scores, personal bests, a pause button and a gentle rest-break suggestion after 5 minutes of play:

| Game | What you do |
|---|---|
| Follow the Firefly | Keep your finger or mouse near a drifting glowing firefly |
| Zen Focus Garden | Watch flowers glow, then repeat the sequence |
| Peripheral Stars | Rest your gaze in the middle and tap soft stars at the edge |
| Color Calm Match | A memory game with colors **and** shapes (color-blind friendly) |
| Schulte Table | Find numbers in order |
| Blink Bubble Pop | Pop bubbles, with blink reminders |
| Hidden Object Hunt | Find hidden treasures in a garden scene |
| Maze Glow | Guide a light through a new random maze each round |

Games are for fun and rest. They do **not** count toward streaks, points or badges, and do not train vision.

### 📊 Dashboard
Greeting, today's score, streak, three progress rings, a "next recommended task", quick-start buttons, 7-day and 30-day charts, a badge strip, a rotating daily eye tip and a habit tracker (water, screen time, sleep, outdoor time and automatic 20-20-20 break counting).

### 🏆 Rewards
Points, 10 levels (Seedling to Zen Master), streaks, 12 badges (such as Blink Master and 7-Day Glow), a weekly goal and a weekly summary. Badges are celebrated with a calm card, a soft sparkle sound and a gentle buzz, and **no confetti**.

- Points: 10 per finished exercise, plus 2 per minute, plus 25 per badge.
- Streak: days in a row with at least one finished exercise.

### 🥗 Nutrition Hub
Searchable cards for 8 eye-friendly nutrients and 24 foods (with Indian options such as dal, palak, thotakura, amla, carrots, guava and papaya), foods and habits to limit, 4 sample meal plans (vegetarian, non-vegetarian, vegan, budget), a daily **Eye Plate** checklist, a hydration tracker (shared with the dashboard) and a grocery list.

### 📖 Eye Conditions Guide (educational)
12 topics: digital eye strain, screen headaches, myopia, hyperopia and astigmatism, presbyopia, dry eye, allergic eye irritation, conjunctivitis, cataracts, glaucoma, macular degeneration and diabetic eye care.

Every page has an overview, common signs, everyday care, helpful foods and habits, gentle app exercises (carefully matched) and **"When to see an eye doctor"** with "book an appointment" and "urgent care" lists.

### ⚙️ Settings and comfort
- Themes: **Light**, **Dark** and **Night Calm** (warm, low blue light)
- Text size (4 steps), high contrast, reduce motion
- Sound and vibration switches
- Language selector (English now, built so Hindi and Telugu can be added)
- First-launch consent screen, plus a button to see it again
- Works fully **offline** as a guest, with no account

---

## 🎨 Design

Premium meditation app meets polished fitness app: calm, airy and trustworthy.

- **Colors:** soft teal, deep ocean blue, sage green, warm cream and a small coral accent, all defined as named design tokens with separate values for each theme (`src/styles/tokens.css`).
- **Fonts:** Fraunces (headings) and Nunito (body), bundled locally with Fontsource so they work offline.
- **Look:** soft gradients, sparing frosted-glass cards, soft shadows, 16-24px rounded corners and generous white space.
- **Motion:** slow and purposeful. Breathing circles, floating particles, animated rings and gentle page fades. **Nothing flashes or strobes**, and it all respects "reduce motion".
- **Icons:** Lucide, plus custom SVG eye and nature art.
- **Layout:** mobile-first. A bottom tab bar on phones, a side bar on desktop, safe-area support, large tap targets and no accidental zoom.
- **Every screen** has a loading skeleton, a friendly empty state and a friendly error state.

---

## 🧰 Tech stack

| Purpose | Tool |
|---|---|
| Framework | React + TypeScript |
| Build tool | Vite |
| Routing | React Router |
| State and saved data | Zustand (with `persist`, saved in the browser) |
| Icons | Lucide |
| Fonts | Fontsource (Fraunces, Nunito) |
| PWA / offline | vite-plugin-pwa (Workbox) |
| Hosting | Vercel (free plan) |
| App icons (optional) | Python + Pillow script |

There is **no backend and no database**. Everything runs in the browser and is saved on the device.

---

## 🚀 Getting started

### Requirements
- **Node.js** 20.19+ or 22.12+ (check with `node -v`). Vite's requirements can change, so see [vite.dev/guide](https://vite.dev/guide).
- **Git**
- **VS Code** (recommended)
- **Python 3 with Pillow** (optional, only to regenerate the app icons)

### Install and run (Windows PowerShell)

```powershell
git clone https://github.com/SrikarPrasad2336/eyezen.git
cd eyezen
npm install
npm run dev
```

Open the link it prints (usually `http://localhost:5173`).

If `npm install` complains about peer dependencies with `vite-plugin-pwa`, run:

```powershell
npm install --legacy-peer-deps
```

If PowerShell says scripts are disabled, run this once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Try the offline version locally

The service worker only exists in the production build:

```powershell
npm run build
npm run preview
```

Open `http://localhost:4173`, press `F12`, go to **Application → Service workers**, then tick **Network → Offline** and reload. The app should still open.

---

## 📜 Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Type-checks and builds the app into `dist/` |
| `npm run preview` | Serves the built app locally (use this to test PWA and offline) |
| `npm run lint` | Runs the linter |

Run `npm run build` at the end of every change. It should finish with `✓ built in ...` and no red errors.

---

## 🗂 Project structure

```text
eyezen/
├── public/
│   └── icons/                  App icons (192, 512, maskable, Apple touch, favicon)
├── tools/
│   └── make_icons.py           Draws the app icons (optional, needs Pillow)
├── src/
│   ├── main.tsx                App entry point (loads fonts, styles, registers PWA)
│   ├── App.tsx                 Routes and the consent gate
│   ├── pwa.d.ts                Types for the PWA helper
│   ├── styles/
│   │   ├── tokens.css          All colors, fonts and spacing, for 3 themes
│   │   ├── global.css          Base styles, text size, reduce-motion rules
│   │   └── animations.css      Breathing, glow, ripple, shimmer
│   ├── components/
│   │   ├── layout/             TabBar, SideBar, AppLayout, page transitions
│   │   ├── ui/                 Button, Card, ProgressRing, Skeleton, states
│   │   ├── illustrations/      EyeLogo, NatureWaves, Particles
│   │   ├── ReminderBanner.tsx  20-20-20 reminder
│   │   ├── CelebrationToast.tsx Badge celebration
│   │   └── PwaBanner.tsx       Offline / update notices
│   ├── features/
│   │   ├── onboarding/         Consent screen
│   │   ├── dashboard/          Home, charts, habit tracker
│   │   ├── exercises/          Player, routines, builder, reminder card
│   │   ├── games/              Game shell + the 8 games
│   │   ├── nutrition/          Nutrition Hub tabs
│   │   ├── conditions/         Eye Conditions Guide
│   │   ├── rewards/            Rewards page, badge strip
│   │   └── settings/           Settings, More page, Install card
│   ├── data/                   Typed content: exercises, routines, foods,
│   │                           conditions, badges, habits, tips, game info
│   ├── store/                  Zustand stores (saved on the device)
│   ├── hooks/                  useTimer, useSound, useHaptics, useReducedMotion...
│   ├── i18n/                   en.ts (all words) and the translation helper
│   └── utils/                  Date, time, stats, random helpers
├── index.html
├── vite.config.ts              Vite + PWA settings and manifest
├── vercel.json                 Single-page rewrites and cache headers
├── tsconfig*.json
└── package.json
```

---

## 🔧 How it works

### Routing
React Router drives these pages. Each one is lazy-loaded, so it only loads when opened.

| Address | Page |
|---|---|
| `/` | Home dashboard |
| `/exercises` | Exercises, routines and the reminder card |
| `/exercises/:id` | Run one exercise |
| `/exercises/routine/:routineId` | Run a routine |
| `/exercises/builder` | Custom routine builder |
| `/games`, `/games/:gameId` | Game list, play a game |
| `/nutrition` | Nutrition Hub |
| `/more` | More menu |
| `/more/settings` | Settings |
| `/more/conditions`, `/more/conditions/:id` | Conditions guide |
| `/more/rewards` | Rewards |

### Exercise engine
Each exercise is data: an `intro`, a repeating `cycle`, a number of `rounds` and an `outro`, built into a flat list of timed steps. A timer measures real time, and the player finds the current step and how far through it you are. The guide picture (breathing circle, blinking eye, near/far dot, tracing dot, tracking dot) draws from that. Routines are lists of exercises with their own round counts.

### Games
`GameShell` provides the ready screen, level picker, pause, results, personal bests and the 5-minute rest break. Each game is a small component that receives `level`, `paused`, `reduced`, `seed` and `onFinish(score)`. A new game is one file plus one line in `registry.ts`.

### Saved data
Stored in your browser's `localStorage` through Zustand's `persist`:

| Key | What it holds |
|---|---|
| `eyezen-settings` | Theme, text size, switches, language, consent |
| `eyezen-progress` | Finished exercise sessions (last 1000) |
| `eyezen-routines` | Your custom routines |
| `eyezen-reminder` | Reminder on/off and next time |
| `eyezen-habits` | Daily habits (last 120 days) |
| `eyezen-rewards` | Earned badges and weekly goal |
| `eyezen-games` | Personal bests |
| `eyezen-nutrition` | Eye Plate ticks and grocery list |

### Themes and settings
`useApplySettings` copies settings onto `<html>` as attributes (`data-theme`, `data-text-size`, `data-contrast`, `data-motion`). The CSS tokens react to them, so one change updates the whole app.

---

## 🛠 Customizing

### Add or change an exercise
Edit `src/data/exercises.ts` and add an entry to `DEFS` (use the `s('text', seconds, 'cue')` helper). Add an icon in `src/features/exercises/exerciseIcons.ts`.

### Add a game
1. Create `src/features/games/MyGame.tsx` that accepts `GameProps`.
2. Add its info to `src/data/games.ts`.
3. Add an icon in `gameIcons.ts`.
4. Add one line in `registry.ts`.

### Change colors
Edit the named tokens in `src/styles/tokens.css`. Each theme has its own block.

### Add a language (Hindi, Telugu...)
1. Copy `src/i18n/en.ts` to `hi.ts` and translate the values (keep the keys).
2. Add the code to the `Language` type in `src/store/settingsStore.ts`.
3. Register it in `MESSAGES` and `LANGUAGES` in `src/i18n/index.ts`.

Exercise, food, game and condition text still lives in `src/data/` in English, so those files need translating too.

### Change app icons
Edit `tools/make_icons.py`, then run:

```powershell
pip install pillow
python tools\make_icons.py
```

Phones remember old icons, so uninstall and reinstall the app to see the new one.

---

## 📲 PWA and offline

EyeZen is a Progressive Web App:

- A **manifest** (in `vite.config.ts`) gives it a name, colors, icons and two shortcuts.
- A **service worker** (generated by `vite-plugin-pwa`) saves the whole app, fonts and icons, so it works with no internet.
- **Updates wait for your tap.** A new version shows an "Update now / Later" card, so an update never interrupts an exercise.
- **Install:** Chrome and Edge show an **Install app** button in Settings. On iPhone, use Safari's **Share → Add to Home Screen**.

> **iPhone note:** the home-screen app keeps its own storage, separate from Safari. Progress made in Safari does not appear in the installed app.

---

## 🌐 Deploying to Vercel

1. Push the project to GitHub.
2. Sign in at [vercel.com](https://vercel.com) with GitHub.
3. **Add New → Project → Import** this repository.
4. Keep the defaults: **Framework Preset: Vite**, **Build Command: `npm run build`**, **Output Directory: `dist`**.
5. Click **Deploy**.

`vercel.json` makes refreshing any page (like `/exercises`) work, and makes sure devices always check for new versions of the service worker and manifest.

**If the build fails:**
- Check **Build Logs** for the last red lines.
- A file-name capital-letter mismatch (`./Button` vs `./button`) is a common cause. Windows ignores capitals, but Vercel does not.
- If you see a Node error, set a recent Node version in **Project Settings → Build and Deployment**.

---

## 🔄 Updating the app

```powershell
npm run build
git add .
git commit -m "Describe your change"
git push
```

Vercel redeploys automatically within a minute or two. Devices that already have EyeZen show an **update** card.

Commit only what you changed by naming folders or files:

```powershell
git add src/features/nutrition
git commit -m "Update nutrition cards"
git push
```

---

## 🔒 Data and privacy

- No accounts, no servers, no analytics and no tracking.
- All progress, habits and settings stay on **your device**.
- Clearing your browser's site data **erases** your progress.
- The optional reminder notification only uses the browser's own notification permission.

---

## ⚕️ Safety and disclaimer

- EyeZen is **educational and for relaxation only**.
- It **never diagnoses, treats or cures** any eye condition, and it never replaces an eye doctor.
- Exercises do not fix vision problems or cure disease.
- A first-launch consent screen, a footer on every page and notes on exercises, games, nutrition and condition pages repeat this.
- Eye massage, palming and warm compress are **not** suggested for infections, allergies or glaucoma, and carry their own warnings.
- Every condition page has a **"When to see an eye doctor"** section, with an urgent list: sudden vision changes, eye pain, flashes or a curtain over your vision, eye injury and a red painful eye.
- Nutrition content is general information, not dietary advice. People with diabetes, allergies or a medical condition, and anyone pregnant, are told to ask a doctor or dietitian.

Because this is health-related content, it is wise to have an eye-care professional review the wording before sharing it widely.

---

## 🩺 Troubleshooting

| Problem | Fix |
|---|---|
| `npm run build` shows red errors after a paste | A file may have been cut off. Check the last line of the file you pasted, and look for blank files with `Get-ChildItem src -Recurse -File \| Where-Object { $_.Length -eq 0 }` |
| Build complains about a Lucide icon name | Check [lucide.dev](https://lucide.dev) for its current name |
| The breathing circle does not move | Check **Reduce motion** in EyeZen Settings, and Windows **Animation effects** and Battery Saver |
| Service worker not found in dev | Expected. Use `npm run build` then `npm run preview` |
| Old icon or old version still showing | Hard refresh (`Ctrl + Shift + R`), or **Application → Storage → Clear site data**, or reinstall the app |
| Refreshing a page gives 404 online | Make sure `vercel.json` is in the project root and pushed |
| No sound | Turn **Sound** on in Settings and tap **Begin** once, because browsers only allow sound after a tap |
| Reminder did not appear | It works while the app is open. Check that it is switched on |

---

## ⚠️ Known limitations

- Reminders cannot run when the app is fully closed (a browser limitation for web apps).
- Games do not count toward points, streaks or badges.
- The points history keeps the last 1000 sessions, so very long-term totals are approximate.
- Content is in English only for now.
- Daily targets (8 glasses, 7 h sleep, 30 min outdoors) are general ideas and are not editable yet.

---

## 🗺 Roadmap

- Hindi and Telugu translations
- Editable habit targets
- Export and import of progress
- A settings screen for the reminder interval
- Professional medical review of all educational text

---

## 🧱 Build history

EyeZen was built phase by phase:

| Phase | What was built |
|---|---|
| 0 | Project setup |
| 1 | Design system and layout |
| 2 | App shell, routing, consent, settings |
| 3 | Exercise engine and first exercises |
| 4 | All exercises, routines, builder, 20-20-20 reminder |
| 5 | Dashboard, charts, habit tracker, daily tip |
| 6 | Rewards, levels, badges, weekly goal, celebrations |
| 7 | Game framework and 8 mini-games |
| 8 | Nutrition Hub |
| 9 | Eye Conditions Guide |
| 10 | PWA, offline support, install card, app icons |
| 11 | Deployment on Vercel |

---

**Made with care for tired eyes.** Take a slow breath. 🌿