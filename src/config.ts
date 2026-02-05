/**
 * Configuration types and defaults for the Datto RMM client
 */

/**
 * Datto RMM platform identifiers
 */
export type Platform = 'pinotage' | 'merlot' | 'concord' | 'vidal' | 'zinfandel' | 'syrah';

/**
 * Platform to API URL mapping
 */
export const PLATFORM_URLS: Record<Platform, string> = {
  pinotage: 'https://pinotage-api.centrastage.net',
  merlot: 'https://merlot-api.centrastage.net',
  concord: 'https://concord-api.centrastage.net',
  vidal: 'https://vidal-api.centrastage.net',
  zinfandel: 'https://zinfandel-api.centrastage.net',
  syrah: 'https://syrah-api.centrastage.net',
};

/**
 * Timestamp format options for responses
 * - 'date': Return JavaScript Date objects
 * - 'number': Return Unix timestamps in milliseconds
 * - 'iso': Return ISO 8601 strings
 */
export type TimestampFormat = 'date' | 'number' | 'iso';

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  /** Whether rate limiting is enabled (default: true) */
  enabled: boolean;
  /** Maximum requests per window (default: 600) */
  maxRequests: number;
  /** Window duration in milliseconds (default: 60000) */
  windowMs: number;
  /** Threshold percentage to start throttling (default: 0.8 = 80%) */
  throttleThreshold: number;
  /** Delay between retries on 429 (default: 5000ms) */
  retryAfterMs: number;
  /** Maximum retry attempts on rate limit errors (default: 3) */
  maxRetries: number;
  /** Cooldown duration when IP is blocked (default: 300000ms = 5 minutes) */
  ipBlockCooldownMs: number;
}

/**
 * Default rate limit configuration
 */
export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  enabled: true,
  maxRequests: 600,
  windowMs: 60_000,
  throttleThreshold: 0.8,
  retryAfterMs: 5_000,
  maxRetries: 3,
  ipBlockCooldownMs: 300_000,
};

/**
 * Configuration for the Datto RMM client
 */
export interface DattoRmmConfig {
  /** API Key for authentication */
  apiKey: string;
  /** API Secret Key for authentication */
  apiSecretKey: string;
  /** Platform identifier (determines API base URL) */
  platform?: Platform;
  /** Explicit API URL (alternative to platform) */
  apiUrl?: string;
  /** Timestamp format for responses (default: 'date') */
  timestamps?: TimestampFormat;
  /** Rate limiting configuration */
  rateLimit?: Partial<RateLimitConfig>;
}

/**
 * Resolved configuration with all defaults applied
 */
export interface ResolvedConfig {
  apiKey: string;
  apiSecretKey: string;
  apiUrl: string;
  timestamps: TimestampFormat;
  rateLimit: RateLimitConfig;
}

/**
 * Resolves a configuration object by applying defaults
 */
export function resolveConfig(config: DattoRmmConfig): ResolvedConfig {
  // Determine API URL
  let apiUrl: string;
  if (config.apiUrl) {
    apiUrl = config.apiUrl;
  } else if (config.platform) {
    apiUrl = PLATFORM_URLS[config.platform];
  } else {
    throw new Error('Either platform or apiUrl must be provided');
  }

  return {
    apiKey: config.apiKey,
    apiSecretKey: config.apiSecretKey,
    apiUrl,
    timestamps: config.timestamps ?? 'date',
    rateLimit: {
      ...DEFAULT_RATE_LIMIT_CONFIG,
      ...config.rateLimit,
    },
  };
}
