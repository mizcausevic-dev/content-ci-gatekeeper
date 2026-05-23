export type Health = "healthy" | "watch" | "critical";

export const policyChecks = [
  {
    id: "pol-01",
    name: "Metadata completeness",
    health: "healthy" as Health,
    owner: "content-ops",
    rule: "Require title, description, canonical, and Open Graph image before staging promotion.",
    risk: "Missing metadata weakens both search posture and campaign share quality."
  },
  {
    id: "pol-02",
    name: "Broken-link pressure",
    health: "watch" as Health,
    owner: "seo-platform",
    rule: "Fail the release when internal broken links exceed zero or when external dependency links exceed threshold.",
    risk: "Link rot creates crawl waste and undermines buyer trust on launch pages."
  },
  {
    id: "pol-03",
    name: "Structured-content mapping",
    health: "healthy" as Health,
    owner: "frontend-platform",
    rule: "Ensure markdown and CMS blocks map cleanly to approved frontend components and schema targets.",
    risk: "Mismapped content can render cleanly while silently breaking analytics or schema output."
  },
  {
    id: "pol-04",
    name: "Redirect discipline",
    health: "watch" as Health,
    owner: "web-platform",
    rule: "Require redirect coverage for changed slugs, retired campaign routes, and migrated content clusters.",
    risk: "Unmanaged slug changes create traffic leakage and attribution blind spots."
  },
  {
    id: "pol-05",
    name: "Publish approval posture",
    health: "healthy" as Health,
    owner: "editorial-lead",
    rule: "Block production publish until editorial, SEO, and platform approvals all clear.",
    risk: "Single-owner publishing increases odds of fast but unstable launches."
  }
];

export const releaseStages = [
  {
    stage: "Draft",
    status: "healthy" as Health,
    control: "Authoring validation for metadata, links, and content-type mapping.",
    issueCount: 2,
    exitCriteria: "No missing fields, no unapproved components, and no unresolved route warnings."
  },
  {
    stage: "Review",
    status: "watch" as Health,
    control: "SEO and editor review with broken-link diff, redirect check, and content ownership verification.",
    issueCount: 4,
    exitCriteria: "Broken-link count returns to zero and redirect coverage is explicit."
  },
  {
    stage: "Staging",
    status: "healthy" as Health,
    control: "Route-level visual check, schema output review, and analytics event dry-run.",
    issueCount: 1,
    exitCriteria: "Rendered output matches expected metadata and staging crawl is clean."
  },
  {
    stage: "Production",
    status: "healthy" as Health,
    control: "Final publish gate with operator rollback note and post-launch crawl watch.",
    issueCount: 0,
    exitCriteria: "Publish approved and monitoring handoff documented."
  }
];

export const policyArtifacts = [
  {
    path: "policies/metadata-policy.yml",
    category: "Metadata policy",
    summary: "Required fields and content-type rules for SEO-safe publishing."
  },
  {
    path: "policies/link-policy.yml",
    category: "Link integrity",
    summary: "Broken-link thresholds, redirect expectations, and external-link downgrade policy."
  },
  {
    path: "policies/release-workflow.yml",
    category: "Publish workflow",
    summary: "Approval, rollback, and environment handoff rules before production release."
  }
];

export const fileSamples: Record<string, string> = {
  "policies/metadata-policy.yml": `required_fields:\n  - title\n  - description\n  - canonical\n  - og_image\ncontent_types:\n  landing_page:\n    require_schema: true\n    min_description_length: 120\n`,
  "policies/link-policy.yml": `internal_links:\n  max_broken: 0\nexternal_links:\n  max_broken: 2\nredirect_policy:\n  require_for_slug_change: true\n  require_for_retired_campaign: true\n`,
  "policies/release-workflow.yml": `stages:\n  - draft\n  - review\n  - staging\n  - production\napprovals:\n  production:\n    - editorial\n    - seo\n    - platform\nrollback_note_required: true\n`
};
