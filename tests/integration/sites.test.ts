/**
 * Sites resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('Sites Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('get', () => {
    it('should get a site by UID', async () => {
      const site = await client.sites.get('site-uid-001');

      expect(site).toBeDefined();
      expect(site.uid).toBe('site-uid-001');
      expect(site.name).toBe('Headquarters');
      expect(site.devicesCount).toBe(50);
    });
  });

  describe('create', () => {
    it('should create a new site', async () => {
      const site = await client.sites.create({
        name: 'New Site',
        description: 'A new site',
      });

      expect(site.uid).toBe('site-uid-new');
      expect(site.name).toBe('New Site');
    });
  });

  describe('update', () => {
    it('should update a site', async () => {
      const site = await client.sites.update('site-uid-001', {
        name: 'Headquarters Updated',
      });

      expect(site.name).toBe('Headquarters Updated');
    });
  });

  describe('devices', () => {
    it('should list devices for a site', async () => {
      const response = await client.sites.devices('site-uid-001');

      expect(response.devices).toHaveLength(2);
      expect(response.devices[0]?.hostname).toBe('DESKTOP-001');
    });
  });

  describe('settings', () => {
    it('should get site settings', async () => {
      const settings = await client.sites.settings('site-uid-001');

      expect(settings.siteUid).toBe('site-uid-001');
      expect(settings.patchManagement).toBe(true);
      expect(settings.maintenanceWindow?.enabled).toBe(true);
    });
  });

  describe('filters', () => {
    it('should get site filters', async () => {
      const filters = await client.sites.filters('site-uid-001');

      expect(filters).toHaveLength(1);
      expect(filters[0]?.name).toBe('Windows Servers');
    });
  });

  describe('alertsOpen', () => {
    it('should list open alerts for a site', async () => {
      const response = await client.sites.alertsOpen('site-uid-001');

      expect(response.alerts).toHaveLength(1);
    });
  });

  describe('variables', () => {
    it('should list site variables', async () => {
      const variables = await client.sites.variables('site-uid-001');

      expect(variables).toHaveLength(1);
      expect(variables[0]?.name).toBe('LocalDC');
    });
  });
});
