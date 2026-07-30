---
'@last-rev/cms-webhook-handler': patch
'@last-rev/sanity-webhook-parser': patch
---

Fix Sanity webhooks leaving the preview cache stale: draft updates wrote a Redis key nothing reads, and deletes invalidated nothing at all.

Draft webhook bodies carry a `drafts.<id>` `_id`, but every reader looks documents up by the bare id — the preview client queries with `perspective: 'drafts'`, which returns the published `_id`. Draft updates therefore wrote `preview:documents:drafts.<id>`, a key nothing reads, and left `preview:documents:<id>` holding stale content until its TTL expired (30 days by default). Draft updates now write the document to the bare-id preview key with its `_id` normalized, and publishing invalidates the preview entry as well as priming production, since publishing removes the draft.

Deletes were separately broken. Sanity's default webhook projection is "the whole document after the change", and a delete has no after-state, so a delete arrives with no document body. `parseWebhook` read draft status from `body._id`, which is absent, so every discarded draft was classified as `production`; the Redis handler then read the id from the same absent body and did nothing at all. The parser now takes draft status from the `sanity-document-id` header as well as the body, the normalized id is passed to handlers on the command, and the document type — also absent from a delete body — is recovered from the cached copy before it is evicted so the `document_ids_by_type` sets can be cleared.

Also fixes the truncated-payload re-fetch in `getData`, which built its Sanity client with no token and no perspective and so returned the published document (or `null` on a private dataset) for a truncated draft webhook.
