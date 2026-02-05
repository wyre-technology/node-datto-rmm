/**
 * Alert context type tests
 */

import { describe, it, expect } from 'vitest';
import {
  isAlertContextType,
  ALERT_CONTEXT_TYPES,
  type DiskUsageAlertContext,
  type EventLogAlertContext,
  type AlertContext,
} from '../../src/types/alert-contexts.js';

describe('Alert Contexts', () => {
  describe('isAlertContextType', () => {
    it('should correctly identify disk usage context', () => {
      const context: AlertContext = {
        '@class': 'perf_disk_usage_ctx',
        drive: 'C:',
        threshold: 85,
        usagePercent: 90,
        freeSpaceBytes: 10737418240,
      };

      expect(isAlertContextType<DiskUsageAlertContext>(context, 'perf_disk_usage_ctx')).toBe(true);
      expect(isAlertContextType<EventLogAlertContext>(context, 'eventlog_ctx')).toBe(false);
    });

    it('should correctly identify event log context', () => {
      const context: AlertContext = {
        '@class': 'eventlog_ctx',
        eventLogSource: 'Application',
        eventLogId: 1001,
        eventLogType: 'Error',
        eventLogMessage: 'Test error',
      };

      expect(isAlertContextType<EventLogAlertContext>(context, 'eventlog_ctx')).toBe(true);
      expect(isAlertContextType<DiskUsageAlertContext>(context, 'perf_disk_usage_ctx')).toBe(false);
    });
  });

  describe('ALERT_CONTEXT_TYPES', () => {
    it('should have all 23 context types', () => {
      expect(Object.keys(ALERT_CONTEXT_TYPES)).toHaveLength(23);
    });

    it('should map class names to human-readable names', () => {
      expect(ALERT_CONTEXT_TYPES['eventlog_ctx']).toBe('Event Log');
      expect(ALERT_CONTEXT_TYPES['perf_disk_usage_ctx']).toBe('Disk Usage');
      expect(ALERT_CONTEXT_TYPES['srvc_status_ctx']).toBe('Service Status');
      expect(ALERT_CONTEXT_TYPES['online_offline_status_ctx']).toBe('Online Status');
      expect(ALERT_CONTEXT_TYPES['ransomware_ctx']).toBe('Ransomware');
    });
  });

  describe('Type safety', () => {
    it('should allow type narrowing with type guard', () => {
      const context: AlertContext = {
        '@class': 'perf_disk_usage_ctx',
        drive: 'C:',
        threshold: 85,
        usagePercent: 90,
        freeSpaceBytes: 10737418240,
      };

      if (isAlertContextType<DiskUsageAlertContext>(context, 'perf_disk_usage_ctx')) {
        // TypeScript should know this is a DiskUsageAlertContext
        expect(context.drive).toBe('C:');
        expect(context.usagePercent).toBe(90);
      }
    });
  });
});
