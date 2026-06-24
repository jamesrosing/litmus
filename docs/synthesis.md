# Synthesis

LITMUS began as the answer to a question put to four unrelated briefs: a report on AI discovering software vulnerabilities faster than they can be patched, a philosophical discussion of why mathematics predicts the physical world so well, a product announcement about an agentic AI stack, and a survey of precision-oncology breakthroughs. The task was to find what they share, where they differ, what they approach without demonstrating, and what could be built to further the good in them.

## The shared shape

The four collapse to one shape: a power to uncover hidden structure that outruns the institutions meant to absorb it, a discovery-versus-absorption asymmetry, a capability overhang. Bug discovery outruns patching throughput and the resources of the projects expected to patch. Precision oncology reads a tumor's structure faster than health systems can fund or sustain the resulting therapies. The agentic stack hands people autonomous delegation faster than they can decide whether to trust it. Mathematics is the outlier in register and the premise the other three depend on: abstract pattern maps onto reality reliably enough to act on, and its unreasonable effectiveness is the license for all the pattern-finding the other three exploit. Three are engines, and one is the theory of why engines work at all.

## Where they differ

The useful difference is agency. Mathematics is pure thought with no actor to overwhelm, which is exactly why it has no overhang and the others do. The overhang appears precisely when thought gets wired to action, and the cost of a wrong-but-plausible result is then borne by a person or a system rather than absorbed harmlessly.

## The missing piece

Each brief circles the same missing piece: grounding, tying a generated claim back to a re-checkable source of truth, and refusing the claim when the link is absent. A flood of unverified vulnerability reports is a denial-of-service on maintainers unless each traces to the actual code path. An agent you cannot audit against ground truth is one you are right to distrust. The oncology work leans on biomarkers, which is grounding, but treats verification and affordability as a footnote rather than the system problem they are. And the mathematics brief explains why grounding is even possible, since reality has stable structure a representation can be faithful to, without connecting that to the machines now betting on it. Put plainly: all four generate faster than they verify, and none demonstrates the verifier.

## The two warrant modes

Grounding has two modes, and the difference between them is the heart of the project. A referential warrant is a typed pointer to evidence. It is cheap and gameable, because a pointer can resolve without supporting the claim attached to it, which is the informational version of the acquired resistance the oncology brief names: make the citation the target and you get cited-but-wrong claims. A derivational warrant is a proof or a re-execution the system can re-run. It is expensive and robust, because a valid proof cannot be faked and a mechanism that does not hold fails when it is re-run. The robustness LITMUS needs against gaming comes from preferring the derivational mode wherever a domain admits one, not from adding effort to the referential gate.

## The mathematics repair

The mathematics brief is easy to force into the frame as a metaphysical warrant, the claim that grounding is not theater because there is a fact of the matter to be faithful to. That leans on a contested philosophical position. The repair strengthens the project rather than patching it. Grounding does not need the universe to be Platonic; it needs each domain to have a re-checkable source of truth, the executable code path, the named assay, the data record an agent read. That is an operational notion, not a metaphysical one. Mathematics also supplies the existence proof for derivational grounding directly: theoretical predictions such as antimatter and gravitational waves were fluent, plausible, externally unverified claims acted on before empirical confirmation, and what carried the trust was a derivation, not a citation.

## Domain singularity

Two true things hold at once. There is one shape across the domains, the overhang, and that single shared shape is what licenses a general spine. And the ground each domain is checked against, the code path, the dataset, the assay, the record, is singular to that domain and substitutable by nothing else, which forces the checker to be a domain-specific organ rather than part of the spine. One shape, one irreducible ground per domain. This is why the portable part of any fix is the contract and the policy, while the value-dense part is the per-domain verifier that does not transfer.

## The corrected success criterion

An early version of this synthesis proposed driving a generation-to-verification ratio toward one. In queueing terms that is driving utilization toward one, which is the edge of collapse, where the backlog and the wait grow without bound. The corrected criterion is per-domain backlog stability: verification throughput strictly above generation throughput with margin, and verification that parallelizes at least as well as generation does. The defensible claim is also narrower than a universal verifier. Three action-coupled domains share a verification deficit, the fourth tells you the deficit is closeable because domains have re-checkable structure, and the portable part of any fix is the contract, not the checker.
