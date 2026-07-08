import {
  Intent,
  Plan,
  RefineAction,
  SubscriptionEnvironment,
  Tone,
} from '../enums';

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface DeviceAuthRequest {
  /** 8–128 chars, stable per install (identifierForVendor). */
  deviceIdentifier: string;
  platform: 'ios';
}

export interface RegisterRequest {
  email: string;
  /** 8–128 chars. */
  password: string;
  /** Optional handle: /^[a-z0-9_]{3,30}$/ (added 0.5.0). */
  username?: string;
  /** The calling device gets linked to the account. */
  deviceIdentifier: string;
}

/** Login with email OR username — at least one (username added 0.5.0). */
export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
  deviceIdentifier: string;
}

/** @deprecated 0.5.0 — use RegisterRequest / LoginRequest. */
export type EmailAuthRequest = RegisterRequest;

export interface AuthUser {
  id: string;
  email: string;
  /** null when the account has no handle (added 0.5.0). */
  username: string | null;
  plan: Plan;
}

export interface TokenPairResponse {
  accessToken: string;
  refreshToken: string;
  deviceId: string;
  /** Present on /auth/register and /auth/login; absent on /auth/device. */
  user?: AuthUser;
}

export interface RefreshRequest {
  refreshToken: string;
}

// ---------------------------------------------------------------------------
// AI
// ---------------------------------------------------------------------------

export interface GenerateRepliesRequest {
  /** 1–2000 chars. */
  message: string;
  tone: Tone;
  intent: Exclude<Intent, 'refine'>;
  context?: {
    appHint?: string;
    history?: string[];
  };
}

export interface Suggestion {
  text: string;
  style: string;
}

export interface GenerateRepliesResponse {
  tone: Tone;
  intent: Intent;
  /** Exactly 3 for intent=reply. */
  suggestions: Suggestion[];
  provider: string;
  model: string;
  /** BYOK: whose key served this request (added 0.5.0). */
  keySource: 'user_key' | 'system';
}

export interface RefineRequest {
  /** 1–2000 chars. */
  text: string;
  action: RefineAction;
}

export interface RefineResponse {
  text: string;
  style: string;
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export interface UserProfile {
  id: string;
  email: string;
  /** Added 0.5.0. */
  username: string | null;
  displayName: string | null;
  plan: Plan;
  personality: Record<string, unknown> | null;
  historyOptIn: boolean;
}

export interface MeResponse {
  /** null for anonymous devices. */
  user: UserProfile | null;
}

export interface UpdateProfileRequest {
  displayName?: string;
  personality?: Record<string, unknown>;
  historyOptIn?: boolean;
}

// ---------------------------------------------------------------------------
// Usage
// ---------------------------------------------------------------------------

export interface UsageSummary {
  plan: Plan;
  /** Generations + refines today (UTC day). */
  used: number;
  /** null = unlimited (paid plans). */
  limit: number | null;
  /** false during the powerful-MVP phase. */
  enforced: boolean;
  /** ISO-8601 — next UTC midnight. */
  resetsAt: string;
}

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------

export interface HistoryEntry {
  id: string;
  message: string;
  tone: Tone;
  suggestions: Suggestion[];
  createdAt: string;
}

export interface HistoryResponse {
  entries: HistoryEntry[];
}

// ---------------------------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------------------------

export interface VerifySubscriptionRequest {
  transactionId: string;
  productId: string;
  environment: SubscriptionEnvironment;
  /** ISO-8601. */
  expiresAt?: string;
}

export interface VerifySubscriptionResponse {
  plan: Plan;
  status: 'active';
  expiresAt: string | null;
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------

export interface HealthResponse {
  status: 'ok';
}

// ---------------------------------------------------------------------------
// AI settings — BYOK (added 0.5.0)
// ---------------------------------------------------------------------------

export type UserSelectableProvider = 'openai' | 'anthropic' | 'gemini';

export interface UpsertAiSettingsRequest {
  provider: UserSelectableProvider;
  /** Stored encrypted at rest; never echoed back. */
  apiKey: string;
  model?: string;
}

export interface AiSettingsView {
  provider: UserSelectableProvider;
  model: string | null;
  /** e.g. "sk-a…mnop" — the full key is never returned. */
  apiKeyMasked: string;
}

export interface AiSettingsResponse {
  settings: AiSettingsView | null;
}
