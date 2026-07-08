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

export interface EmailAuthRequest {
  email: string;
  /** 8–128 chars. */
  password: string;
  /** The calling device gets linked to the account. */
  deviceIdentifier: string;
}

export interface AuthUser {
  id: string;
  email: string;
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
