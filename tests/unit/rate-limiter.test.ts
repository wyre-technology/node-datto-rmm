/**
 * Rate limiter tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RateLimiter } from '../../src/rate-limiter.js';
import { DattoRmmIpBlockedError } from '../../src/errors.js';
import type { RateLimitConfig } from '../../src/config.js';

describe('RateLimiter', () => {
  let config: RateLimitConfig;
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    config = {
      enabled: true,
      maxRequests: 600,
      windowMs: 60000,
      throttleThreshold: 0.8,
      retryAfterMs: 5000,
      maxRetries: 3,
      ipBlockCooldownMs: 300000,
    };
    rateLimiter = new RateLimiter(config);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getCurrentRate', () => {
    it('should return 0 with no requests', () => {
      expect(rateLimiter.getCurrentRate()).toBe(0);
    });

    it('should track requests correctly', () => {
      rateLimiter.recordRequest();
      rateLimiter.recordRequest();
      rateLimiter.recordRequest();

      expect(rateLimiter.getCurrentRate()).toBeCloseTo(3 / 600);
    });

    it('should expire old requests', () => {
      rateLimiter.recordRequest();
      rateLimiter.recordRequest();

      // Advance time past the window
      vi.advanceTimersByTime(61000);

      expect(rateLimiter.getCurrentRate()).toBe(0);
    });
  });

  describe('getRemainingRequests', () => {
    it('should return max with no requests', () => {
      expect(rateLimiter.getRemainingRequests()).toBe(600);
    });

    it('should decrease with requests', () => {
      rateLimiter.recordRequest();
      rateLimiter.recordRequest();

      expect(rateLimiter.getRemainingRequests()).toBe(598);
    });
  });

  describe('waitForSlot', () => {
    it('should not wait when rate limiting is disabled', async () => {
      const disabledConfig = { ...config, enabled: false };
      const disabledLimiter = new RateLimiter(disabledConfig);

      const start = Date.now();
      await disabledLimiter.waitForSlot();
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(10);
    });

    it('should throw when IP is blocked', async () => {
      rateLimiter.handleIpBlock();

      await expect(rateLimiter.waitForSlot()).rejects.toThrow(DattoRmmIpBlockedError);
    });

    it('should not throw after IP block expires', async () => {
      rateLimiter.handleIpBlock();

      // Advance past the cooldown period
      vi.advanceTimersByTime(300001);

      // Should not throw
      await expect(rateLimiter.waitForSlot()).resolves.toBeUndefined();
    });
  });

  describe('isIpBlocked', () => {
    it('should return false initially', () => {
      expect(rateLimiter.isIpBlocked()).toBe(false);
    });

    it('should return true after handleIpBlock', () => {
      rateLimiter.handleIpBlock();
      expect(rateLimiter.isIpBlocked()).toBe(true);
    });

    it('should return false after cooldown expires', () => {
      rateLimiter.handleIpBlock();

      vi.advanceTimersByTime(300001);

      expect(rateLimiter.isIpBlocked()).toBe(false);
    });
  });

  describe('calculateRetryDelay', () => {
    it('should calculate exponential backoff', () => {
      expect(rateLimiter.calculateRetryDelay(0)).toBe(5000);
      expect(rateLimiter.calculateRetryDelay(1)).toBe(10000);
      expect(rateLimiter.calculateRetryDelay(2)).toBe(20000);
    });

    it('should cap at 30 seconds', () => {
      expect(rateLimiter.calculateRetryDelay(10)).toBe(30000);
    });
  });

  describe('shouldRetry', () => {
    it('should allow retries within max', () => {
      expect(rateLimiter.shouldRetry(0)).toBe(true);
      expect(rateLimiter.shouldRetry(1)).toBe(true);
      expect(rateLimiter.shouldRetry(2)).toBe(true);
    });

    it('should not allow retries beyond max', () => {
      expect(rateLimiter.shouldRetry(3)).toBe(false);
      expect(rateLimiter.shouldRetry(4)).toBe(false);
    });
  });

  describe('recordRequest', () => {
    it('should do nothing when disabled', () => {
      const disabledConfig = { ...config, enabled: false };
      const disabledLimiter = new RateLimiter(disabledConfig);

      disabledLimiter.recordRequest();

      expect(disabledLimiter.getCurrentRate()).toBe(0);
    });
  });
});
