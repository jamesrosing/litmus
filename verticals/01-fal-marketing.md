# Vertical 01: FAL Marketing

The first real instance of LITMUS. It lives in the FAL codebase (the Allure MD practice platform), not here; this record frames that work through the LITMUS lens so the pattern is visible and reusable. At time of writing it is in implementation as a draft pull request, not yet merged.

## The setting

The admin marketing hub is driven toward one outcome the practice cares about: a recipient responds, by texting back or calling. The north-star metric is distinct responders over delivered, per campaign and channel.

## The bug that started it

A live report: a test send claimed "2 of 2 received" while nothing arrived; delivery timestamps and provider IDs looked empty; and the same phone number, opted out, was suppressed in one campaign but sent in another. Reading the code turned the report into a precise diagnosis. The sent records did carry real provider SIDs, so the system was not failing to call the provider. The substantive defect was that "sent" meant "the provider accepted the message," not "the message was delivered," and the interface called that "received." The opt-out inconsistency was a fragmented suppression rule that failed open when no contact record resolved.

## The LITMUS mapping

This is a grounding gate, and the bugs are one failure wearing different clothes: a claim recorded without tracing to the correct re-checkable ground truth.

- Claim. A message was sent; a delivery occurred; a recipient is allowed to be messaged; a response should be counted for a campaign.
- Warrant. For "sent," the provider SID is the warrant; a record is counted as accepted only when the result carries a real SID, so an accept-without-SID can never be counted. For "delivered," the warrant is the provider status webhook, the only source that grounds delivery. For "response counted," the warrant is a trace by phone to a send row that carries the campaign, which is the re-checkable link between an inbound message and the campaign that prompted it.
- Refusal by default. A send result without a SID is classified as failed rather than sent. A recipient whose identity does not resolve is suppressed rather than messaged. An unconfirmed delivery is left unconfirmed rather than reported as received.
- Calibrated, single gate. The opt-out rule is consolidated into one fail-closed resolver that is the single place the rule lives, fed by both identity spaces, so the same number cannot suppress in one path and send in another. The high-stakes case here is a marketing message to a person who opted out, which is a compliance exposure, so the gate fails toward suppression.
- Honest reporting. The interface distinguishes accepted from delivered, and the response rate is labeled "of accepted" until delivery confirmation is verified healthy, rather than presenting an ungrounded denominator as a grounded one.

## What ground-truthing surfaced

The discipline that matters most is that re-checking the code, not trusting the report, found defects that would have silently broken the metric.

- An identity-space mismatch. The marketing send path stored a contact identifier where the inbound path resolved a client identifier by phone, so the obvious attribution join would have matched nothing every time, and the metric would have read a flat zero that looked like "no one responds." The fix bridges by phone through the send-record table that stores the unmasked number.
- A double write. The send path wrote two rows per recipient into one log table, inflating the top-line counts roughly twofold, which is the dishonest number the work exists to remove, resurfaced one level up.
- One table for numerator and denominator. Responders and the accepted or delivered denominator are both counted from the same send-record table, so the response rate cannot exceed one hundred percent by construction, and the metric does not depend on how the double-write cleanup lands.
- Phone-keyed idempotency. Because a single responding phone can map to more than one contact record, deduplication is keyed on the phone, the real responding identity, so one human cannot count as two responders.

## The load-bearing results

Three results, more than the rest, decide whether the metric is real, because they are the ones the plan could not answer in advance.

1. The double-write count. A live query of rows per provider SID for a recent campaign, settling whether the duplicate write exists and fixing the row state before the metric view is written.
2. The conflict-target test. The same inbound fired twice, confirming the phone-keyed uniqueness constraint actually catches the duplicate rather than silently inserting two rows.
3. The full-loop proof. On a test subaccount, a real reply produces a counted response, the matcher logs a match, and the delivery timestamp populates, demonstrating the metric counts a real human response and not an artifact of seeded data.

## Status and lineage

In implementation as a draft pull request, deferring optimization levers to a second pull request once one to two weeks of response data exist to validate them against. This vertical is the seed. The intended second vertical, a verified-analytics gate that recomputes a reported number against its query, re-executes against a different substrate and is what would let the LITMUS contract be extracted. See `docs/roadmap.md`.
