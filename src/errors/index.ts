/** Error envelope returned by every non-2xx flirt-api response. */
export interface ApiErrorBody {
  error: {
    code: ApiErrorCode | string;
    message: string;
  };
}

export const API_ERROR_CODES = [
  'rate_limited',
  'plan_limit_reached',
  'generation_failed',
  'email_taken',
  'invalid_credentials',
  'account_required',
  'unknown_product',
  'verification_unavailable',
] as const;
export type ApiErrorCode = (typeof API_ERROR_CODES)[number];
