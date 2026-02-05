/**
 * Activity logs resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('Activity Logs Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('list', () => {
    it('should list activity logs', async () => {
      const response = await client.activityLogs.list();

      expect(response.pageDetails).toBeDefined();
      expect(response.activityLogs).toHaveLength(2);
      expect(response.activityLogs[0]?.activityType).toBe('device.alert.resolved');
    });

    it('should include user information', async () => {
      const response = await client.activityLogs.list();

      expect(response.activityLogs[0]?.user).toBe('admin@testmsp.com');
      expect(response.activityLogs[0]?.userEmail).toBe('admin@testmsp.com');
    });

    it('should include device information when applicable', async () => {
      const response = await client.activityLogs.list();

      expect(response.activityLogs[0]?.deviceUid).toBe('device-uid-001');
      expect(response.activityLogs[0]?.deviceHostname).toBe('DESKTOP-001');
    });
  });
});
