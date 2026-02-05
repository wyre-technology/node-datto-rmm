/**
 * Configuration tests
 */

import { describe, it, expect } from 'vitest';
import {
  resolveConfig,
  PLATFORM_URLS,
  DEFAULT_RATE_LIMIT_CONFIG,
} from '../../src/config.js';

describe('Configuration', () => {
  describe('resolveConfig', () => {
    it('should resolve config with platform', () => {
      const config = resolveConfig({
        apiKey: 'key',
        apiSecretKey: 'secret',
        platform: 'merlot',
      });

      expect(config.apiUrl).toBe('https://merlot-api.centrastage.net');
      expect(config.apiKey).toBe('key');
      expect(config.apiSecretKey).toBe('secret');
      expect(config.timestamps).toBe('date');
      expect(config.rateLimit).toEqual(DEFAULT_RATE_LIMIT_CONFIG);
    });

    it('should resolve config with apiUrl', () => {
      const config = resolveConfig({
        apiKey: 'key',
        apiSecretKey: 'secret',
        apiUrl: 'https://custom.example.com',
      });

      expect(config.apiUrl).toBe('https://custom.example.com');
    });

    it('should prefer apiUrl over platform', () => {
      const config = resolveConfig({
        apiKey: 'key',
        apiSecretKey: 'secret',
        platform: 'merlot',
        apiUrl: 'https://custom.example.com',
      });

      expect(config.apiUrl).toBe('https://custom.example.com');
    });

    it('should throw error without platform or apiUrl', () => {
      expect(() =>
        resolveConfig({
          apiKey: 'key',
          apiSecretKey: 'secret',
        })
      ).toThrow('Either platform or apiUrl must be provided');
    });

    it('should use custom timestamp format', () => {
      const config = resolveConfig({
        apiKey: 'key',
        apiSecretKey: 'secret',
        platform: 'merlot',
        timestamps: 'iso',
      });

      expect(config.timestamps).toBe('iso');
    });

    it('should merge rate limit config with defaults', () => {
      const config = resolveConfig({
        apiKey: 'key',
        apiSecretKey: 'secret',
        platform: 'merlot',
        rateLimit: {
          maxRequests: 500,
        },
      });

      expect(config.rateLimit.maxRequests).toBe(500);
      expect(config.rateLimit.windowMs).toBe(60000); // default
    });
  });

  describe('PLATFORM_URLS', () => {
    it('should have all 6 platforms', () => {
      expect(Object.keys(PLATFORM_URLS)).toHaveLength(6);
      expect(PLATFORM_URLS.pinotage).toBe('https://pinotage-api.centrastage.net');
      expect(PLATFORM_URLS.merlot).toBe('https://merlot-api.centrastage.net');
      expect(PLATFORM_URLS.concord).toBe('https://concord-api.centrastage.net');
      expect(PLATFORM_URLS.vidal).toBe('https://vidal-api.centrastage.net');
      expect(PLATFORM_URLS.zinfandel).toBe('https://zinfandel-api.centrastage.net');
      expect(PLATFORM_URLS.syrah).toBe('https://syrah-api.centrastage.net');
    });
  });

  describe('DEFAULT_RATE_LIMIT_CONFIG', () => {
    it('should have correct defaults', () => {
      expect(DEFAULT_RATE_LIMIT_CONFIG).toEqual({
        enabled: true,
        maxRequests: 600,
        windowMs: 60000,
        throttleThreshold: 0.8,
        retryAfterMs: 5000,
        maxRetries: 3,
        ipBlockCooldownMs: 300000,
      });
    });
  });
});
