# Roadmap

LITMUS is built bottom-up out of real verticals, not designed top-down and then instantiated. The contract is the shape extracted once two verticals demonstrably share it, which is why the portable spine does not yet exist in this repository and its absence is intentional rather than missing.

## The four steps to concrete

1. Finish and recognize the first vertical. The FAL marketing pull request is the first LITMUS instance, not a separate effort. It makes a claim carry a re-checkable warrant (a message is recorded as sent only with a provider SID; a response is counted only when it traces to a send row by phone), refuses by default when the warrant is absent, and routes the high-stakes compliance case through one auditable gate. The step is to land it once its load-bearing verification results return green, and to name it as the first vertical. Its write-up is published to `verticals/` at that point.

2. Name the pattern without extracting it. When the first vertical lands, record in plain terms that it is a grounding gate: here is the claim, here is the warrant, here is the refusal path. Do not create a shared package and do not generalize the types. The note is the marker that lets the shape be seen later; the code stays local to the vertical.

3. Build the second vertical, and make it genuinely different so a shared contract would be real rather than cosmetic. The strongest candidate is a verified-analytics gate, where a number an agent reports is recomputed against the query that produced it before it is shown. That re-executes against a different substrate, a query engine rather than a messaging send, which is what makes any extracted contract meaningful.

4. Extract the contract, then write the case study. Only after the second vertical runs, refactor out what the two actually share, the claim, the warrant, the verdict, and the verifier interface, and confirm both verticals sit behind those types without either being bent to fit. In parallel, write a short case study of the first vertical: the bug it started from, the grounding gate that fixed it, and the production result. The architecture and the explainer are still referential; the case study is the derivational version, evidence that the idea ran in a real high-stakes system.

## The phased build, with verify gates

Each phase pairs an action with a check, so the work can loop without constant clarification.

- Phase 0. Stand up the seed vertical against real data. Verify: one concrete claim type is specified together with the re-executable source of truth it checks against.
- Phase 1. Define Claim and Warrant types local to the vertical, derivational mode first. Verify: the type system rejects a claim constructed without a warrant.
- Phase 2. Implement the verifier as a re-execution, test-first. Verify: a claim whose recomputation disagrees with the source is refused, going from red to green, and one that agrees passes.
- Phase 3. Wire the three-way verdict and one escalation path carrying an error-cost field. Verify: a flagged-important mismatch escalates rather than refusing in silence.
- Phase 4. Build the second vertical against a different substrate. Verify: its re-execution gates its claim the same way the first did.
- Phase 5. Extract the contract by refactoring both verticals behind it. Verify: both verifiers plug in without either being modified to fit; if they will not, keep them separate and revisit.
- Phase 6. When the first batch vertical arrives, add the queue monitor and the cost meter. Verify: per-claim verification cost and backlog are observable, and the alarms fire on seeded cases.

## Immediate next action

Three verticals now run and are recorded in `verticals/`, so the step this section used to name is done and the sequence has moved on. The next action is the extraction refactor, and it is now the only thing standing between this repository and a portable spine.

The test is the one stated in `CONTRIBUTING.md` and it is concrete. Take the verifier interface, the claim, the warrant and the verdict as they appear in WRIT and in CHART, and refactor both behind one set of types. Neither may be bent to fit. If they will not sit behind the same types, keep them separate and revise `reference/contract.ts`, because that outcome is information rather than failure.

Two things the three records surfaced should be settled by the same refactor. The verdict needs to carry the difference between a refuted check and one that could not complete, which WRIT has and the sketch does not. And it needs to carry the difference between soundness and completeness, which CHART has and the sketch does not: a gate that can prove every claim it passed was warranted, but not that it examined every claim, has to be able to say so.
