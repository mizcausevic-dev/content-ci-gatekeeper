import { fileSamples, policyArtifacts, policyChecks, releaseStages } from "../data/sampleContentPolicy";

export function summary() {
  const healthy = policyChecks.filter((item) => item.health === "healthy").length;
  const attention = policyChecks.filter((item) => item.health !== "healthy").length;
  const totalIssues = releaseStages.reduce((total, stage) => total + stage.issueCount, 0);

  return {
    policyCount: policyChecks.length,
    healthy,
    attention,
    totalIssues,
    artifactCount: policyArtifacts.length,
    recommendation:
      "Treat content release as a systems problem, because traffic and SEO losses often come from sloppy publishing discipline rather than broken infrastructure."
  };
}

export function contentPolicy() {
  return policyChecks;
}

export function releaseLane() {
  return releaseStages;
}

export function artifacts() {
  return policyArtifacts.map((artifact) => ({
    ...artifact,
    sample: fileSamples[artifact.path]
  }));
}

export function verification() {
  return [
    "The repo treats metadata, links, redirects, and approvals as one publish surface rather than disconnected checklists.",
    "Broken-link pressure is modeled as a release issue, not just an SEO afterthought.",
    "The release lane makes editorial and platform ownership visible before production publish."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    contentPolicy: contentPolicy(),
    releaseLane: releaseLane(),
    artifacts: artifacts(),
    verification: verification()
  };
}
