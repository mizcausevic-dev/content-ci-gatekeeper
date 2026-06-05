# Content CI Gatekeeper

Board-ready Kinetic Gain surface for release-gating CMS and markdown content before broken links, metadata drift, or redirect gaps hit production.

- Live: [http://content.kineticgain.com/](http://content.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/content-ci-gatekeeper](https://github.com/mizcausevic-dev/content-ci-gatekeeper)

## What it shows

- content-policy checks for metadata, schema, and route hygiene
- release-lane posture from draft to production publish
- modeled policy artifacts for markdown, redirects, and metadata requirements
- operator verification for safe publishing

## Routes

- `/`
- `/content-policy`
- `/release-lane`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/content-policy`
- `/api/release-lane`
- `/api/policy-artifacts`
- `/api/verification`
- `/api/sample`

## Local development

```powershell
cd content-ci-gatekeeper
npm install
npm run dev
```

Then open:

- `http://127.0.0.1:5408/`
- `http://127.0.0.1:5408/content-policy`
- `http://127.0.0.1:5408/release-lane`
- `http://127.0.0.1:5408/verification`
- `http://127.0.0.1:5408/docs`

## Validation

```powershell
npm run verify
npm run prerender
npm run render:assets
```

## Documentation

- [docs/architecture.md](./docs/architecture.md)
- [docs/ORIGIN.md](./docs/ORIGIN.md)
