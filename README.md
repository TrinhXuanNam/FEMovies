# FEMovies

A modern movie application built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Roboto Font** - Google Fonts

## Getting Started

### Install Dependencies

```bash
yarn install
```

### Development

```bash
yarn dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000)

### Build

```bash
yarn build
```

### Start Production Server

```bash
yarn start
```

### Lint

```bash
yarn lint
```

## Project Structure

```
femovies/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── TrendingSection.tsx
│   ├── FilterBar.tsx
│   └── NewlyUpdatedSection.tsx
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Features

- 🎬 Trending movies section
- 📺 Newly updated content
- 🎨 Modern dark theme UI
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js
- 🎯 TypeScript for type safety
