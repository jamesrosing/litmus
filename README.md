# LITMUS

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21227401.svg)](https://doi.org/10.5281/zenodo.21227401)

A fail-closed grounding layer: a gate that lets a generated claim act only when the claim carries a warrant the gate can re-check against the domain's source of truth, and refuses by default otherwise.

The name is the function. A litmus test is the everyday term for a simple check that tells you something true.

## The method

Underneath the gate there is one move, and it is the part that transfers.

**Where an action would be dangerous, remove the authority to take it, rather than forbidding its use.**

A rule that says *do not do this* is a rule somebody can decide to set aside, and the circumstance that supplies the reason is usually the one you were worried about. A system in which the dangerous action cannot be expressed has no such circumstance. The distinction sounds like a matter of degree and is not: it is the difference between a policy and a property.

The three recorded verticals are three unrelated substrates and the same move appears in each.

| Vertical | What could go wrong | How it is made unrepresentable |
|---|---|---|
| **WRIT** | A second code path quietly marks a citation verified | A test walks the whole source tree and fails by name on any second stamping site |
| **CHART** | The verifier ends up consulting a model to judge a model | The verifier is forbidden by test from importing the proposer or any model SDK |
| **MARK** | The verification engine reaches back into agent state | The engine is import-clean from agent and memory, held by a separability test |

The same move recurs in two further systems whose records are not yet written, and it is recorded here only as an observation rather than as evidence: in an EHR where cross-tenant reads are inexpressible inside the database engine and an agent token structurally cannot sign or submit a claim, and in a messaging platform where every send decision collapses to a single fail-closed resolver.

None of this is a claim to constrain everything a model does. See **What LITMUS is not** below, which is the load-bearing section of this document.

## The problem

Modern AI systems are very good at producing answers that sound right, which is not the same as producing answers that are right. A confident wrong answer reads exactly like a confident correct one, and the person receiving it often signs off on the plausible one because it looks finished. As AI is wired directly into actions, reporting the numbers a decision rests on, proposing the fix that ships, recommending the treatment that gets approved, taking steps on someone's behalf, the cost of an unverified claim lands on a real person or system. The ability to generate has outrun the ability to verify. Closing that gap is the work. The long-form, non-technical version is in `docs/why-litmus.md`.

## The idea in one paragraph

A claim may carry one of two kinds of warrant. A referential warrant points at a source, the way a footnote does, and it is weak because a source can exist and still not support the claim. A derivational warrant re-does the underlying work, re-running the query, the test, or the computation against the original source, and it is strong because it cannot be faked. LITMUS prefers the derivational kind and insists on it when the stakes are high. It refuses by default when it cannot confirm, and it routes the ungrounded-but-important case to a human with the evidence laid out rather than presenting an unconfirmed claim as a confirmed one. Success is not a fixed generation-to-verification ratio, which targets the edge of instability, but per-domain backlog stability.

## Five rules that survived contact with production

These are stated as constraints rather than aspirations, and each one is in the tree with a test behind it. The full set is in `docs/principles.md`; these five are the ones that generalise beyond the domain they were learned in.

**1. One writer.** Exactly one module may mark a claim verified, and a test enforces it structurally rather than by convention. This was added after a second stamping site was found hand-copying the verification loop. It failed closed identically and was removed anyway: a rule enforced in one place is a rule, and a rule enforced in two is a convention that drifts.

**2. The untrusted half cannot reach the trusted half.** Where a model proposes and a deterministic checker disposes, the checker is forbidden by test from importing the proposer or any model SDK. This is the concrete answer to a model judging a model. CHART's boundary was later tested harder than most: the untrusted half was replaced outright, a model proposer swapped for a deterministic grammar, and the verifier was not modified to accommodate it.

**3. The untrusted party never supplies the thing that makes checking easy.** CHART's extractor claims verbatim quotes and never character offsets; the verifier resolves the offsets itself. If the proposer could hand over offsets, verification would be circular, an audit of its own arithmetic. Ambiguity is a failure, never a guess.

**4. A refuted check and an errored check are different facts.** Both block. They are recorded differently, because a bare boolean cannot distinguish *the source does not support this* from *the source could not be reached*, and conflating them silently writes off a recoverable set of claims as impossible when the real fault was an outage.

**5. Soundness is not completeness, and the difference is declared.** A run can prove that everything it returned is warranted. It usually cannot prove that it returned everything there is. CHART tracks the two separately and marks a partial extraction as partial to every downstream consumer, so that a clean result is never read as coverage.

## What LITMUS is not

This section matters more than the rest of the document, and it is here rather than at the end for that reason.

**LITMUS is not a universal verifier, and it does not constrain all model behaviour.** It gates claims and actions at the point where they would act, in domains that have a re-checkable source of truth. Where a domain has no such ground, LITMUS has nothing to offer it beyond a refusal, and a refusal is not oversight.

Specifically, it does not observe model training, score dangerous capabilities, detect deceptive alignment, audit an organisation against its own safety framework, or verify that a party to an agreement has not defected. Those are real problems and they are different ones, addressed at different layers by different instruments.

It also does not make a person trust a technology they are wary of, does not make a complicated system easy to understand, does not make the hard human judgements in a field like medicine, and does not by itself solve the cost and access problems some domains face. `docs/principles.md` states these as non-goals and `docs/why-litmus.md` works through them in plain language.

What remains after all of that is narrower, and it is dependable for exactly that reason: the claims a person acts on have been checked against the thing they describe, and a claim that could not be confirmed is presented as exactly that rather than slipped through wearing the confidence of one that was.

## Frontier model evaluation

The verification vocabulary here bears directly on the embedded-evaluator proposal in *We Must Pace the Frontier*, and `docs/embedded-evaluators.md` sets out how. The short version is that permanent employee-level access, desks and badges and publication rights, grants an evaluator the referential mode: the right to observe and report. The failures this admits are not lies. They are the eval that ran against a checkpoint that is not the one that shipped, the single seed whose variance was never characterised, the scaffold that changed between the measurement and the deployment. In each the pointer resolves and nothing about the released system has been verified.

The argument is not that LITMUS evaluates frontier models. It does not, and the essay says so directly. It is that the reproducibility of an evaluation is re-executable even when the evaluation's validity is contested, so an evaluator can derivationally establish *you ran this suite, on this checkpoint, with this scaffold, and got this number* while only referentially establishing what the number means. The first half is a measurement and can be made dispositive. That decomposition, plus the five rules above, is what this project has to contribute to the question.

## Status

Early, and deliberately so. This repository is the source of truth for the project's principles, architecture, and verticals. LITMUS is built bottom-up: the contract is not a starting artifact, it is the shape extracted once two real verticals share it.

- Principles, synthesis, and architecture: written, in `docs/`.
- Three verticals run, and are recorded in `verticals/`: WRIT, citation verification for medical-necessity appeal packets; CHART, span verification for extracted payer policy criteria; MARK, numeric grounding and citation tiering for household tax answers. Each record carries the results that ground it, meaning checks that returned green rather than checks that should.
- A fourth, FAL marketing (SMS delivery-truth and response attribution), is in implementation and is not recorded here until its gate's results are on record.
- The portable contract: not yet extracted, and the precondition is now met rather than pending. Three verticals share the shape, and the refactor that would prove it, both verifiers sitting behind the same types without either being bent to fit, has not been performed. Until it is, `reference/contract.ts` stays a sketch. See `docs/roadmap.md`.

One finding from the three belongs in the status rather than buried in a record. The architecture expects a derivational warrant for high-stakes claims wherever the domain admits a re-execution, and in the two highest-stakes verticals the domain does not admit one. There is no query to re-run that establishes medical necessity or what a policy requires. Both therefore run the referential mode built to be hard to game, with the human escalation path carrying what the warrant cannot, and only MARK carries a genuinely derivational component in its recomputed figures. This is the taxonomy working, not failing: it named which mode each vertical is in, and the answer was not the one the architecture anticipated.

## Publications

LITMUS implements the verification method set out in these papers. The first
makes the argument; the second specifies the system architecture.

Rosing, J. H. (2026). *Litmus: The Admissible Set*. Zenodo.
https://doi.org/10.5281/zenodo.21227402

Rosing, J. H. (2026). *Litmus: The Admissible Set (System Architecture)*.
Zenodo. https://doi.org/10.5281/zenodo.21227855

## Repository layout

```
docs/
  why-litmus.md            Non-technical case: the problem, with four before/after examples.
  synthesis.md             The four briefs, the shared shape, and how grounding emerged as the answer.
  principles.md            The rules the design obeys, including the two warrant modes.
  architecture.md          The vertical-first architecture, with diagrams and the contract sketch.
  roadmap.md               The build order, the protocol-last sequence, and the immediate next steps.
  embedded-evaluators.md   The two warrant modes applied to third-party frontier model evaluation.
verticals/
  01-writ-citation-verification.md   Appeal packets: only the gate marks a citation verified.
  02-chart-span-verification.md      Policy criteria: untrusted proposer, deterministic verifier.
  03-mark-numeric-grounding.md       Tax answers: every figure traces, or the answer is blocked.
reference/
  contract.ts              The target type shape, not yet extracted. Reference, not a package.
CONTRIBUTING.md            How a vertical is added and when the contract is allowed to exist.
```

## Where to start

If you read in one direction, read `docs/why-litmus.md`, then `docs/synthesis.md`, then `docs/principles.md`, then `docs/architecture.md`, then `docs/roadmap.md`. If you came here from the frontier-safety side, start with `docs/embedded-evaluators.md` and then read one vertical record.

## A note on this repository's own standard

LITMUS holds that a claim should carry a re-checkable warrant. A design document is a referential warrant, a pointer to an idea. The derivational warrant is a vertical that runs. This repository is honest about which of its contents are which. The documents are the pointer. The verticals are the proof. The project advances by converting the former into the latter, and the contract earns its existence only when two verticals show they share a shape.
