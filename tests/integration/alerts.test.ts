/**
 * Alerts resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('Alerts Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('get', () => {
    it('should get an alert by UID', async () => {
      const alert = await client.alerts.get('alert-uid-001');

      expect(alert).toBeDefined();
      expect(alert.alertUid).toBe('alert-uid-001');
      expect(alert.deviceUid).toBe('device-uid-001');
      expect(alert.priority).toBe('High');
      expect(alert.alertContext?.['@class']).toBe('perf_disk_usage_ctx');
    });

    it('should include typed alert context', async () => {
      const alert = await client.alerts.get('alert-uid-001');

      const context = alert.alertContext;
      if (context?.['@class'] === 'perf_disk_usage_ctx') {
        expect(context.drive).toBe('C:');
        expect(context.usagePercent).toBe(90);
        expect(context.threshold).toBe(85);
      }
    });
  });

  describe('resolve', () => {
    it('should resolve an alert', async () => {
      const result = await client.alerts.resolve('alert-uid-001');

      expect(result.alertUid).toBe('alert-uid-001');
      expect(result.success).toBe(true);
      expect(result.resolvedAt).toBeDefined();
    });
  });

  describe('mute', () => {
    it('should mute an alert (deprecated)', async () => {
      const result = await client.alerts.mute('alert-uid-001');

      expect(result.alertUid).toBe('alert-uid-001');
      expect(result.success).toBe(true);
    });
  });

  describe('unmute', () => {
    it('should unmute an alert (deprecated)', async () => {
      const result = await client.alerts.unmute('alert-uid-001');

      expect(result.alertUid).toBe('alert-uid-001');
      expect(result.success).toBe(true);
    });
  });
});
