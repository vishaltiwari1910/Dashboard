# Dashboard Widgets - Ready to Deploy

This is a minimal React + Vite project implementing the **Dashboard Widgets** assignment:
- Dynamic JSON-driven categories and widgets
- Add / Remove widgets per category
- Search across widgets
- Local state persisted in `localStorage`

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. Build for production:
   ```bash
   npm run build
   ```
   Production output is in `dist/`.

## Deploy

### Netlify
- Create a new site and connect your GitHub repo, or drag & drop the `dist` folder in Netlify dashboard.
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages
- You can use a GitHub Action or the `gh-pages` package to push the `dist` folder to `gh-pages` branch.
- Alternatively, use a simple workflow that runs `npm ci && npm run build` and deploys `dist`.

## Notes for you
- Code is intentionally simple and dependency-free (no Redux) — uses React state + localStorage.
- Feel free to swap state management with Redux Toolkit or Zustand if required by your assignment.
