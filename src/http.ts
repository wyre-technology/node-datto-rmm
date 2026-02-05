/**
 * HTTP layer for the Datto RMM API
 */

import type { ResolvedConfig } from './config.js';
import type { AuthManager } from './auth.js';
import type { RateLimiter } from './rate-limiter.js';
import {
  DattoRmmError,
  DattoRmmAuthenticationError,
  DattoRmmNotFoundError,
  DattoRmmRateLimitError,
  DattoRmmIpBlockedError,
  DattoRmmForbiddenError,
  DattoRmmServerError,
} from './errors.js';

/**
 * HTTP request options
 */
export interface RequestOptions {
  /** HTTP method */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Request body (will be JSON stringified) */
  body?: unknown;
  /** URL query parameters */
  params?: Record<string, string | number | boolean | undefined>;
  /** Skip authentication (for token endpoint) */
  skipAuth?: boolean;
}

/**
 * HTTP client for making authenticated requests to the Datto RMM API
 */
export class HttpClient {
  private readonly config: ResolvedConfig;
  private readonly authManager: AuthManager;
  private readonly rateLimiter: RateLimiter;

  constructor(config: ResolvedConfig, authManager: AuthManager, rateLimiter: RateLimiter) {
    this.config = config;
    this.authManager = authManager;
    this.rateLimiter = rateLimiter;
  }

  /**
   * Make an authenticated request to the API
   */
  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, params, skipAuth = false } = options;

    // Build the URL
    let url = `${this.config.apiUrl}/api/v2${path}`;
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.executeRequest<T>(url, method, body, skipAuth);
  }

  /**
   * Make a request to a full URL (for pagination)
   */
  async requestUrl<T>(url: string): Promise<T> {
    return this.executeRequest<T>(url, 'GET', undefined, false);
  }

  /**
   * Execute the request with retry logic
   */
  private async executeRequest<T>(
    url: string,
    method: string,
    body: unknown,
    skipAuth: boolean,
    retryCount: number = 0,
    isRetryAfter401: boolean = false
  ): Promise<T> {
    // Wait for a rate limit slot
    await this.rateLimiter.waitForSlot();

    // Get the auth token
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (!skipAuth) {
      const token = await this.authManager.getToken();
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Record the request
    this.rateLimiter.recordRequest();

    // Make the request
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Handle the response
    return this.handleResponse<T>(response, url, method, body, skipAuth, retryCount, isRetryAfter401);
  }

  /**
   * Handle the response and errors
   */
  private async handleResponse<T>(
    response: Response,
    url: string,
    method: string,
    body: unknown,
    skipAuth: boolean,
    retryCount: number,
    isRetryAfter401: boolean
  ): Promise<T> {
    if (response.ok) {
      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return response.json() as Promise<T>;
      }
      // Return empty object for non-JSON responses
      return {} as T;
    }

    // Get response body for error details
    let responseBody: unknown;
    try {
      responseBody = await response.json();
    } catch {
      responseBody = await response.text();
    }

    switch (response.status) {
      case 400:
        throw new DattoRmmAuthenticationError(
          'Bad request - invalid credentials or parameters',
          400,
          responseBody
        );

      case 401:
        // If this is already a retry after 401, don't retry again
        if (isRetryAfter401) {
          throw new DattoRmmAuthenticationError(
            'Authentication failed after token refresh',
            401,
            responseBody
          );
        }
        // Try to refresh the token and retry once
        await this.authManager.refreshToken();
        return this.executeRequest<T>(url, method, body, skipAuth, retryCount, true);

      case 403:
        // Distinguish between IP block (rate limit) and permission denied
        // IP blocks typically happen after persistent 429s
        if (this.isIpBlockResponse(responseBody)) {
          this.rateLimiter.handleIpBlock();
          throw new DattoRmmIpBlockedError(
            'IP has been blocked due to rate limit violations',
            this.config.rateLimit.ipBlockCooldownMs,
            responseBody
          );
        }
        throw new DattoRmmForbiddenError('Access forbidden', responseBody);

      case 404:
        throw new DattoRmmNotFoundError('Resource not found', responseBody);

      case 429:
        // Rate limited - retry with backoff
        if (this.rateLimiter.shouldRetry(retryCount)) {
          const delay = this.rateLimiter.calculateRetryDelay(retryCount);
          this.rateLimiter.handleRateLimitError(retryCount);
          await this.sleep(delay);
          return this.executeRequest<T>(url, method, body, skipAuth, retryCount + 1, isRetryAfter401);
        }
        throw new DattoRmmRateLimitError(
          'Rate limit exceeded and max retries reached',
          this.config.rateLimit.retryAfterMs,
          responseBody
        );

      default:
        if (response.status >= 500) {
          // Server error - retry once
          if (retryCount === 0) {
            await this.sleep(1000);
            return this.executeRequest<T>(url, method, body, skipAuth, 1, isRetryAfter401);
          }
          throw new DattoRmmServerError(
            `Server error: ${response.status} ${response.statusText}`,
            response.status,
            responseBody
          );
        }
        throw new DattoRmmError(
          `Request failed: ${response.status} ${response.statusText}`,
          response.status,
          responseBody
        );
    }
  }

  /**
   * Check if a 403 response indicates an IP block
   */
  private isIpBlockResponse(responseBody: unknown): boolean {
    // Datto RMM typically returns specific error messages for IP blocks
    // This is a heuristic check
    if (typeof responseBody === 'object' && responseBody !== null) {
      const body = responseBody as Record<string, unknown>;
      const message = body['message'] ?? body['error'] ?? '';
      if (typeof message === 'string') {
        return message.toLowerCase().includes('rate') || message.toLowerCase().includes('blocked');
      }
    }
    return false;
  }

  /**
   * Sleep for a given duration
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
