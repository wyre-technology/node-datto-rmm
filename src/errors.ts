/**
 * Custom error classes for the Datto RMM client
 */

/**
 * Base error class for all Datto RMM errors
 */
export class DattoRmmError extends Error {
  /** HTTP status code if applicable */
  readonly statusCode: number;
  /** Raw response data if available */
  readonly response: unknown;

  constructor(message: string, statusCode: number = 0, response?: unknown) {
    super(message);
    this.name = 'DattoRmmError';
    this.statusCode = statusCode;
    this.response = response;
    Object.setPrototypeOf(this, DattoRmmError.prototype);
  }
}

/**
 * Authentication error (400 bad credentials, 401 unauthorized)
 */
export class DattoRmmAuthenticationError extends DattoRmmError {
  constructor(message: string, statusCode: number = 401, response?: unknown) {
    super(message, statusCode, response);
    this.name = 'DattoRmmAuthenticationError';
    Object.setPrototypeOf(this, DattoRmmAuthenticationError.prototype);
  }
}

/**
 * Resource not found error (404)
 */
export class DattoRmmNotFoundError extends DattoRmmError {
  constructor(message: string, response?: unknown) {
    super(message, 404, response);
    this.name = 'DattoRmmNotFoundError';
    Object.setPrototypeOf(this, DattoRmmNotFoundError.prototype);
  }
}

/**
 * Rate limit exceeded error (429)
 */
export class DattoRmmRateLimitError extends DattoRmmError {
  /** Suggested retry delay in milliseconds */
  readonly retryAfter: number;

  constructor(message: string, retryAfter: number = 5000, response?: unknown) {
    super(message, 429, response);
    this.name = 'DattoRmmRateLimitError';
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, DattoRmmRateLimitError.prototype);
  }
}

/**
 * IP blocked error (403 due to rate limit escalation)
 */
export class DattoRmmIpBlockedError extends DattoRmmError {
  /** Time until the IP block is lifted in milliseconds */
  readonly cooldownMs: number;

  constructor(message: string, cooldownMs: number = 300000, response?: unknown) {
    super(message, 403, response);
    this.name = 'DattoRmmIpBlockedError';
    this.cooldownMs = cooldownMs;
    Object.setPrototypeOf(this, DattoRmmIpBlockedError.prototype);
  }
}

/**
 * Forbidden error (403 permission denied)
 */
export class DattoRmmForbiddenError extends DattoRmmError {
  constructor(message: string, response?: unknown) {
    super(message, 403, response);
    this.name = 'DattoRmmForbiddenError';
    Object.setPrototypeOf(this, DattoRmmForbiddenError.prototype);
  }
}

/**
 * Server error (500+)
 */
export class DattoRmmServerError extends DattoRmmError {
  constructor(message: string, statusCode: number = 500, response?: unknown) {
    super(message, statusCode, response);
    this.name = 'DattoRmmServerError';
    Object.setPrototypeOf(this, DattoRmmServerError.prototype);
  }
}
