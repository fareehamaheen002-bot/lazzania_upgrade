# LAZZANIA — Taste Beyond Borders

A React + Vite Indian recipe discovery website with North, South, East and West Indian collections.

## Run locally

```bash
npm install
npm run dev
```

## Features

- Separate regional recipe pages and recipe detail pages
- Search, category filters and saved favourites
- Dark / light theme toggle
- Responsive editorial-style layout with animated hero, navigation accents, cards and ambient background motion
- TheMealDB live recipe discovery with curated recipe fallback
- Dish-specific image lookup through Wikimedia Commons; when a matching image cannot be found, the app displays a labelled placeholder instead of reusing an unrelated dish photo

## Image note

Dish photos are fetched from Wikimedia Commons at runtime, so an internet connection is required. Image results depend on Commons availability and may take a moment to load. The app intentionally avoids substituting an unrelated food image when an exact dish image is unavailable.
