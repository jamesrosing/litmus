# Principles

These are the rules the design obeys. They are stated as constraints rather than aspirations, because the failure mode LITMUS exists to prevent is a system that asserts faster than it verifies, and a principle that is not enforced is itself an unverified claim.

## The two warrants

A warrant is the justification a claim carries so that a gate can check it before the claim acts.

A referential warrant is a typed pointer to evidence, a citation, a retrieved passage, the record an action was based on. It is cheap and it is gameable, because a pointer can resolve without supporting the claim attached to it.

A derivational warrant re-does the underlying work, re-running the query, the reproduction test, or the computation against the named source. It is expensive and it is robust, because a valid proof cannot be faked and a mechanism that does not hold fails when it is re-run.

## The design principles

1. Prefer derivational warrants over referential ones, and require a derivational warrant for high-stakes claims wherever the domain admits a re-execution. A re-execution is the part of the system that cannot be gamed.

2. If a referential warrant is used, its entailment check must be cheaper and narrower than generation, a quoted span plus a small constrained checker, or the gate is relocating risk rather than removing it. The cleanest way to honor this in a first build is to seed on a domain whose ground truth is a re-execution, so the seed avoids a model judging a model.

3. Refuse by default, but calibrate the verdict into grounded, escalated, or refused, with a per-domain escalation path and named error costs. A high-stakes claim carrying only a referential warrant escalates; it never passes, with one exception. Where the domain admits no re-execution for the substance of the claim at all, there being no query to re-run that establishes medical necessity or what a policy requires, a high-stakes claim may pass on a referential warrant if three things hold together: the entailment check is mechanical and narrower than generation, as principle 2 requires; the judgment the warrant cannot carry is owned by a named person on an escalation path that is exercised, not by the gate; and the vertical's record states plainly that it is in this mode. The exception is for domains that have no derivational substrate, not for verticals that have one and did not build it. Refusal is not free in high-stakes domains, where a wrong refusal has its own cost, so the interesting engineering is the escalation path for the ungrounded-but-important claim, not the gate.

4. Auditability is not trust. An audit ledger is evidence for a reviewer, not reassurance for a user, and LITMUS does not claim the demand-side problem of making a wary person comfortable or a complex system understandable.

5. Synchronous before asynchronous. Build the per-claim path first, since it is simpler. The backlog monitor and the cost meter turn on only when a batch domain arrives.

6. Cost is a guardrail, not telemetry. Verification per claim must stay below generation per claim, or the gate becomes a tax that only the well-resourced can pay, which deepens the very asymmetry it was meant to relieve.

7. Protocol-last. The contract is extracted from two working verticals by refactoring what they share, not authored before either runs. If the two verticals turn out not to share a shape, that is the signal the abstraction was premature, and they stay separate.

## Success criterion

Success is not a fixed generation-to-verification ratio. A ratio of one is the edge of instability, where the unverified queue grows without bound. Success is per-domain backlog stability: verification throughput strictly above generation throughput with margin, and verification that parallelizes at least as well as generation does. In a synchronous, per-claim vertical the queue does not form and this criterion is slack; it binds in the asynchronous, batch verticals.

## Non-goals

LITMUS checks whether a claim is supported by the evidence behind it. It does not make a person trust a technology they are wary of, and it does not make a complicated system easy to understand; those are real and different problems. It does not make the hard human judgments in a field like medicine; those remain with the people trained to make them, and LITMUS's role is to ensure those judgments rest on checked evidence. And it does not, by itself, solve the access and cost problems some domains face; the cost guardrail keeps it from worsening them, but funding or pooling verification for those who cannot afford it is a separate question.
