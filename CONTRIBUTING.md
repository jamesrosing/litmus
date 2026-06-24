# Contributing

This repository grows by adding verticals, not by elaborating the contract. The discipline below is the point; relaxing it is how the project would drift back into asserting faster than it verifies.

## Adding a vertical

A vertical is recorded under `verticals/NN-name.md` and documents, in plain terms:

- the claim, the unit of output that would act;
- the warrant, marked referential or derivational, and for high-stakes claims a derivational warrant where the domain admits one;
- the refusal path, what the gate does by default when it cannot confirm;
- the escalation path, where an ungrounded-but-important claim goes, and who owns the decision;
- the verification results that ground it, the actual checks that returned green, not a description of checks that should pass.

The vertical's code lives in its own system, not here. This record is the LITMUS-lens view of it.

## When a vertical is real

A vertical counts as real only when it runs and its grounding results return green. A planned vertical is a referential warrant for itself, a pointer to work not yet done. Mark in-progress verticals as such, and do not treat them as proof until the results exist.

## When the contract may be extracted

The portable contract, `Claim`, `Warrant`, `Verdict`, and the `Verifier` interface, is extracted only after two verticals are shown to share a shape, by refactoring what they actually have in common. The test is concrete: both verticals must sit behind the same types without either being bent to fit. If they will not, the abstraction was premature; keep them separate and revise the target sketch in `reference/contract.ts`. Authoring the contract before two verticals exist is the one move this project is built to avoid.

## Standards

Prefer derivational warrants to referential ones. Refuse by default and calibrate with an escalation path and named error costs. Treat auditability as evidence for a reviewer, not as user trust. Keep verification cheaper than generation. These are stated in full in `docs/principles.md`.
