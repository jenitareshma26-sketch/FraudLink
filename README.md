# FraudLink

FraudLink is a prototype AI-assisted scam network detection dashboard built with Vite, React, and TypeScript. It includes mock data, visualizations (D3), charts (Recharts), and a simple Redux Toolkit store for auth, transactions, alerts and cases.

## Features
- Login (mock) with demo OTP
- Dashboard with charts and summary stats
- Scam network force-directed visualization (D3)
- Transaction monitoring table with filters, CSV export, pagination, and quick actions (Flag / Escalate / Open Case)
- Fraud alerts center with review & escalation actions
- User profile investigation and case management placeholders

## Tech stack
- Vite + React + TypeScript
- Tailwind CSS for styling
- Redux Toolkit for state management
- D3.js for network visualization
- Recharts for charts

## Quick start

Install dependencies:

```bash
npm install
```

Run development server (local):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests (if any):

```bash
npm test
```

## App routes
- `/` — Login
- `/dashboard` — Dashboard
- `/network` — Scam network visualization
- `/transactions` — Transaction monitoring
- `/alerts` — Fraud alerts
- `/profiles` — User profile investigation
- `/cases` — Case management
- `/devices` — Devices & IPs
- `/analytics` — Risk analysis (placeholder)
- `/reports` — Reports (placeholder)
- `/settings` — Admin settings (placeholder)
- `/notifications` — Notification center

## Demo credentials
- Email: `john@example.com`
- Password: `password123`
- Demo OTP: `123456`

## Development notes
- Mock data and types live in `src/data/mockData.ts` and `src/types`.
- Redux slices are in `src/features/*Slice.ts` (auth, transactions, alerts, cases).
- To re-enable or change mapping to a backend API, update `src/features/*Slice.ts` reducers and replace mock data usage with async thunks.

## Contribution
1. Fork the repository
2. Create a feature branch
3. Make changes, run `npm run build` to validate TypeScript
4. Open a pull request with a clear description

## License
This prototype is provided without a license. Add a `LICENSE` file if you plan to publish.

---
Generated/updated by the local development assistant during an interactive coding session.

## Deployment

Notes for deploying to Render (or similar hosts) where devDependencies may not be installed by default.

- Recommended: deploy as a **Static Site** on Render.
	- Build Command: `npm run build:ci`
	- Publish Directory: `dist`
	- This `build:ci` script installs devDependencies needed for TypeScript and Vite before building.

- If you must deploy as a Web Service (Node process), use:
	- Build Command: `npm ci --include=dev && npm run build`
	- Start Command: `npx serve -s dist -l $PORT`

Common issues
- TS2688 / cannot find type definition for `vite/client` or `node`: install devDependencies (types) before building. The `build:ci` script handles this for CI hosts.
- Missing devDependencies on the host: ensure your host installs `devDependencies` or use `npm ci --include=dev` in the build step.

Quick Render checklist
1. Link your GitHub repository in Render and choose **Static Site**.
2. Set build command to `npm run build:ci` and publish directory to `dist`.
3. Add any environment variables under the Render Dashboard -> Environment (e.g. `VITE_API_URL`).
4. Trigger a deploy; check logs for `npm ci` and `vite build` progress.

If you want, I can add a `engines` field to `package.json` or create a `.render` build script. Which would you prefer?
