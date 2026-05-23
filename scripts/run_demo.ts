import { payload, summary } from "../src/services/contentGateService";

console.log("content-ci-gatekeeper demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().artifacts, null, 2));
