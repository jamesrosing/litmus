# LITMUS

A fail-closed grounding layer: a gate that lets a generated claim act only when the claim carries a warrant the gate can re-check against the domain's source of truth, and refuses by default otherwise.

The name is the function. A litmus test is the everyday term for a simple check that tells you something true.

## Status

Early, and deliberately so. This repository is the source of truth for the project's principles, architecture, and verticals. LITMUS is built bottom-up: the contract is not a starting artifact, it is the shape extracted once two real verticals share it.

- Principles, synthesis, and architecture: written, in `docs/`.
- Vertical 01, FAL marketing (SMS delivery-truth and response attribution): in implementation, the first real instance. See `verticals/01-fal-marketing.md`.
- The portable contract: not yet extracted, by design. See `docs/roadmap.md` and `reference/contract.ts`.

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
  01-fal-marketing.md  The first real instance, framed through the LITMUS lens.
reference/
  contract.ts          The target type shape, not yet extracted. Reference, not a package.
CONTRIBUTING.md        How a vertical is added and when the contract is allowed to exist.
```

## Where to start

If you read in one direction, read `docs/why-litmus.md`, then `docs/synthesis.md`, then `docs/principles.md`, then `docs/architecture.md`, then `docs/roadmap.md`, then `verticals/01-fal-marketing.md`.

## A note on this repository's own standard

LITMUS holds that a claim should carry a re-checkable warrant. A design document is a referential warrant, a pointer to an idea. The derivational warrant is a vertical that runs. This repository is honest about which of its contents are which. The documents are the pointer. The verticals are the proof. The project advances by converting the former into the latter, and the contract earns its existence only when two verticals show they share a shape.
