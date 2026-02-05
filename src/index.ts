/**
 * node-datto-rmm
 * Comprehensive, fully-typed Node.js/TypeScript library for the Datto RMM API v2
 */

// Main client
export { DattoRmmClient } from './client.js';

// Configuration
export type { DattoRmmConfig, Platform, TimestampFormat, RateLimitConfig } from './config.js';
export { PLATFORM_URLS, DEFAULT_RATE_LIMIT_CONFIG } from './config.js';

// Error classes
export {
  DattoRmmError,
  DattoRmmAuthenticationError,
  DattoRmmNotFoundError,
  DattoRmmRateLimitError,
  DattoRmmIpBlockedError,
  DattoRmmForbiddenError,
  DattoRmmServerError,
} from './errors.js';

// Types
export * from './types/index.js';
