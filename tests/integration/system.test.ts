/**
 * System resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('System Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('status', () => {
    it('should get system status', async () => {
      const status = await client.system.status();

      expect(status).toBeDefined();
      expect(status.status).toBe('operational');
      expect(status.version).toBe('2.0.0');
    });
  });

  describe('requestRate', () => {
    it('should get request rate info', async () => {
      const rate = await client.system.requestRate();

      expect(rate).toBeDefined();
      expect(rate.requestCount).toBe(150);
      expect(rate.maxRequests).toBe(600);
      expect(rate.remaining).toBe(450);
    });
  });

  describe('pagination', () => {
    it('should get pagination info', async () => {
      const pagination = await client.system.pagination();

      expect(pagination).toBeDefined();
      expect(pagination.defaultPageSize).toBe(50);
      expect(pagination.maxPageSize).toBe(250);
    });
  });
});
