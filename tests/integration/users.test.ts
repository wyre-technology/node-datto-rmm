/**
 * Users resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('Users Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('resetApiKeys', () => {
    it('should reset API keys', async () => {
      const result = await client.users.resetApiKeys();

      expect(result).toBeDefined();
      expect(result.apiKey).toBe('new-api-key-12345');
      expect(result.apiSecretKey).toBe('new-api-secret-67890');
      expect(result.warning).toContain('invalidated');
    });
  });
});
