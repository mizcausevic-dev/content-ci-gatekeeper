import { artifacts, contentPolicy, releaseLane, summary, verification } from "./contentGateService";

function pageShell(title: string, activeRoute: string, body: string) {
  const nav = [
    { href: "/", label: "Overview & Export" },
    { href: "/content-policy", label: "Content Policy" },
    { href: "/release-lane", label: "Release Lane" },
    { href: "/verification", label: "Operator Verification" },
    { href: "/docs", label: "Integration Docs" }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #09101d;
      --surface: #0f172a;
      --surface-2: #121d33;
      --border: rgba(148, 163, 184, 0.18);
      --text: #e7eefb;
      --muted: #9eb1cf;
      --blue: #3b82f6;
      --cyan: #22d3ee;
      --emerald: #10b981;
      --amber: #fbbf24;
      --rose: #fb7185;
      --mono: "IBM Plex Mono", Consolas, monospace;
      --sans: "IBM Plex Sans", "Segoe UI", sans-serif;
      --serif: "IBM Plex Serif", Georgia, serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--sans);
      background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 24%),
        radial-gradient(circle at top right, rgba(16, 185, 129, 0.12), transparent 18%),
        var(--bg);
      color: var(--text);
    }
    .wrap { width: min(1360px, calc(100% - 48px)); margin: 24px auto 48px; }
    .hero {
      display: grid;
      grid-template-columns: 1fr 260px;
      gap: 24px;
      padding: 26px 32px;
      border: 1px solid var(--border);
      border-radius: 28px;
      background: rgba(9, 16, 29, 0.84);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
    }
    .eyebrow, .panel-label, .kicker, .tab, .status-pill, .mini {
      font-family: var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .eyebrow {
      display: inline-flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 18px;
      color: var(--muted);
      font-size: 13px;
    }
    .eyebrow strong {
      color: #7db5ff;
      border: 1px solid rgba(59,130,246,0.35);
      padding: 9px 14px;
      border-radius: 8px;
    }
    h1 {
      margin: 0 0 10px;
      font-family: var(--serif);
      font-size: clamp(48px, 5vw, 70px);
      line-height: 0.98;
    }
    h1 span {
      background: linear-gradient(90deg, #60a5fa, #34d399);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .lede {
      margin: 0;
      max-width: 980px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.6;
    }
    .posture {
      border: 1px solid var(--border);
      border-radius: 20px;
      background: rgba(15, 23, 42, 0.9);
      padding: 28px 24px;
      align-self: start;
    }
    .posture .panel-label { color: #91a3c6; font-size: 12px; margin-bottom: 14px; }
    .posture .status-line { font-size: 15px; font-family: var(--mono); font-weight: 600; }
    .tabs { display: flex; flex-wrap: wrap; gap: 16px; margin: 22px 0 34px; }
    .tab {
      display: inline-flex;
      align-items: center;
      padding: 17px 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: #93a7c7;
      background: rgba(15, 23, 42, 0.8);
      font-size: 14px;
      text-decoration: none;
    }
    .tab.active {
      color: white;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: rgba(59,130,246,0.55);
      box-shadow: 0 18px 36px rgba(37, 99, 235, 0.3);
    }
    .section-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
    .card {
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid var(--border);
      border-radius: 26px;
      padding: 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    .metric { grid-column: span 3; min-height: 170px; }
    .metric .value { font-size: 60px; font-weight: 700; line-height: 1; margin: 22px 0 8px; }
    .metric .panel-label { color: #78b4ff; font-size: 12px; }
    .metric p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.5; }
    .highlight { grid-column: 1 / -1; border-color: rgba(251, 191, 36, 0.2); }
    .highlight .kicker { color: var(--amber); font-size: 13px; }
    .highlight h2 { margin: 12px 0 10px; font-size: 26px; line-height: 1.35; }
    .highlight p { margin: 0; color: var(--muted); font-size: 16px; }
    .split-left { grid-column: span 7; }
    .split-right { grid-column: span 5; }
    .section-title { margin: 10px 0 10px; font-size: 24px; }
    .section-copy { margin: 0 0 22px; color: var(--muted); font-size: 17px; }
    .policy-list, .lane-list, .artifact-list, .verify-list { display: grid; gap: 16px; }
    .policy-item, .lane-item, .artifact {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 22px;
      background: rgba(18, 29, 51, 0.62);
    }
    .node-top { display: flex; justify-content: space-between; gap: 18px; align-items: start; }
    .policy-item h3, .lane-item h3, .artifact h3 { margin: 10px 0 10px; font-size: 25px; }
    .policy-item p, .lane-item p, .artifact p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.6; }
    .status-pill {
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 12px;
      border: 1px solid var(--border);
    }
    .healthy { color: #34d399; border-color: rgba(16,185,129,0.32); background: rgba(16,185,129,0.12); }
    .watch { color: #fbbf24; border-color: rgba(251,191,36,0.26); background: rgba(251,191,36,0.1); }
    .critical { color: #fb7185; border-color: rgba(251,113,133,0.24); background: rgba(251,113,133,0.1); }
    .mini { font-size: 12px; color: #78a8ff; margin-bottom: 12px; }
    .artifact pre {
      margin: 16px 0 0;
      padding: 18px;
      border-radius: 16px;
      overflow: auto;
      background: #0a1327;
      color: #c4d6f5;
      border: 1px solid rgba(148, 163, 184, 0.12);
      font-family: var(--mono);
      font-size: 14px;
      line-height: 1.6;
    }
    .verify-list li {
      list-style: none;
      padding: 16px 18px;
      border-radius: 16px;
      background: rgba(18, 29, 51, 0.62);
      border: 1px solid var(--border);
      color: var(--muted);
    }
    .docs-note { display: grid; grid-template-columns: 1.25fr 0.85fr; gap: 24px; }
    .spec-box {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 24px;
      background: rgba(18, 29, 51, 0.6);
    }
    .spec-box strong { display: block; margin-bottom: 12px; font-size: 16px; }
    .depth-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 18px; }
    .depth-card {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 22px;
      background: linear-gradient(180deg, rgba(18, 29, 51, 0.74), rgba(9, 16, 29, 0.7));
    }
    .depth-card h3 { margin: 10px 0; font-size: 23px; line-height: 1.14; }
    .depth-card p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.58; }
    .site-footer {
      margin-top: 32px;
      padding: 20px 4px 0;
      border-top: 1px solid var(--border);
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      color: var(--muted);
      font-size: 13px;
    }
    .site-footer a { color: #dce8ff; text-decoration: none; }
    @media (max-width: 1100px) {
      .hero, .docs-note { grid-template-columns: 1fr; }
      .metric { grid-column: span 6; }
      .split-left, .split-right { grid-column: 1 / -1; }
      .depth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 720px) {
      .wrap { width: min(100% - 24px, 100%); }
      .hero, .card { padding: 22px; }
      .metric { grid-column: 1 / -1; }
      .tabs { gap: 12px; }
      .tab { width: 100%; justify-content: center; }
      .depth-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div>
        <div class="eyebrow"><strong>Kinetic Gain</strong><span>• Content Release Control Plane</span></div>
        <h1>Content CI <span>Gatekeeper</span></h1>
        <p class="lede">Publishing control surface for CMS and markdown systems: metadata rules, broken-link pressure, redirect discipline, and multi-owner release posture before traffic or SEO value leaks into production.</p>
      </div>
      <aside class="posture">
        <div class="panel-label">Release Posture</div>
        <div class="status-line">● Editorial + SEO + Platform Gate</div>
      </aside>
    </section>

    <nav class="tabs">
      ${nav
        .map((item) => `<a class="tab ${item.href === activeRoute ? "active" : ""}" href="${item.href}">${item.label}</a>`)
        .join("")}
    </nav>

    ${body}
    <footer class="site-footer">
      <a href="http://content.kineticgain.com/">content.kineticgain.com</a>
      <a href="https://kineticgain.com/">Kinetic Gain</a>
      <a href="https://portfolio.kineticgain.com/">Portfolio</a>
      <a href="https://github.com/mizcausevic-dev/content-ci-gatekeeper">GitHub</a>
      <a href="/docs">Docs</a>
    </footer>
  </div>
</body>
</html>`;
}

function statusClass(status: string) {
  if (status === "healthy") return "healthy";
  if (status === "watch") return "watch";
  return "critical";
}

function productDepthSection() {
  return `<article class="card highlight">
    <div class="kicker">Product depth</div>
    <h2>Content CI Gatekeeper turns publishing quality into a measurable release-control system.</h2>
    <p>It connects content strategy, SEO, RevOps, and platform engineering so public pages are not shipped with broken internal links, missing metadata, stale redirects, weak schema, or unclear approval ownership.</p>
    <div class="depth-grid">
      <div class="depth-card">
        <div class="mini">GTM analyst lens</div>
        <h3>Protect demand capture before publish.</h3>
        <p>Marketing can see whether a release preserves search intent, paid-campaign routes, social previews, and conversion paths before public traffic hits the page.</p>
      </div>
      <div class="depth-card">
        <div class="mini">Value architect lens</div>
        <h3>Reduce cleanup cost and lost confidence.</h3>
        <p>The page translates content defects into operating impact: lower SEO quality, broken buyer journeys, manual QA burden, and weaker reporting trust.</p>
      </div>
      <div class="depth-card">
        <div class="mini">Technical reviewer lens</div>
        <h3>Make release gates inspectable.</h3>
        <p>Policy files, JSON endpoints, screenshots, smoke checks, and prerendered routes give engineers concrete proof instead of vague content-governance claims.</p>
      </div>
      <div class="depth-card">
        <div class="mini">What these repos share</div>
        <h3>They turn invisible operating risk into decision evidence.</h3>
        <p>Each Kinetic Gain surface names the risk, maps the owner, exposes the control plane, and gives leaders and builders the same artifact to inspect.</p>
      </div>
    </div>
  </article>`;
}

export function renderOverview() {
  const dashboard = summary();
  const samples = artifacts().slice(0, 2);

  return pageShell(
    "Content CI Gatekeeper",
    "/",
    `<section>
      <div class="section-grid">
        <article class="card metric"><div class="panel-label">Policy Checks</div><div class="value">${dashboard.policyCount}</div><p>Release policies modeled across metadata, links, redirects, and approval posture.</p></article>
        <article class="card metric"><div class="panel-label">Health & Attention</div><div class="value">${dashboard.healthy}<span style="font-size:28px;color:#fbbf24;"> / ${dashboard.attention}</span></div><p>Healthy vs attention-required content gates before production release.</p></article>
        <article class="card metric"><div class="panel-label">Issue Pressure</div><div class="value">${dashboard.totalIssues}</div><p>Total modeled issues currently moving through the publish lane.</p></article>
        <article class="card metric"><div class="panel-label">Policy Files</div><div class="value">${dashboard.artifactCount}</div><p>Specimens covering metadata, links, redirects, and release workflow rules.</p></article>

        <article class="card highlight">
          <div class="kicker">Critical publishing recommendation</div>
          <h2>"${dashboard.recommendation}"</h2>
          <p>Best use case: marketing or documentation systems where content changes can quietly degrade SEO, trust, and campaign performance without breaking infrastructure health checks.</p>
        </article>

        ${productDepthSection()}

        <article class="card split-left">
          <div class="panel-label">Policy Surface</div>
          <h2 class="section-title">Publish rules that protect traffic and trust.</h2>
          <p class="section-copy">This control plane treats release quality as a shared operating system between content, SEO, and platform teams.</p>
          <div class="policy-list">
            ${contentPolicy()
              .map(
                (item) => `<div class="policy-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${item.id}</div>
                      <h3>${item.name}</h3>
                    </div>
                    <span class="status-pill ${statusClass(item.health)}">${item.health}</span>
                  </div>
                  <p><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Rule</strong>${item.rule}</p>
                  <p style="margin-top:16px;"><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Risk</strong>${item.risk}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Artifact Explorer</div>
          <h2 class="section-title">Policy specimens.</h2>
          <p class="section-copy">Representative files that make content release discipline concrete instead of abstract process theater.</p>
          <div class="artifact-list">
            ${samples
              .map(
                (artifact) => `<div class="artifact">
                  <div class="mini">${artifact.category}</div>
                  <h3>${artifact.path}</h3>
                  <p>${artifact.summary}</p>
                  <pre>${escapeHtml(artifact.sample)}</pre>
                </div>`
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderContentPolicy() {
  return pageShell(
    "Content CI Gatekeeper · Content Policy",
    "/content-policy",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Policy Taxonomy</div>
          <h2 class="section-title">The rules that decide whether content is safe to ship.</h2>
          <p class="section-copy">Each policy captures one kind of publishing risk: metadata holes, link rot, schema drift, redirect leakage, or approval gaps.</p>
          <div class="policy-list">
            ${contentPolicy()
              .map(
                (item) => `<div class="policy-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${item.owner}</div>
                      <h3>${item.name}</h3>
                    </div>
                    <span class="status-pill ${statusClass(item.health)}">${item.health}</span>
                  </div>
                  <p><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Primary rule</strong>${item.rule}</p>
                  <p style="margin-top:16px;"><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Failure mode</strong>${item.risk}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>
        ${productDepthSection()}
        <article class="card split-right">
          <div class="panel-label">Reading Guide</div>
          <h2 class="section-title">What operators should watch.</h2>
          <ul class="verify-list">
            <li><strong style="color:#e7eefb;">Metadata completeness</strong><br/>Missing canonicals or OG assets rarely crash builds, but they quietly weaken search and sharing performance.</li>
            <li><strong style="color:#e7eefb;">Broken-link pressure</strong><br/>Treat broken links as release blockers when the content is revenue-facing or campaign-critical.</li>
            <li><strong style="color:#e7eefb;">Redirect discipline</strong><br/>Slug changes without redirect coverage leak both traffic and attribution continuity.</li>
            <li><strong style="color:#e7eefb;">Approval posture</strong><br/>Fast publishing is useful only when ownership and rollback are equally explicit.</li>
          </ul>
        </article>
      </div>
    </section>`
  );
}

export function renderReleaseLane() {
  return pageShell(
    "Content CI Gatekeeper · Release Lane",
    "/release-lane",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Promotion Sequence</div>
          <h2 class="section-title">Draft-to-production release lane.</h2>
          <p class="section-copy">The release path is built to stop broken links, weak metadata, and handoff ambiguity before they become public SEO or funnel problems.</p>
          <div class="lane-list">
            ${releaseLane()
              .map(
                (stage) => `<div class="lane-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${stage.issueCount} open issue(s)</div>
                      <h3>${stage.stage}</h3>
                    </div>
                    <span class="status-pill ${statusClass(stage.status)}">${stage.status}</span>
                  </div>
                  <p><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Control surface</strong>${stage.control}</p>
                  <p style="margin-top:16px;"><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Exit criteria</strong>${stage.exitCriteria}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>
        ${productDepthSection()}
        <article class="card split-right">
          <div class="panel-label">Policy Artifacts</div>
          <h2 class="section-title">Release-aware policy files.</h2>
          <p class="section-copy">These files define what must be true before content can move safely through the release lane.</p>
          <div class="artifact-list">
            ${artifacts()
              .map(
                (artifact) => `<div class="artifact">
                  <div class="mini">${artifact.category}</div>
                  <h3>${artifact.path}</h3>
                  <p>${artifact.summary}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderVerification() {
  return pageShell(
    "Content CI Gatekeeper · Verification",
    "/verification",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Operator Verification</div>
          <h2 class="section-title">What this repo proves.</h2>
          <p class="section-copy">The repo frames publishing discipline as a release system. The goal is to stop quiet traffic damage from metadata drift, broken links, or missing approvals.</p>
          <ul class="verify-list">
            ${verification().map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
        ${productDepthSection()}
        <article class="card split-right">
          <div class="panel-label">Readiness Snapshot</div>
          <h2 class="section-title">Release gate summary.</h2>
          <div class="artifact-list">
            <div class="artifact"><div class="mini">Build</div><h3>TypeScript app</h3><p>Express-backed control plane with content-policy, release-lane, docs, and verification surfaces.</p></div>
            <div class="artifact"><div class="mini">Artifacts</div><h3>Policy specimens</h3><p>Metadata, link, and release workflow files make the governance layer concrete.</p></div>
            <div class="artifact"><div class="mini">Proof</div><h3>Browser-rendered screenshots</h3><p>README assets come from the shipped app, not synthetic static mockups.</p></div>
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderDocs() {
  return pageShell(
    "Content CI Gatekeeper · Docs",
    "/docs",
    `<section>
      <div class="docs-note">
        <article class="card">
          <div class="panel-label">System Artifact / Principal Technical Spec</div>
          <h2 class="section-title">Content release governance for marketing and documentation systems.</h2>
          <p class="section-copy">How to enforce metadata completeness, link safety, redirect coverage, and approval posture before publishing content to public traffic surfaces.</p>
          <div class="artifact-list">
            ${artifacts()
              .map(
                (artifact) => `<div class="artifact">
                  <div class="mini">${artifact.category}</div>
                  <h3>${artifact.path}</h3>
                  <p>${artifact.summary}</p>
                  <pre>${escapeHtml(artifact.sample)}</pre>
                </div>`
              )
              .join("")}
          </div>
          ${productDepthSection()}
        </article>
        <aside class="card">
          <div class="panel-label">Spec Classification</div>
          <div class="spec-box">
            <strong>Target platform</strong>
            <p>Node.js web runtime with content-policy specimen files and release-lane posture modeling.</p>
          </div>
          <div class="spec-box" style="margin-top:18px;">
            <strong>Architecture role</strong>
            <p>Platform and growth engineering operator owning publishing quality, search posture, and release safety together.</p>
          </div>
          <div class="spec-box" style="margin-top:18px;">
            <strong>Signal metric target</strong>
            <p style="color:#34d399;font-family:var(--mono);">Zero broken internal links / release-safe metadata posture</p>
          </div>
          <div class="spec-box" style="margin-top:18px;">
            <strong>Active focus</strong>
            <p>SEO-safe publishing, redirect continuity, metadata discipline, and multi-owner content approvals.</p>
          </div>
        </aside>
      </div>
    </section>`
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
