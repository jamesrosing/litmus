# LITMUS

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21227401.svg)](https://doi.org/10.5281/zenodo.21227401)

A fail-closed grounding layer: a gate that lets a generated claim act only when the claim carries a warrant the gate can re-check against the domain's source of truth, and refuses by default otherwise.

The name is the function. A litmus test is the everyday term for a simple check that tells you something true.

## Publications

LITMUS implements the verification method set out in these papers. The first
makes the argument; the second specifies the system architecture.

Rosing, J. H. (2026). *Litmus: The Admissible Set*. Zenodo.
https://doi.org/10.5281/zenodo.21227402

Rosing, J. H. (2026). *Litmus: The Admissible Set (System Architecture)*.
Zenodo. https://doi.org/10.5281/zenodo.21227855

## Status

Early, and deliberately so. This repository is the source of truth for the project's principles, architecture, and verticals. LITMUS is built bottom-up: the contract is not a starting artifact, it is the shape extracted once two real verticals share it.

- Principles, synthesis, and architecture: written, in `docs/`.
- Three verticals run, and are recorded in `verticals/`: WRIT, citation verification for medical-necessity appeal packets; CHART, span verification for extracted payer policy criteria; MARK, numeric grounding and citation tiering for household tax answers. Each record carries the results that ground it, meaning checks that returned green rather than checks that should.
- A fourth, FAL marketing (SMS delivery-truth and response attribution), is in implementation and is not recorded here until its gate's results are on record.
- The portable contract: not yet extracted, and the precondition is now met rather than pending. Three verticals share the shape, and the refactor that would prove it, both verifiers sitting behind the same types without either being bent to fit, has not been performed. Until it is, `reference/contract.ts` stays a sketch. See `docs/roadmap.md`.

One finding from the three belongs in the status rather than buried in a record. The architecture expects a derivational warrant for high-stakes claims wherever the domain admits a re-execution, and in the two highest-stakes verticals the domain does not admit one. There is no query to re-run that establishes medical necessity or what a policy requires. Both therefore run the referential mode built to be hard to game, with the human escalation path carrying what the warrant cannot, and only MARK carries a genuinely derivational component in its recomputed figures. This is the taxonomy working, not failing: it named which mode each vertical is in, and the answer was not the one the architecture anticipated.

## The problem

Modern AI systems are very good at producing answers that sound right, which is not the same as producing answers that are right. A confident wrong answer reads exactly like a confident correct one, and the person receiving it often signs off on the plausible one because it looks finished. As AI is wired directly into actions, reporting the numbers a decision rests on, proposing the fix that ships, recommending the treatment that gets approved, taking steps on someone's behalf, the cost of an unverified claim lands on a real person or system. The ability to generate has outrun the ability to verify. Closing that gap is the work. The long-form, non-technical version is in `docs/why-litmus.md`.

## The idea in one paragraph

A claim may carry one of two kinds of warrant. A referential warrant points at a source, the way a footnote does, and it is weak because a source can exist and still not support the claim. A derivational warrant re-does the underlying work, re-running the query, the test, or the computation against the original source, and it is strong because it cannot be faked. LITMUS prefers the derivational kind and insists on it when the stakes are high. It refuses by default when it cannot confirm, and it routes the ungrounded-but-important case to a human with the evidence laid out rather than presenting an unconfirmed claim as a confirmed one. Success is not a fixed generation-to-verification ratio, which targets the edge of instability, but per-domain backlog stability.

## Repository layout

```
docs/
  why-litmus.md        Non-technical case: the problem, with four before/after examples.
  synthesis.md         The four briefs, the shared shape, and how grounding emerged as the answer.
  principles.md        The rules the design obeys, including the two warrant modes.
  architecture.md      The vertical-first architecture, with diagrams and the contract sketch.
  roadmap.md           The build order, the protocol-last sequence, and the immediate next steps.
verticals/
  01-writ-citation-verification.md   Appeal packets: only the gate marks a citation verified.
  02-chart-span-verification.md      Policy criteria: untrusted proposer, deterministic verifier.
  03-mark-numeric-grounding.md       Tax answers: every figure traces, or the answer is blocked.
reference/
  contract.ts          The target type shape, not yet extracted. Reference, not a package.
CONTRIBUTING.md        How a vertical is added and when the contract is allowed to exist.
```

## Where to start

If you read in one direction, read `docs/why-litmus.md`, then `docs/synthesis.md`, then `docs/principles.md`, then `docs/architecture.md`, then `docs/roadmap.md`.

## A note on this repository's own standard

LITMUS holds that a claim should carry a re-checkable warrant. A design document is a referential warrant, a pointer to an idea. The derivational warrant is a vertical that runs. This repository is honest about which of its contents are which. The documents are the pointer. The verticals are the proof. The project advances by converting the former into the latter, and the contract earns its existence only when two verticals show they share a shape.
