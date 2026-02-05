/**
 * Client tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';
import { PLATFORM_URLS } from '../../src/config.js';

describe('DattoRmmClient', () => {
  describe('constructor', () => {
    it('should create a client with platform', () => {
      const client = new DattoRmmClient({
        apiKey: 'test-api-key',
        apiSecretKey: 'test-api-secret',
        platform: 'merlot',
      });

      const config = client.getConfig();
      expect(config.apiUrl).toBe(PLATFORM_URLS.merlot);
      expect(config.apiKey).toBe('test-api-key');
      expect(config.apiSecretKey).toBe('test-api-secret');
    });

    it('should create a client with explicit apiUrl', () => {
      const client = new DattoRmmClient({
        apiKey: 'test-api-key',
        apiSecretKey: 'test-api-secret',
        apiUrl: 'https://custom-api.example.com',
      });

      const config = client.getConfig();
      expect(config.apiUrl).toBe('https://custom-api.example.com');
    });

    it('should throw error if neither platform nor apiUrl is provided', () => {
      expect(() => {
        new DattoRmmClient({
          apiKey: 'test-api-key',
          apiSecretKey: 'test-api-secret',
        });
      }).toThrow('Either platform or apiUrl must be provided');
    });

    it('should use default timestamp format', () => {
      const client = new DattoRmmClient({
        apiKey: 'test-api-key',
        apiSecretKey: 'test-api-secret',
        platform: 'merlot',
      });

      const config = client.getConfig();
      expect(config.timestamps).toBe('date');
    });

    it('should accept custom timestamp format', () => {
      const client = new DattoRmmClient({
        apiKey: 'test-api-key',
        apiSecretKey: 'test-api-secret',
        platform: 'merlot',
        timestamps: 'iso',
      });

      const config = client.getConfig();
      expect(config.timestamps).toBe('iso');
    });

    it('should have all resource properties', () => {
      const client = new DattoRmmClient({
        apiKey: 'test-api-key',
        apiSecretKey: 'test-api-secret',
        platform: 'merlot',
      });

      expect(client.account).toBeDefined();
      expect(client.sites).toBeDefined();
      expect(client.devices).toBeDefined();
      expect(client.alerts).toBeDefined();
      expect(client.audit).toBeDefined();
      expect(client.jobs).toBeDefined();
      expect(client.filters).toBeDefined();
      expect(client.system).toBeDefined();
      expect(client.users).toBeDefined();
      expect(client.activityLogs).toBeDefined();
    });
  });

  describe('platform URL mapping', () => {
    const platforms: Array<{ platform: 'pinotage' | 'merlot' | 'concord' | 'vidal' | 'zinfandel' | 'syrah'; expectedUrl: string }> = [
      { platform: 'pinotage', expectedUrl: 'https://pinotage-api.centrastage.net' },
      { platform: 'merlot', expectedUrl: 'https://merlot-api.centrastage.net' },
      { platform: 'concord', expectedUrl: 'https://concord-api.centrastage.net' },
      { platform: 'vidal', expectedUrl: 'https://vidal-api.centrastage.net' },
      { platform: 'zinfandel', expectedUrl: 'https://zinfandel-api.centrastage.net' },
      { platform: 'syrah', expectedUrl: 'https://syrah-api.centrastage.net' },
    ];

    for (const { platform, expectedUrl } of platforms) {
      it(`should map ${platform} to correct URL`, () => {
        const client = new DattoRmmClient({
          apiKey: 'test-api-key',
          apiSecretKey: 'test-api-secret',
          platform,
        });

        expect(client.getConfig().apiUrl).toBe(expectedUrl);
      });
    }
  });
});
