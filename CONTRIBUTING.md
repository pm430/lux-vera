# Contributing

Thanks for contributing! A few repository-specific rules to keep things consistent.

1. Canonical static data
   - Place JSON and other static data files (examples: `answers.json`, `verses.json`) under the `public/` directory.
   - Do NOT duplicate the same data file inside page folders (e.g., `answers/answers.json` or `bible/verses.json`). Duplicate files lead to confusion during build/deploy. Use `public/` as the single source of truth.

2. Adding a new page
   - Add the HTML under the repo root or `public/` as appropriate.
   - Add an entry to `vite.config.js` -> `build.rollupOptions.input` for the new page so Vite will produce a dedicated HTML output.

3. Local development
   - Use `npm ci` to install dependencies and `npm run dev` to run the dev server.

4. Pull requests
   - Include a brief description of changes and why they are needed.
   - Ensure `npm run build` completes successfully before opening a PR.

5. Deployment `base`
   - For production builds that require a non-root `base` path, use the `BASE` environment variable:

```bash
BASE=/my-base-path/ npm run build
```

Thanks — small, consistent contributions keep the project healthy.
