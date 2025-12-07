🎬 Movies & TV Series Season Viewer

Developer: Hemant Pandey

A modern Next.js 16 application that displays movie & TV show season details,
including episodes, crew, and guest stars. Built with TypeScript,
shadcn/ui, Next Image optimization, and clean component architecture.

🚀 Features

📺 Season/Movie Overview

- Poster, title, year, rating, and description
- Responsive design with Tailwind CSS

🎞️ Episode Accordion

- Displays episode still, title, rating, runtime, type
- Expandable section for detailed information
- Crew & Guest Star listings with horizontal scroll

🖼️ Optimized Image Handling

- Uses next/image for automatic optimization
- Lazy loading for fast performance

🧩 Component-Based Architecture

- Reusable CastCard component
- Clean layout leveraging shadcn/ui components:
  - Accordion
  - Badge
  - Card

🛠️ Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- TMDB-like API
- ESM Modules

📦 Project Structure

src/
├── app/
│ └── movie/
│ └── [id]/
│ └── page.tsx
│ └── tv/
│ └── [id]/
│ └── season/
│ └── [seasonno]/
│ └── page.tsx
├── components/
│ ├── cast-card.tsx
│ └── ui/
├── lib/
│ └── data.ts
├── types/
│ └── movie.ts

📥 Installation

git clone
cd pnpm install

▶️ Running the Project

npm run dev

⚙️ Environment Variables

TMDB_API_KEY=your_key_here

📘 How It Works

1.  Reads TV ID & season number from route params
2.  Fetches season details
3.  Renders header with season poster and overview
4.  Displays all episodes inside accordion
5.  Renders crew & guest stars when available
