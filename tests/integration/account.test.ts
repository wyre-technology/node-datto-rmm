/**
 * Account resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('Account Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('get', () => {
    it('should get account information', async () => {
      const account = await client.account.get();

      expect(account).toBeDefined();
      expect(account.uid).toBe('account-uid-12345');
      expect(account.name).toBe('Test MSP Account');
      expect(account.siteCount).toBe(5);
      expect(account.deviceCount).toBe(150);
    });
  });

  describe('users', () => {
    it('should list account users', async () => {
      const response = await client.account.users();

      expect(response.pageDetails).toBeDefined();
      expect(response.users).toHaveLength(2);
      expect(response.users[0]?.username).toBe('admin@testmsp.com');
    });
  });

  describe('sites', () => {
    it('should list account sites', async () => {
      const response = await client.account.sites();

      expect(response.pageDetails).toBeDefined();
      expect(response.sites).toHaveLength(2);
      expect(response.sites[0]?.name).toBe('Headquarters');
    });

    it('should list all sites with pagination', async () => {
      const sites = await client.account.sitesAll().toArray();

      // Page 1 has 2 sites, page 2 has 1 site
      expect(sites).toHaveLength(3);
      expect(sites[0]?.name).toBe('Headquarters');
      expect(sites[2]?.name).toBe('Remote Office');
    });
  });

  describe('devices', () => {
    it('should list account devices', async () => {
      const response = await client.account.devices();

      expect(response.pageDetails).toBeDefined();
      expect(response.devices).toHaveLength(2);
      expect(response.devices[0]?.hostname).toBe('DESKTOP-001');
    });

    it('should list all devices with pagination', async () => {
      const devices = await client.account.devicesAll().toArray();

      // Page 1 has 2 devices, page 2 has 1 device
      expect(devices).toHaveLength(3);
      expect(devices[0]?.hostname).toBe('DESKTOP-001');
      expect(devices[2]?.hostname).toBe('LAPTOP-001');
    });
  });

  describe('components', () => {
    it('should list account components', async () => {
      const response = await client.account.components();

      expect(response.pageDetails).toBeDefined();
      expect(response.components).toHaveLength(2);
      expect(response.components[0]?.name).toBe('Restart Service');
    });
  });

  describe('alertsOpen', () => {
    it('should list open alerts', async () => {
      const response = await client.account.alertsOpen();

      expect(response.pageDetails).toBeDefined();
      expect(response.alerts).toHaveLength(2);
      expect(response.alerts[0]?.priority).toBe('High');
      expect(response.alerts[0]?.alertContext?.['@class']).toBe('perf_disk_usage_ctx');
    });
  });

  describe('alertsResolved', () => {
    it('should list resolved alerts', async () => {
      const response = await client.account.alertsResolved();

      expect(response.pageDetails).toBeDefined();
      expect(response.alerts).toHaveLength(1);
      expect(response.alerts[0]?.resolvedBy).toBe('admin@testmsp.com');
    });
  });

  describe('variables', () => {
    it('should list account variables', async () => {
      const variables = await client.account.variables();

      expect(variables).toHaveLength(2);
      expect(variables[0]?.name).toBe('BackupServer');
      expect(variables[1]?.masked).toBe(true);
    });

    it('should create a variable', async () => {
      const variable = await client.account.createVariable({
        name: 'NewVariable',
        value: 'test-value',
      });

      expect(variable.name).toBe('NewVariable');
      expect(variable.value).toBe('test-value');
    });

    it('should update a variable', async () => {
      const variable = await client.account.updateVariable('var-001', {
        value: '192.168.1.201',
      });

      expect(variable.value).toBe('192.168.1.201');
    });

    it('should delete a variable', async () => {
      // Should not throw
      await expect(client.account.deleteVariable('var-001')).resolves.toBeUndefined();
    });
  });
});
