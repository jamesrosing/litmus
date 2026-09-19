/**
 * LITMUS — target contract shape (REFERENCE, NOT YET EXTRACTED)
 *
 * This file is documentation, not a package. It records the shape the LITMUS
 * contract is expected to take once two real verticals are shown to share it
 * (see docs/roadmap.md, "protocol-last"). It is intentionally not exported,
 * published, or imported anywhere.
 *
 * Do not build against this as if it were the contract. The contract earns its
 * existence at the refactor of two working verticals, not before. If the three
 * recorded verticals (WRIT, CHART and MARK; see verticals/) do not in fact
 * share this shape, the right move is to keep them separate and revise this
 * sketch, not to bend a vertical to fit it.
 */

/** A re-runnable check: a query to execute, a test to run, a value to recompute. */
type ReExecutable = unknown; // domain-specific; defined by each verifier plugin
type Value = unknown; // the thing a claim asserts or a verifier observes
type EvidenceRef = unknown; // a typed pointer to a source (referential mode)

type StakesTier = "low" | "medium" | "high";

type Warrant =
  // Strong: the gate re-does the work and compares. Cannot be faked.
  | { mode: "derivational"; recipe: ReExecutable; expected: Value; result: Value }
  // Weak fallback: a pointer to a source, plus an entailment check that the
  // source supports the claim. Never sufficient on its own for high stakes.
  | { mode: "referential"; pointer: EvidenceRef; entails: boolean };

interface Claim {
  id: string;
  domain: string;
  assertion: string; // the proposition or action proposed
  scope: unknown; // what the assertion is over
  stakes: StakesTier; // high stakes require the derivational mode where the domain admits one; principles.md rule 3 states the exception
  warrant: Warrant; // non-optional: there is no claim without a warrant
}

/**
 * Per-domain, non-portable, value-dense. A query runner in one vertical, a test
 * runner in another. This is the part that does not generalize; only the
 * interface does.
 */
interface Verifier {
  verify(w: Warrant): { holds: boolean; observed: Value };
}

type Verdict =
  | { status: "grounded"; warrant: Warrant }
  | { status: "escalated"; reason: string; errorCost: unknown; owner: string }
  | { status: "refused"; reason: string };

export type { ReExecutable, Value, EvidenceRef, StakesTier, Warrant, Claim, Verifier, Verdict };
