# Contracts Changelog

## 0.5.0 — 2026-07-08 (additive)

- Auth: `RegisterRequest.username?` (handle, `/^[a-z0-9_]{3,30}$/`),
  `LoginRequest` accepts email OR username; `AuthUser.username`,
  `UserProfile.username`. New error codes: `username_taken`.
- BYOK: `PUT/GET/DELETE /users/ai-settings` (`UpsertAiSettingsRequest`,
  `AiSettingsView` — key stored encrypted, only masked view returned).
  `GenerateRepliesResponse.keySource: 'user_key' | 'system'`.
  New error codes: `unknown_provider`, `byok_unavailable`.
- `EmailAuthRequest` deprecated (alias of `RegisterRequest`).

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
