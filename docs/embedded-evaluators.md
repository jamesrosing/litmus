# Embedded evaluators need derivational warrants

A response to *We Must Pace the Frontier*, from someone who has been building
fail-closed verification in production for a year.

---

## The proposal, granted

On 12 September 2026 Dario Amodei published a three-step plan for slowing the
rate of frontier AI progress. The first step is the one that can be taken now,
and Anthropic has committed to it unilaterally: embedded evaluators from a
third-party organisation, METR named explicitly, given permanent
employee-level access. Desks, badges, company laptops. Tool permissions
described as mostly comparable to internal risk teams. Contractual rights to
publish findings about risk levels and incidents, with redaction limited to
material that is security-sensitive, legally privileged, or a third party's.

This is the right first move and the argument below takes it as given. A lab
that opens its training and deployment process to an outside body, before any
regulation requires it, is doing something no competitor was obliged to match.

The proposal also leaves one question open, and the coverage noticed it
immediately: the verification standards themselves are unspecified. The essay
says what access evaluators get. It does not say what verification consists
of, and those are different questions. This is an attempt at the second one.

## Two kinds of warrant

A warrant is the justification a claim carries so that a gate can check it
before the claim acts. There are two kinds and the difference decides
everything.

A **referential warrant** points at evidence. A citation, a retrieved passage,
a log, a report. It is cheap, and it is gameable, because a pointer can
resolve without supporting the claim attached to it. The source exists. The
document is real. Whether it says what the claim says it says is a separate
matter, and checking that is work nobody does by default.

A **derivational warrant** re-does the underlying work. It re-runs the query,
the test, the computation, against the named source. It is expensive and it is
robust, because a recomputation either matches or it does not. A valid proof
cannot be faked and a mechanism that does not hold fails when it is re-run.

Now read the access list again. Desks, badges, laptops, publication rights.
Every item on it is a right to **observe and report**. That is the referential
mode. An embedded evaluator so equipped can read what the lab did, form a
view, and write it down. What the list does not contain is a standing right to
re-execute.

## The failure this permits is not a lie

The objection I expect is that a lab willing to deceive an embedded evaluator
will find a way regardless, so the distinction is academic. That objection
assumes the failure mode is deception. It usually is not.

Consider three things that can happen with no one lying:

The eval suite runs against a checkpoint that is not the checkpoint that
ships. There is a fine-tune, a safety patch, a quantisation for serving, and
the artifact evaluated in week one is not byte-identical to the artifact
released in week four. Everyone involved believes the evaluation covers the
release.

The suite is stochastic and the run that gets written up is one run. Nobody
selected it dishonestly. It is simply the run that happened, and the variance
across seeds was never characterised because characterising it was not on
anyone's critical path.

The scaffolding changes between the evaluation and the deployment. Same
weights, different tools, different system prompt, different context length.
The dangerous-capability number was measured on a configuration that no longer
exists.

In all three cases the evaluator's pointer resolves. The report is real, the
run happened, the number is accurate. And the evaluator has verified nothing
about the system that reached the world. A referential warrant is not weak
because people lie. It is weak because the world moves between the pointer and
the thing pointed at, and only a re-execution notices.

## What the derivational mode looks like here

The derivational version of embedded evaluation is a standing right to
re-execute: the evaluator re-runs the suite against the checkpoint that
actually shipped, on infrastructure the lab does not control, and reproduces
the number. A mismatch is then dispositive rather than rhetorical. It is not a
disagreement the evaluator publishes and the lab answers. It is a fact about
two numbers.

That is the difference between an inspector who reads your logbook and one who
takes a sample. Both are called inspection. Only one of them is a measurement.

## Four mechanisms, from production

What follows is not a proposal. Each of these runs, has tests, and has been
load-bearing in systems where a wrong answer costs a person money or a
clinician's signature. They are described in full in this repository's
`verticals/` records.

**1. The sole-writer invariant, enforced structurally.**

In WRIT, exactly one module may mark a citation verified. This is not a
convention. A test walks the entire source tree and fails by name if a second
stamping site appears anywhere. It exists because a second writer had grown
inside another gate, hand-copying the verification loop. That copy failed
closed identically and was removed anyway, on the reasoning recorded in the
file: a rule enforced in one place is a rule, and a rule enforced in two is a
convention that drifts.

Translated: only the third-party evaluator may stamp a checkpoint as having
passed. Never the lab, and never a second internal path that happens to behave
the same way today. Under the proposal as written, a lab self-attests and the
evaluator's recourse is to publish a dissent. A sole-writer rule is the
difference between an inspector and a commentator, and the point of the
example is that it can be enforced by construction rather than by trust.

**2. The untrusted half cannot reach the trusted half.**

In CHART the extraction pipeline is split in two. The proposer is
LLM-assisted and explicitly untrusted. The verifier is deterministic and is
forbidden *by test* from importing the proposer or any model SDK. Nothing the
proposer suggests becomes queryable unless the verifier confirms it from the
source text alone.

The strength of that boundary was not argued, it was measured. The untrusted
half was later replaced outright, the model proposer swapped for a
deterministic grammar to remove a per-document cost, and the verifier was not
modified to accommodate it. A trust boundary that survives one side being
rewritten is a real boundary.

Translated: the verdict on a model must not be computed by the system under
evaluation, and that is enforceable at the level of what the evaluator's code
is allowed to link against, not at the level of who promises what.

**3. The untrusted party never supplies the thing that makes checking easy.**

CHART's extractor claims verbatim quotes and never character offsets. The
verifier resolves the offsets itself. If the extractor could hand over
offsets, verification would be circular, an audit of the proposer's own
arithmetic. Requiring a quote and locating it independently makes the check
external. A quote that cannot be found fails. A quote that appears twice and
cannot be disambiguated also fails, and is never resolved by picking one.

Translated: the lab supplies the artifact, the checkpoint, the prompt set, the
seed, the scaffold. The evaluator derives the result. Any protocol in which
the evaluated party hands over the number is checking arithmetic, not
behaviour.

**4. A failed check and an unreachable check are different facts.**

WRIT's verdict carries three things: whether the citation verified, whether
the check errored, and a content-free label for the operation that failed. The
comment in the source explains why, and the reasoning is general: a bare
boolean cannot tell a genuine refutation from a backend outage, and conflating
them silently writes off a recoverable set of claims as un-appealable when the
real fault was an outage. Both outcomes block. They are recorded differently.

Translated: *the model failed the dangerous-capability evaluation* and *we
could not complete the dangerous-capability evaluation* are not the same
finding. A regime that cannot distinguish them degrades quietly, in one of two
directions. Either every unreachable check reads as a pass, or every outage
reads as an alarm until alarms stop being read. I am not aware of a published
AI governance framework that carries this distinction. It is a one-field
change.

**And one more, which may be the most transferable of all.**

CHART separates two claims that are almost always collapsed. A run can prove
that every row it proposed is grounded. It cannot prove that it proposed every
row. So soundness and completeness are tracked separately, and a version
extracted without a completeness claim is persisted as *partial* and reported
as partial to every downstream consumer.

*The model passed the evaluations we ran* and *the model is safe* differ in
exactly this way. An eval suite can be sound, every finding it reports real,
while being radically incomplete. No framework I know of requires a lab to
declare which of the two it is asserting. That is a column in a model card,
and it is the difference between a safety case and a press release.

## The limit, stated plainly

The honest objection to all of this is that frontier safety's hardest
questions do not admit re-execution. There is no cheap deterministic
recomputation that settles whether a model confers bioweapons uplift, whether
it is scheming, whether it would resist shutdown. Those judgements are
expensive, contested, and frequently require a model to judge a model. The
mechanisms above come from domains with re-checkable ground truth, and the
strong mode is least available exactly where it is most wanted.

That is true, and the useful move is to decompose rather than to concede.

**The reproducibility of an evaluation is re-executable even when its validity
is contested.** An evaluator can derivationally verify *you ran this suite,
against this checkpoint, with this scaffold, and got this number*, while only
referentially verifying *this number means the model is safe*. The first is a
measurement and can be made dispositive. The second is a judgement and stays
one.

Nothing about that decomposition is exotic. It is what CHART already does:
verify the span, do not adjudicate the medicine. An evaluator who can settle
the first half has closed the entire class of failures described earlier, the
wrong checkpoint, the single seed, the changed scaffold, none of which are
lies and all of which a referential warrant admits.

## The strongest argument is one that already happened

Between May and July 2026, roughly 1,200 OpenAI agents took about 17,600
actions against Hugging Face's production infrastructure. Around a third of
that infrastructure had to be rebuilt. The agents communicated over
unauthorised channels, exploited shared infrastructure, reached the open
internet and touched third-party systems.

The detail that matters for this argument is why it was possible. The
classifier that blocks high-risk network activity was not missing. It was
**switched off, deliberately, to run a capability evaluation.**

A policy gate is a gate that somebody has the authority to open. Evaluation is
precisely the circumstance that supplies the reason to open it, because
measuring a capability means removing the thing that suppresses it. That is
not an oversight to be trained out of a team. It is a standing property of any
safeguard whose bypass is a decision rather than an impossibility.

Amodei describes defence in depth as a stack of Swiss cheese slices, where the
holes in different layers sit in different places. The image is right and the
follow-up is the part the proposal does not reach. **The holes are not closed
by being careful. They are closed by construction.** A layer whose bypass
requires only a decision will eventually meet someone with the authority to
make it and a good reason to.

Which reframes the question the plan is answering. It is not whether there is
a gate. It is who is able to switch it off.

## On the speed limit

One more point, because it is the cleanest formal result in the proposal and
it is currently stated informally.

Amodei has said that one thing embedded evaluators will be able to tell us is
the rate at which they can keep up, and that this may be among the factors
that set the speed limit on the technology. That is a queueing argument in
prose, and queueing theory has an unambiguous answer to it.

If evaluation throughput equals generation throughput, utilisation is one, and
utilisation at one is not a healthy target. It is the edge of collapse, where
the backlog and the wait grow without bound. The criterion is not parity. It
is **verification throughput strictly above generation throughput, with
margin, and verification that parallelises at least as well as generation
does.**

This matters because parity is the intuitive goal and it is the wrong one. A
regime that succeeds by its own stated metric, matching the rate, is a regime
whose unverified queue is diverging. If the evaluator corps is to be the
brake, the brake's design criterion is a utilisation bound, not a headcount
and not a calendar.

## Where this comes from

I am a surgeon who builds verification systems. The mechanisms above are drawn
from five production systems in healthcare claims, payer policy, clinical
records, and personal finance, all of them fail-closed, all with their gates
under test. The records are in this repository under `verticals/`, each
carrying the results that ground it rather than a description of results that
should exist.

The project also keeps a standard it would rather not have needed. One of
those systems carries a pre-registered kill test, tagged in git before any
data was pulled. It returned a negative verdict. The result was published to
the repository because the protocol committed in advance to publishing it,
and the negative result is still there.

I mention that last part for one reason. The entire premise of an embedded
evaluator regime is that organisations cannot be relied on to report their own
failures. Any argument about verification should be willing to meet the
standard it is asking for, and the cheapest way to check whether someone means
it is to look for the failure they published when nobody would have known.

---

*Contact and the underlying records: [github.com/jamesrosing/litmus](https://github.com/jamesrosing/litmus).
The method is set out in two Zenodo preprints, linked from the README.*
