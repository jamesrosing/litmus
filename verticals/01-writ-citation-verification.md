# Vertical 01 — WRIT, citation verification for appeal packets

A medical-necessity appeal packet is assembled by a generator, argued against a
payer's own written policy, and signed by a physician before it is mailed. The
gate sits last in that sequence. Its rule is that the packet may leave only if
every citation in it has been checked against the source it names.

The code lives in `writ`, at `src/engine/litmus.ts`. This record is the LITMUS
view of it.

## The claim

One appeal packet, carrying an argument that a named patient meets a named
policy's coverage criteria, together with the citations that argument rests on.
Each citation carries a locator and the text it claims its source supports. The
packet is what acts: it is signed, mailed, and entered into a payer's appeal
record, and a wrong one is a physician asserting something false in writing to
an insurer.

## The warrant

Referential, with a per-citation entailment check.

Each citation names a source, and the verifier resolves that locator against the
source it points at, payer policy text or the patient's own record, and confirms
that the source supports the claim attached to it rather than merely existing.
No computation is re-run, so this is not the derivational mode, and the record
should not claim it is. It is the referential mode held to principle 2: the
entailment check is narrower and cheaper than the generation it gates, and the
generator is structurally barred from performing it.

The domain does not admit a re-execution for the thing that matters most. There
is no query to re-run that establishes medical necessity, because necessity is a
judgment rather than a computation. What the gate can establish is that every
sentence the argument attributes to a policy is in that policy, and that every
fact it attributes to the chart is in the chart. The judgment stays with the
physician, resting on citations that have been checked.

One invariant carries the whole arrangement. The generator proposes and the gate
disposes, and only the gate may mark a citation verified. That is stated as hard
rule 1 in the vertical and enforced structurally rather than by convention: a
test walks the source tree and fails by name if any file other than the gate
stamps a citation verified. It was added after a second stamping site was found
living in the policy-coverage gate, hand-copying the loop. That copy failed
closed identically and was removed anyway, on the reasoning that a rule enforced
in one place is a rule and a rule enforced in two is a convention that drifts.

## The refusal path

Fail closed, with refusal as the default on any doubt. A packet with an
unverifiable citation is blocked and is not sent. A medical-necessity packet
carrying no citations at all is itself a refusal condition, because an
unsupported argument is exactly the thing the gate exists to stop. A verifier
that throws is treated as a check that did not complete, never as a pass.

The gate distinguishes two ways of not being verified, and the distinction is
load-bearing. A refutation, where the source does not support the claim, and an
errored check, where the source could not be reached, both block the packet and
are recorded differently. A bare boolean would collapse them, and collapsing
them silently writes off a recoverable set of claims as un-appealable when the
real fault was an outage. The errored verdict carries an operation label rather
than a raw error message, because a raw message can quote chart or policy text.

## The escalation path

Two paths, and they are separate from the verdict.

An ungrounded claim does not reach a human as a claim. It is refused, and the
generator's output is discarded rather than presented for approval, so nobody is
asked to sign off on something the gate could not confirm.

A grounded claim may still be held. The vertical keeps a mail boundary distinct
from the verdict: a packet whose citations all verify against the records they
were drawn from, but whose evidence is an un-upgraded scaffold rather than
human-verified note prose, grounds normally and is still blocked from physically
leaving the building until a person upgrades the evidence. The verdict is
untouched. The owner of that decision is the reviewing physician, who is the
signer, and the cost of being wrong is a false statement made to a payer under a
medical licence.

## The verification results

Run on 15 September 2026 against the repository at its then-current head.

- Full suite, `npx tsx --test tests/*.test.ts`: **2,371 tests, 2,371 passing,
  0 failing**, across 501 suites.
- The structural invariant has its own suite, `tests/litmus-sole-writer.test.ts`,
  which asserts that no file under `src/` other than the gate stamps a citation
  verified. Green.
- The discriminating cases are in `tests/verify.test.ts`, and they are the ones
  worth naming, because they are what separates a gate from a formality: for
  each verified commercial policy in the registry, a verbatim citation verifies,
  a paraphrase of the same policy is refuted, and a citation with the wrong
  locator is refuted. Green across all five registry policies.

A separate, earlier result belongs in this record because it is evidence about
the discipline rather than the gate. The vertical carries a pre-registered kill
test, `docs/kill-test-protocol.md` at tag `kill-test-v1.1`, registered on
30 August 2026 before any data was pulled. It returned a negative verdict, K4,
a denominator failure at the wedge site, and the result was published to the
repository as the protocol committed it would be. A gate that has never been
seen to block is not known to work, and a project that has never published its
own negative result is not known to report one.
