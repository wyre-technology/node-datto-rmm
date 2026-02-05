/**
 * Filters resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('Filters Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('defaults', () => {
    it('should get default filters', async () => {
      const filters = await client.filters.defaults();

      expect(filters).toHaveLength(3);
      expect(filters[0]?.name).toBe('All Devices');
      expect(filters[0]?.type).toBe('default');
    });
  });

  describe('custom', () => {
    it('should get custom filters', async () => {
      const filters = await client.filters.custom();

      expect(filters).toHaveLength(2);
      expect(filters[0]?.name).toBe('Critical Servers');
      expect(filters[0]?.type).toBe('custom');
      expect(filters[0]?.criteria).toBeDefined();
    });
  });
});
