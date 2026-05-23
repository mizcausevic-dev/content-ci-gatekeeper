import { describe, expect, it } from "vitest";

import { artifacts, contentPolicy, payload, releaseLane, summary } from "./services/contentGateService";

describe("content-ci-gatekeeper", () => {
  it("summary exposes content policy posture", () => {
    const result = summary();

    expect(result.policyCount).toBeGreaterThan(0);
    expect(result.artifactCount).toBeGreaterThan(0);
    expect(result.recommendation).toContain("content release");
  });

  it("content policy and release lane stay concrete", () => {
    expect(contentPolicy().some((item) => item.name.toLowerCase().includes("metadata"))).toBe(true);
    expect(releaseLane().some((stage) => stage.stage.toLowerCase().includes("review"))).toBe(true);
    expect(artifacts().some((artifact) => artifact.path.includes("policy"))).toBe(true);
  });

  it("payload bundles the full release surface", () => {
    const result = payload();

    expect(result.dashboard.policyCount).toBe(result.contentPolicy.length);
    expect(result.releaseLane.length).toBeGreaterThan(0);
    expect(result.artifacts.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
