/**
 * Jobs resource integration tests
 */

import { describe, it, expect } from 'vitest';
import { DattoRmmClient } from '../../src/client.js';

describe('Jobs Resource', () => {
  const client = new DattoRmmClient({
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    platform: 'merlot',
  });

  describe('get', () => {
    it('should get job details', async () => {
      const job = await client.jobs.get('job-uid-001');

      expect(job).toBeDefined();
      expect(job.uid).toBe('job-uid-001');
      expect(job.name).toBe('Restart Print Spooler');
      expect(job.status).toBe('completed');
      expect(job.completedDeviceCount).toBe(1);
    });
  });

  describe('results', () => {
    it('should get job results for a device', async () => {
      const result = await client.jobs.results('job-uid-001', 'device-uid-001');

      expect(result).toBeDefined();
      expect(result.jobUid).toBe('job-uid-001');
      expect(result.deviceUid).toBe('device-uid-001');
      expect(result.status).toBe('completed');
      expect(result.exitCode).toBe(0);
    });
  });

  describe('stdout', () => {
    it('should get job stdout', async () => {
      const stdout = await client.jobs.stdout('job-uid-001', 'device-uid-001');

      expect(stdout).toContain('Service "Spooler" restarted successfully');
      expect(stdout).toContain('Current status: Running');
    });
  });

  describe('stderr', () => {
    it('should get job stderr', async () => {
      const stderr = await client.jobs.stderr('job-uid-001', 'device-uid-001');

      expect(stderr).toBe('');
    });
  });

  describe('components', () => {
    it('should get job components', async () => {
      const components = await client.jobs.components('job-uid-001');

      expect(components).toHaveLength(1);
      expect(components[0]?.name).toBe('Restart Service');
      expect(components[0]?.variables?.serviceName).toBe('Spooler');
    });
  });
});
