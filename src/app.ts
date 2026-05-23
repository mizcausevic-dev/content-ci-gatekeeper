import express from "express";

import { artifacts, contentPolicy, payload, releaseLane, summary, verification } from "./services/contentGateService";
import {
  renderContentPolicy,
  renderDocs,
  renderOverview,
  renderReleaseLane,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5408);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/content-policy", (_req, res) => res.type("html").send(renderContentPolicy()));
app.get("/release-lane", (_req, res) => res.type("html").send(renderReleaseLane()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/content-policy", (_req, res) => res.json(contentPolicy()));
app.get("/api/release-lane", (_req, res) => res.json(releaseLane()));
app.get("/api/policy-artifacts", (_req, res) => res.json(artifacts()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Content CI Gatekeeper listening on http://127.0.0.1:${port}`);
  });
}

export default app;
