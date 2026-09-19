# Vertical 03 — MARK, numeric grounding and citation tiering

MARK answers personal-finance and tax questions for a physician household.
Every factual claim in an answer must resolve to a verified authority or the
system stays silent. The gate is a fail-closed verification engine carried as a
separate package under the working name STAY, kept import-clean from the agent
and from memory.

The code lives in `mark`, at `packages/verify`. This record is the LITMUS view
of it.

## The claim

One drafted answer, containing figures and citations, that will be read and
acted on by a person making a tax or retirement decision. The unit that acts is
the whole answer rather than a single assertion, because a figure in a paragraph
is acted on together with the sentence around it. A wrong one is a person
contributing the wrong amount to a retirement plan, or relying on a limit that
applied to a different year.

## The warrant

Mixed, and this is the vertical where the taxonomy earns its keep, because the
two modes appear side by side and are checked differently.

Derivational for computed figures. A stated amount that is the result of a
calculation must be the output of a deterministic, property-tested calculator
that read its rates from the fact table at call time. The figure is not accepted
because a source mentions it; it is accepted because the computation was run and
produced it.

Referential for looked-up figures. A rate, limit, threshold or deadline must
come from a row in the fact table, and a row that has not been confirmed by a
human is invisible to the agent entirely. No figure is hardcoded in source, and
none is permitted to originate from the model.

What binds the two is a numeric-leak validator, and it is the mechanism that
makes the whole vertical fail closed rather than merely well-sourced. Every
numeric claim in a draft is extracted and must trace to a grounded value
obtained in that same turn. An orphan, meaning a number present in the prose
with no lineage, blocks the answer. The check is on the answer's surface rather
than on the pipeline's intentions, so a figure that the model produced fluently
and that nothing supports cannot survive to the reader.

Two refinements in that validator are worth recording, because both were found
by the check being wrong in a way that mattered.

Provenance is labelled at a finer grain than grounded or not. A figure the
caller supplied and handed to a calculator is marked as an input rather than as
something the calculator computed. Without that distinction, a draft echoing the
user's own stated income back to them reported that figure in the provenance
exhibit as a computed result, in a system whose entire product is the provenance
exhibit.

Magnitude words are part of the claim. A figure written as a quantity in
millions is a claim about millions, and checking the mantissa alone let a
leaked figure collide with an unrelated grounded value and pass.

## The refusal path

Silence, and out-of-scope requests are routed rather than partially answered.
An answer with an orphaned number is blocked. A citation that does not resolve
to a corpus document is blocked.

This vertical adds two refusal conditions the other two do not have, and both
are about a pointer that resolves to the wrong thing rather than to nothing.

A citation must match the tax year the question concerns. A prior-year citation
on a current-year question is a hard block, because a reference to last year's
limit resolves perfectly and supports the wrong number. Correctness here is
temporal, and a warrant that ignores time is not a warrant.

A reply may not rest on commentary alone. Secondary sources never resolve a
figure, and an answer that cites only secondary material when a primary
authority was in scope and went uncited is blocked. That condition became
reachable when several on-topic commentary documents crowded the primary IRS
publications out of retrieval entirely, and the mechanics were then explained
citing nothing with authority. The answer was correct-sounding, uncontradicted,
and traceable to no authority at all, which is the exact failure the referential
mode is gameable by. The check is scoped so that a reply citing the only
sources it was given is not treated as the failure; reaching past an available
authority for commentary is.

## The escalation path

Out, to a person, by design rather than as a fallback. The router classifies
every request as answer, compute, or route-out, and the route-out path is the
escalation: the question goes to a human professional rather than being answered
partially. The owner is the household's own adviser or preparer, and the
vertical is explicit that it is not an investment adviser and not a tax
preparer.

Alongside it runs a coverage telemetry package that records what the system
could not answer and why, typed by cause per hold site. It sits outside the
request path, its sink is absent by default, and a throw inside it cannot fail a
turn. It records the shape of a gap, being keys, causes and counts, and never a
client figure. This is the instrument that keeps refusals visible as a
measurable surface rather than as silent attrition.

## The verification results

Run on 19 September 2026 against commit `ddc3cbf`, which is also the head the
15 September run used; the repository has not moved between them.

- The gate's own package, `packages/verify`: **28 tests, 28 passing**, across
  the numeric-leak validator, the citation checker, and a separability test that
  holds the engine import-clean from the agent and from memory.
- Full suite, `vitest run`: **520 tests passing, 0 assertion failures**. Two of
  37 test files could not execute in this sandbox because they require Supabase
  credentials that are not present; I confirmed both failures are that one
  cause.
- The golden evaluation set, which the vertical treats as a merge gate rather
  than a report, is recorded in its README at 100 per cent since the fourth
  build session, and nothing merges below it. The earlier sessions' figures are
  not on record here, so this record cannot say whether that gate has been seen
  to block, and by this project's own standard a gate never seen to block is
  not by that fact known to work. The figure is offered as the bar that has
  held, not as evidence the bar bites.
