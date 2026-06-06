# Deploying the backend to Vercel

This is an Express API deployed as a Vercel serverless function
(`api/index.js` + `vercel.json` route everything to the Express app).

## Steps

1. Push this folder to its own GitHub repo.
2. In Vercel → **Add New Project** → import the repo.
   - Framework preset: **Other** (no build command needed).
3. **Environment Variables** → paste the contents of `.env.vercel`
   (Settings → Environment Variables → there's an "Import .env" option).
4. **Deploy.** Your API will be at `https://<backend>.vercel.app`
   (health check: `https://<backend>.vercel.app/api/health`).

## Important

- **MongoDB Atlas:** Network Access → add `0.0.0.0/0` (Vercel uses dynamic IPs),
  otherwise the DB connection will fail.
- **CLIENT_URL:** in production, CORS only allows the exact `CLIENT_URL`.
  Deploy the client first (or redeploy here) and set `CLIENT_URL` to the
  client's `https://...vercel.app` URL (no trailing slash).
- One-time seed (run locally, pointing at the same Atlas DB):
  `npm run seed` (admin), `npm run seed:services|testimonials|experience|blogs|projects|profile`.

## Recommended order
Deploy **backend → set client's `NEXT_PUBLIC_API_URL` → deploy client →
set backend's `CLIENT_URL` → redeploy backend.**
