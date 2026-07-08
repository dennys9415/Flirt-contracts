/** Reply tones — must stay in sync with flirt-api prompts and the iOS Tone enum. */
export const TONES = [
  'light_flirt',
  'deep_flirt',
  'funny',
  'confident',
  'professional',
] as const;
export type Tone = (typeof TONES)[number];

export const INTENTS = ['reply', 'rewrite', 'refine'] as const;
export type Intent = (typeof INTENTS)[number];

export const REFINE_ACTIONS = ['shorter', 'funnier', 'more_direct'] as const;
export type RefineAction = (typeof REFINE_ACTIONS)[number];

export const PLANS = ['free', 'pro', 'premium'] as const;
export type Plan = (typeof PLANS)[number];

export const USAGE_KINDS = ['reply_generate', 'refine'] as const;
export type UsageKind = (typeof USAGE_KINDS)[number];

export const SUBSCRIPTION_ENVIRONMENTS = [
  'storekit_test',
  'sandbox',
  'production',
] as const;
export type SubscriptionEnvironment = (typeof SUBSCRIPTION_ENVIRONMENTS)[number];

/** StoreKit product ids (see Flirt-ios/Flirt/Flirt.storekit). */
export const PRODUCT_IDS = {
  proMonthly: 'com.singularitybox.flirt.pro.monthly',
  premiumMonthly: 'com.singularitybox.flirt.premium.monthly',
} as const;
