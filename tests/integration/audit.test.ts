/**
 * Audit resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('Audit Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('device', () => {
    it('should get full device audit', async () => {
      const audit = await client.audit.device('device-uid-001');

      expect(audit).toBeDefined();
      expect(audit.deviceUid).toBe('device-uid-001');
      expect(audit.hostname).toBe('DESKTOP-001');
      expect(audit.operatingSystem?.name).toBe('Windows 11 Pro');
      expect(audit.hardware?.manufacturer).toBe('Dell');
      expect(audit.hardware?.totalMemoryBytes).toBe(17179869184);
    });
  });

  describe('deviceSoftware', () => {
    it('should get device software inventory', async () => {
      const software = await client.audit.deviceSoftware('device-uid-001');

      expect(software).toHaveLength(3);
      expect(software[0]?.name).toBe('Microsoft Office 365');
      expect(software[1]?.name).toBe('Google Chrome');
    });
  });

  describe('deviceByMac', () => {
    it('should get device audit by MAC address', async () => {
      const audit = await client.audit.deviceByMac('AA:BB:CC:DD:EE:01');

      expect(audit.deviceUid).toBe('device-uid-001');
    });
  });

  describe('esxiHost', () => {
    it('should get ESXi host audit', async () => {
      const audit = await client.audit.esxiHost('device-esxi-001');

      expect(audit).toBeDefined();
      expect(audit.hostname).toBe('ESXI-HOST-01');
      expect(audit.version).toBe('8.0.0');
      expect(audit.virtualMachines).toHaveLength(2);
      expect(audit.virtualMachines?.[0]?.name).toBe('VM-DC01');
    });
  });

  describe('printer', () => {
    it('should get printer audit', async () => {
      const audit = await client.audit.printer('device-printer-001');

      expect(audit).toBeDefined();
      expect(audit.printerName).toBe('HP LaserJet Pro MFP');
      expect(audit.connectionType).toBe('network');
      expect(audit.supplyLevels).toHaveLength(4);
      expect(audit.pageCounts?.total).toBe(15420);
    });
  });
});
