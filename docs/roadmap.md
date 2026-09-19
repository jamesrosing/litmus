# Roadmap

LITMUS is built bottom-up out of real verticals, not designed top-down and then instantiated. The contract is the shape extracted once two verticals demonstrably share it, which is why the portable spine does not yet exist in this repository and its absence is intentional rather than missing.

## The four steps to concrete

1. Land and recognise the first vertical. Done, though not by the vertical this step originally named. WRIT, CHART and MARK have each landed with green results and are recorded in `verticals/` in the form `CONTRIBUTING.md` requires. FAL marketing, which this step used to call the first instance, is in implementation: its gate makes a claim carry a re-checkable warrant (a message is recorded as sent only with a provider SID; a response is counted only when it traces to a send row by phone), refuses by default when the warrant is absent, and routes the high-stakes compliance case through one auditable gate. It is recorded when its load-bearing results return green, not before.

2. Name the pattern without extracting it. Done. Each record states the claim, the warrant and its mode, the refusal path and the escalation path in plain terms, and no shared package exists. The types stay local to each vertical.

3. Build a second vertical on a genuinely different substrate. Done twice over. CHART re-executes against character spans in a hash-pinned document rendering, MARK against human-confirmed fact rows and deterministic calculators, WRIT against policy text and a patient record. The verified-analytics gate this step originally proposed, a number recomputed against the query that produced it, has not been built; MARK's calculator recomputation is the nearest thing to it and is the only derivational component among the three, which bears on the next step.

4. Extract the contract, then write the case study. Open, and now the immediate next action, stated in full below. The refactor must span all three verticals rather than the two referential ones alone, or the contract's derivational arm is exercised by nothing and MARK is bent to fit afterwards, which is the one outcome `CONTRIBUTING.md` forbids. The case study of a first vertical, the bug it started from, the gate that fixed it, the production result, is not yet written for any of the three.

## The phased build, with verify gates

Each phase pairs an action with a check, so the work can loop without constant clarification.

- Phase 0. Stand up the seed vertical against real data. Verify: one concrete claim type is specified together with the re-executable source of truth it checks against.
- Phase 1. Define Claim and Warrant types local to the vertical, derivational mode first. Verify: the type system rejects a claim constructed without a warrant.
- Phase 2. Implement the verifier as a re-execution, test-first. Verify: a claim whose recomputation disagrees with the source is refused, going from red to green, and one that agrees passes.
- Phase 3. Wire the three-way verdict and one escalation path carrying an error-cost field. Verify: a flagged-important mismatch escalates rather than refusing in silence.
- Phase 4. Build the second vertical against a different substrate. Verify: its re-execution gates its claim the same way the first did.
- Phase 5. Extract the contract by refactoring all three verticals behind it. Verify: every verifier plugs in without being modified to fit; if they will not, keep them separate and revisit.
- Phase 6. When the first batch vertical arrives, add the queue monitor and the cost meter. Verify: per-claim verification cost and backlog are observable, and the alarms fire on seeded cases.

## Immediate next action

Three verticals now run and are recorded in `verticals/`, so the step this section used to name is done and the sequence has moved on. The next action is the extraction refactor, and it is now the only thing standing between this repository and a portable spine.

The test is the one stated in `CONTRIBUTING.md` and it is concrete. Take the verifier interface, the claim, the warrant and the verdict as they appear in WRIT, CHART and MARK, and refactor all three behind one set of types. None may be bent to fit. If they will not sit behind the same types, keep them separate and revise `reference/contract.ts`, because that outcome is information rather than failure.

Two things the three records surfaced should be settled by the same refactor. The verdict needs to carry the difference between a refuted check and one that could not complete, which WRIT has and the sketch does not. And it needs to carry the difference between soundness and completeness, which CHART has and the sketch does not: a gate that can prove every claim it passed was warranted, but not that it examined every claim, has to be able to say so.
