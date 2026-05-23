# content-ci-gatekeeper

Content validation control plane for CMS and markdown release safety: metadata policy, broken-link pressure, publish approvals, and SEO-conscious content delivery.

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
npm run render:assets
```

## Documentation

- [docs/architecture.md](./docs/architecture.md)
- [docs/ORIGIN.md](./docs/ORIGIN.md)
