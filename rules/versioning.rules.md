# Versioning Rules

Contracts version tracks the API surface, not the app versions.

1. **Additive changes** (new optional field, new endpoint, new enum value the
   clients ignore gracefully) → bump **minor**, note in `versions/changelog.md`.
2. **Breaking changes** (removed/renamed field, type change, required-field
   addition, enum value removal) → **not allowed** while any installed iOS
   build depends on the old shape. Old app versions can't be force-upgraded —
   the API must keep serving them. Add a new field/endpoint instead and
   deprecate the old one in the changelog.
3. Every change here must be mirrored in:
   - `flirt-api` DTOs/validators (and its e2e tests)
   - `flirt-ios` `Shared/Models.swift`
   - `flirt-docs/API_ENDPOINTS.md`
4. `versions/current.json` records the contracts version the deployed API
   serves; update it in the same commit.
