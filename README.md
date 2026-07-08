# flirt-contracts

Shared API, DTO, and schema contracts for **Flirt** — the single source of
truth for payload shapes between `flirt-api` and `flirt-ios`.
Structure mirrors `@signalix/contracts` (reference architecture).

```text
src/
  enums/     # tones, intents, plans, product ids, …
  api/       # request/response interfaces per endpoint
  errors/    # error envelope + error codes
schema/
  api.schema.json   # JSON Schemas (incl. the model structured-output schema)
rules/
  versioning.rules.md
versions/
  current.json      # contracts version the deployed API serves
  changelog.md
```

## Usage

```bash
npm install        # once
npm run typecheck  # validate
npm run build      # emit dist/ (types + js)
```

Consumers today keep **mirrored copies** (flirt-api DTOs, flirt-ios
`Shared/Models.swift`) — this repo is the arbiter when they disagree.
Direct npm consumption from `flirt-api` can come later (private registry or
git dependency).

## The one rule

**Never break an installed app.** iOS clients can't be force-upgraded; see
`rules/versioning.rules.md` before touching any shape.
