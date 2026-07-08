# Contracts Changelog

## 0.4.0 — 2026-07-07

Initial extraction from `flirt-api` (phases v0.1–v0.4):

- Enums: tones, intents, refine actions, plans, usage kinds, subscription
  environments, StoreKit product ids.
- Auth: device auth, email register/login (device-linked), refresh.
- AI: generate replies (3 suggestions, structured), refine.
- Users: me (nullable user), profile update (displayName/personality/historyOptIn).
- Usage: summary (used/limit/enforced/resetsAt).
- History: opt-in entries with suggestions.
- Subscriptions: verify (trust_client mode).
- Error envelope + error codes.
- JSON Schemas: model structured-output schema, key response shapes.
