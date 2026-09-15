# Vertical 02 — CHART, span verification for extracted policy criteria

CHART indexes United States payer medical policy and serves the coverage
criteria attached to it. The criteria are extracted from policy documents by an
untrusted proposer and are queryable only after a deterministic verifier has
confirmed each one against the document it came from.

The code lives in `chart`. This record is the LITMUS view of it, written at the
level of the gate rather than the implementation; the verifier itself is held
confidential by its owner.

## The claim

One structured coverage criterion, asserting that a payer's policy imposes a
particular requirement, and offered for serving through the query API to a
consumer that will adjudicate a claim with it. The criterion acts by being
returned as an answer to "what does this policy require", and a wrong one is a
clinician or a claims engine reasoning from a requirement the policy does not
contain.

## The warrant

Referential. The vertical's own specification says so in as many words, and the
precision matters: every criterion served carries a machine-checkable
referential warrant, being a document hash, a page, and a character span. A span
and a hash are a pointer with a mechanical check attached. Nothing is re-run,
and this vertical should not be described as derivational.

It is, however, the referential mode built to be hard to game, which is the
harder and more general problem, because most consequential claims cannot be
re-executed at all. Three properties do the work.

The proposer is untrusted and the verifier is deterministic, and they are
separate code. That separation is a binding rule in the specification and it is
enforced rather than asserted: a test fails if the verifier imports the proposer
or any model SDK. The trusted half cannot consult a model to decide whether a
model was right.

The untrusted half is never allowed to supply the thing that would make checking
trivial. It claims a verbatim quote and never an offset. The verifier resolves
the quote's position itself, so the check is genuinely external rather than an
audit of the proposer's own arithmetic. A quote that cannot be found fails, and
a quote that occurs more than once and cannot be disambiguated also fails. It is
never resolved by choosing one.

The boundary has been tested harder than most. The untrusted half was later
replaced outright, the model proposer swapped for a deterministic grammar to
remove a per-document cost, and the verifier was not modified to accommodate it.
A trust boundary that survives one side being rewritten is a real boundary.

## The refusal path

Fail closed, and the refusal is an answer rather than an error. A query with no
warranted answer returns `INSUFFICIENT_EVIDENCE`, together with the authority
chain that was checked and the nearest indexed material, never a synthesized
answer. The consumer contract carries this as data, so a caller cannot mistake
the absence of an answer for the absence of a policy.

Two further refusals are worth recording because they cost real coverage rather
than being decorative. Criterion text that reproduces a third-party licensed
code descriptor is rejected, which removed a hundred and seventeen rows in a
single corpus sweep. And conflicts between overlapping authorities are returned
as data rather than merged, because two contractors defining the same term
differently is a finding to preserve, not a collision to resolve.

The vertical also declares a limit most systems leave implicit, and it is the
most transferable thing in it. A run can prove that every row it proposed is
grounded. It cannot prove that it proposed every row. So soundness and
completeness are separated, and a version extracted without a completeness claim
is persisted as partial and is reported as partial to every consumer downstream.
A verifier that distinguishes "everything I returned is warranted" from "I
returned everything that is there" is refusing to let a clean result be read as
coverage.

## The escalation path

Every rejection lands in a review queue carrying its typed reason and the
document it came from. The queue is worked clinician in the loop, and it is the
grooming engine rather than a backlog: each resolution becomes a new locked
fixture, so quality capacity grows out of production disagreement.

The owner is the operator, who is the physician, and the decision is recorded
verbatim rather than summarized. Locked fixtures are permanent. A fixture never
loosens to let code pass, which is the rule that keeps the escalation path from
quietly becoming a weakening path.

## The verification results

Run on 15 September 2026 against the repository at its then-current head.

- The verifier's own suite, `packages/extract/test/verifier.test.ts`:
  **11 tests, 11 passing**.
- Full suite, `vitest run`: **813 tests passing, 0 assertion failures**. Of 106
  test files, 34 could not execute in this sandbox because a system library
  needed by the embedded Postgres used in database-backed tests is absent. I
  confirmed the cause is uniform, being 68 error instances all of that one
  fault, with no assertion failures among them. Continuous integration supplies
  a real Postgres service and runs them.
- The live state the gate has produced, as recorded in the vertical's progress
  log: **91,350 verified criteria and 445,434 code mappings**, with zero
  non-verified rows queryable. This is the Medicare corpus. Extension to
  commercial payers is open work, and the figure should not be quoted without
  that qualifier.
