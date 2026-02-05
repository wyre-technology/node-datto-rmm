/**
 * Jobs fixtures
 */

export const get = {
  job: {
    uid: 'job-uid-001',
    name: 'Restart Print Spooler',
    status: 'completed',
    type: 'quickjob',
    priority: 5,
    componentUid: 'component-uid-001',
    componentName: 'Restart Service',
    deviceCount: 1,
    completedDeviceCount: 1,
    failedDeviceCount: 0,
    createdAt: 1706745000000,
    startedAt: 1706745060000,
    completedAt: 1706745120000,
    createdBy: 'admin@testmsp.com',
    schedule: {
      type: 'immediate',
    },
  },
};

export const getActive = {
  job: {
    uid: 'job-uid-002',
    name: 'Software Installation',
    status: 'active',
    type: 'scheduled',
    deviceCount: 10,
    completedDeviceCount: 3,
    failedDeviceCount: 0,
    createdAt: 1706745000000,
    startedAt: 1706745060000,
  },
};

export const results = {
  result: {
    jobUid: 'job-uid-001',
    deviceUid: 'device-uid-001',
    hostname: 'DESKTOP-001',
    status: 'completed',
    exitCode: 0,
    startedAt: 1706745060000,
    completedAt: 1706745120000,
    durationSeconds: 60,
  },
};

export const stdout = {
  stdout: 'Service "Spooler" restarted successfully.\nCurrent status: Running\n',
};

export const stderr = {
  stderr: '',
};

export const components = {
  components: [
    {
      uid: 'component-uid-001',
      name: 'Restart Service',
      type: 'powershell',
      category: 'Maintenance',
      variables: {
        serviceName: 'Spooler',
      },
    },
  ],
};
