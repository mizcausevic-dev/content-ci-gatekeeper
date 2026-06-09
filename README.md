# Content CI Gatekeeper

Board-ready Kinetic Gain surface for release-gating CMS and markdown content before broken links, metadata drift, or redirect gaps hit production.

- Live: [http://content.kineticgain.com/](http://content.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/content-ci-gatekeeper](https://github.com/mizcausevic-dev/content-ci-gatekeeper)

## What this product does

Content CI Gatekeeper turns publishing quality into a measurable release-control system. It connects content strategy, SEO, RevOps, and platform engineering so public pages are not shipped with broken internal links, missing metadata, stale redirects, weak schema, or unclear approval ownership.

- **SaaS go-to-market analyst view:** protects demand capture before publish by checking whether a release preserves search intent, paid-campaign routes, social previews, and conversion paths.
- **SaaS value architect view:** translates content defects into operating impact: lower SEO quality, broken buyer journeys, manual QA burden, and weaker reporting trust.
- **Technical reviewer view:** makes release gates inspectable with policy files, JSON endpoints, screenshots, smoke checks, and prerendered routes.
- **Executive narrative:** frames content QA as revenue-system control. The cost is not only typos; it is lost traffic, distorted attribution, confused buyers, and preventable release cleanup.

## What these repos have in common

This repo follows the broader Kinetic Gain pattern: turn invisible operating risk into decision evidence. Each surface names the risk, maps the owner, exposes the control plane, and gives leaders and builders the same artifact to inspect.

## Operating workflow

- **Before publish:** evaluate metadata, links, redirects, schema, and approval ownership.
- **During release:** block high-risk content changes before traffic, crawlers, and campaign links hit them.
- **After release:** preserve a static proof surface, machine-readable policy payloads, and screenshots that explain what was checked.

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
