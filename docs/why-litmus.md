# The Case for LITMUS

Why a checking layer matters now that software can sound right faster than anyone can confirm it is right.

## The problem

Modern AI systems are very good at producing answers that sound right. That is not the same as producing answers that are right, and the gap between the two is where the risk now lives. A confident wrong answer reads exactly like a confident correct one. The person receiving it, an analyst with a deck due, a doctor between patients, an engineer working through a backlog, has no easy way to tell them apart, and often signs off on the plausible one because it looks finished.

This was a manageable problem when AI mostly drafted text that a person would read and revise. It becomes a serious one as AI is wired directly into actions: reporting the numbers a decision rests on, proposing the fix that gets shipped, recommending the treatment that gets approved, taking steps on someone's behalf. When a fluent but unverified claim is allowed to act, the cost lands on a real person or a real system, and it usually lands after the fact, when it is expensive to undo.

The uncomfortable part is that this does not improve on its own as the technology improves. A more capable system produces more plausible output, faster, which widens the gap between how much is generated and how much anyone has checked. The ability to generate has outrun the ability to verify, and closing that gap is a separate piece of work from making the systems more capable. LITMUS is that piece of work.

## What LITMUS does

The name is deliberate. A litmus test, in ordinary use, is a simple check that tells you something true. LITMUS is a checking layer that sits between an AI's claim and the action that claim would trigger. It lets the claim through only when the system has confirmed it, and it holds the claim back by default when it cannot, the way a circuit breaker trips to a safe state rather than guessing.

There are two ways to check a claim, and the difference between them is the heart of the idea. The first is to point at a source, the way a footnote points at a reference. This is weak, because a source can exist and still not support the claim attached to it. The second is to re-do the underlying work: re-run the calculation, re-run the test, recompute the figure against the original data. This is strong, because it cannot be faked. A recomputation either matches or it does not. LITMUS prefers the second kind of check, and it insists on it when the stakes are high. When the only thing on offer is a pointer to a source, and the decision matters, LITMUS does not treat that as confirmation. It either checks further or it hands the claim to a person with the evidence laid out.

That is the whole posture: re-do the work where you can, refuse by default when you cannot confirm, and never let an unconfirmed claim wear the appearance of a confirmed one. The examples below show what that changes in practice.

## A business number

An executive asks the company's AI assistant how much revenue grew last quarter in the western region. The assistant answers, to one decimal place, that it grew by a specific amount. The number is precise, confident, and ready to paste into a board deck.

Without LITMUS, the number goes into the deck and into the decision. Later it emerges that the assistant combined two tables incorrectly, or used the wrong range of dates, and the real figure was less than half of what was reported. Nobody caught it, because the wrong number looked exactly as authoritative as a correct one would have, and there was no obvious reason to re-derive it by hand.

With LITMUS, the assistant is not permitted to state the number on its own authority. It must attach the exact query it used, and LITMUS re-runs that query against the real data before the number is shown. If the result matches, the executive sees the figure together with the means to inspect how it was produced. If it does not match, the figure is withheld and flagged as unconfirmed. The executive receives either a number that has been re-derived from the source or a clear signal that it could not be confirmed, and never a confident guess dressed as a fact.

What changes is the difference between a number that sounds right and a number that has been checked against the thing it describes.

## An automated security fix

An automated tool reports that it has found and fixed a serious flaw in a piece of widely used software. Reports like this now arrive in large volumes, because AI can scan code far faster than people can review it.

Without LITMUS, a small team, often volunteers maintaining software that much of the internet quietly depends on, receives a flood of these reports. Some are real. Many are plausible but wrong. The maintainers cannot tell which is which without doing the investigative work themselves, so the reports consume the scarce time of exactly the people least able to spare it. In the worst case, a fix that looked correct is accepted and quietly introduces a new problem.

With LITMUS, no report is sent unless the tool has reproduced the flaw, with a test that fails on the original code and passes on the corrected code, run against the specific file in question. The maintainers receive a far smaller stream of confirmed issues, each one carrying the proof needed to verify it in seconds rather than hours. The volume becomes manageable because the unverified majority never leaves the building.

What changes is the move from a pile of confident claims that someone else has to check, to a short list of claims that have already been demonstrated.

## A clinical recommendation

An AI system drafts the justification for why a particular patient should receive a particular treatment, and supports it with a citation to a clinical guideline.

Without LITMUS, the draft reads fluently and cites a real guideline. But the cited passage does not fit this patient, who does not meet the stated criteria, or it says something adjacent but not the same. A reviewer between appointments, seeing a polished draft with a credible citation, approves it. The error is hard to catch precisely because the draft is fluent and sourced, which is what a correct one would also be.

With LITMUS, a decision this consequential is not allowed to pass on a citation alone. Where the criteria can be re-checked directly against the patient's record, LITMUS checks them. Where the judgment cannot be fully re-derived, the system does not quietly approve it. It routes the draft to the clinician with the supporting evidence laid out and the consequences of an error made explicit, rather than presenting the claim as already confirmed. The hard judgments in medicine remain with the people trained to make them, and the change is that those judgments now rest on checked evidence, with an unconfirmed claim never disguised as a confirmed one.

What changes is that the system stops lending the appearance of confirmation to a claim it has not confirmed, and makes the uncertainty visible to the person who owns the decision.

## An action taken on your behalf

You ask an AI assistant to rearrange your Thursday meetings around a medical appointment and to let the relevant people know.

Without LITMUS, the assistant acts. It moves events and sends messages. Whether it read the right calendar, moved the right meetings, and wrote to the right people is something you discover only through the consequences, when a colleague replies in confusion or you realize something was missed. The unease many people feel about handing tasks to an autonomous assistant is exactly this: you cannot see what the assistant based its actions on, so caution is reasonable.

With LITMUS, before the assistant takes a step that cannot be easily undone, such as sending a message or moving an event, it must attach the specific records it relied on, and LITMUS checks that the action follows from those records. An action whose justification does not hold up against the data the assistant read is held back rather than carried out. You get actions you can trace back to their basis.

What changes is the part of the distrust that comes from not being able to see what an action was based on. LITMUS makes that basis visible and checked.

## What LITMUS is careful not to claim

LITMUS checks whether a claim is supported by the evidence behind it. By itself it does not make a person comfortable with a technology they are wary of, and it does not make a complicated system easy to understand. Those are real problems, and they are different ones. Its role is narrower, and for that reason it is dependable: it makes sure that the claims a person acts on have been checked, and that a claim which could not be confirmed is presented as exactly that, rather than slipped through with the confidence of one that was.

## In one line

The value of LITMUS is not that the AI sounds right. It is that the system can show a claim was checked against the thing it describes, and can refuse, in the open, when it was not.
