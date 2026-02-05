/**
 * Account fixtures
 */

export const data = {
  account: {
    uid: 'account-uid-12345',
    name: 'Test MSP Account',
    description: 'Test account for unit testing',
    siteCount: 5,
    deviceCount: 150,
    createdAt: 1704067200000,
    modifiedAt: 1706745600000,
  },
};

export const users = {
  pageDetails: {
    count: 2,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: null,
  },
  users: [
    {
      uid: 'user-uid-001',
      username: 'admin@testmsp.com',
      email: 'admin@testmsp.com',
      firstName: 'Admin',
      lastName: 'User',
      active: true,
      role: 'Administrator',
      lastLoginAt: 1706745600000,
      createdAt: 1704067200000,
    },
    {
      uid: 'user-uid-002',
      username: 'tech@testmsp.com',
      email: 'tech@testmsp.com',
      firstName: 'Tech',
      lastName: 'Support',
      active: true,
      role: 'Technician',
      lastLoginAt: 1706659200000,
      createdAt: 1704153600000,
    },
  ],
};

export const sitesPage1 = {
  pageDetails: {
    count: 2,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: 'https://merlot-api.centrastage.net/api/v2/account/sites?page=2',
  },
  sites: [
    {
      uid: 'site-uid-001',
      name: 'Headquarters',
      description: 'Main office location',
      devicesCount: 50,
      onlineDevices: 45,
      offlineDevices: 5,
      openAlerts: 3,
      createdAt: 1704067200000,
    },
    {
      uid: 'site-uid-002',
      name: 'Branch Office',
      description: 'Secondary office',
      devicesCount: 25,
      onlineDevices: 24,
      offlineDevices: 1,
      openAlerts: 1,
      createdAt: 1704153600000,
    },
  ],
};

export const sitesPage2 = {
  pageDetails: {
    count: 1,
    page: 2,
    prevPageUrl: 'https://merlot-api.centrastage.net/api/v2/account/sites?page=1',
    nextPageUrl: null,
  },
  sites: [
    {
      uid: 'site-uid-003',
      name: 'Remote Office',
      description: 'Remote location',
      devicesCount: 10,
      onlineDevices: 9,
      offlineDevices: 1,
      openAlerts: 0,
      createdAt: 1704240000000,
    },
  ],
};

export const devicesPage1 = {
  pageDetails: {
    count: 2,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: 'https://merlot-api.centrastage.net/api/v2/account/devices?page=2',
  },
  devices: [
    {
      uid: 'device-uid-001',
      id: 1001,
      siteUid: 'site-uid-001',
      siteName: 'Headquarters',
      hostname: 'DESKTOP-001',
      deviceType: 'desktop',
      operatingSystem: 'Windows 11 Pro',
      operatingSystemFamily: 'windows',
      isOnline: true,
      lastSeenAt: 1706745600000,
      ipAddresses: ['192.168.1.100'],
      macAddresses: ['AA:BB:CC:DD:EE:01'],
      agentVersion: '2.0.1.234',
    },
    {
      uid: 'device-uid-002',
      id: 1002,
      siteUid: 'site-uid-001',
      siteName: 'Headquarters',
      hostname: 'SERVER-001',
      deviceType: 'server',
      operatingSystem: 'Windows Server 2022',
      operatingSystemFamily: 'windows',
      isOnline: true,
      lastSeenAt: 1706745600000,
      ipAddresses: ['192.168.1.10'],
      macAddresses: ['AA:BB:CC:DD:EE:02'],
      agentVersion: '2.0.1.234',
    },
  ],
};

export const devicesPage2 = {
  pageDetails: {
    count: 1,
    page: 2,
    prevPageUrl: 'https://merlot-api.centrastage.net/api/v2/account/devices?page=1',
    nextPageUrl: null,
  },
  devices: [
    {
      uid: 'device-uid-003',
      id: 1003,
      siteUid: 'site-uid-002',
      siteName: 'Branch Office',
      hostname: 'LAPTOP-001',
      deviceType: 'laptop',
      operatingSystem: 'Windows 11 Pro',
      operatingSystemFamily: 'windows',
      isOnline: false,
      lastSeenAt: 1706659200000,
      ipAddresses: ['192.168.2.50'],
      macAddresses: ['AA:BB:CC:DD:EE:03'],
      agentVersion: '2.0.1.234',
    },
  ],
};

export const components = {
  pageDetails: {
    count: 2,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: null,
  },
  components: [
    {
      uid: 'component-uid-001',
      name: 'Restart Service',
      description: 'Restarts a Windows service',
      category: 'Maintenance',
      active: true,
      version: '1.0.0',
    },
    {
      uid: 'component-uid-002',
      name: 'Clear Temp Files',
      description: 'Clears temporary files',
      category: 'Cleanup',
      active: true,
      version: '1.2.0',
    },
  ],
};

export const alertsOpen = {
  pageDetails: {
    count: 2,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: null,
  },
  alerts: [
    {
      alertUid: 'alert-uid-001',
      deviceUid: 'device-uid-001',
      hostname: 'DESKTOP-001',
      priority: 'High',
      alertCategory: 'Performance',
      alertType: 'Disk Usage',
      message: 'Disk C: is 90% full',
      createdAt: 1706745600000,
      alertContext: {
        '@class': 'perf_disk_usage_ctx',
        drive: 'C:',
        threshold: 85,
        usagePercent: 90,
        freeSpaceBytes: 10737418240,
      },
    },
    {
      alertUid: 'alert-uid-002',
      deviceUid: 'device-uid-002',
      hostname: 'SERVER-001',
      priority: 'Critical',
      alertCategory: 'Service',
      alertType: 'Service Status',
      message: 'Service "SQL Server" is not running',
      createdAt: 1706659200000,
      alertContext: {
        '@class': 'srvc_status_ctx',
        serviceName: 'MSSQLSERVER',
        serviceDisplayName: 'SQL Server',
        expectedStatus: 'running',
        actualStatus: 'stopped',
      },
    },
  ],
};

export const alertsResolved = {
  pageDetails: {
    count: 1,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: null,
  },
  alerts: [
    {
      alertUid: 'alert-uid-003',
      deviceUid: 'device-uid-001',
      hostname: 'DESKTOP-001',
      priority: 'Low',
      alertCategory: 'Software',
      alertType: 'Software Installed',
      message: 'New software installed: Chrome',
      createdAt: 1706572800000,
      resolvedAt: 1706659200000,
      resolvedBy: 'admin@testmsp.com',
    },
  ],
};

export const variables = {
  variables: [
    {
      id: 'var-001',
      name: 'BackupServer',
      value: '192.168.1.200',
      masked: false,
      scope: 'account',
      createdAt: 1704067200000,
    },
    {
      id: 'var-002',
      name: 'AdminPassword',
      value: '********',
      masked: true,
      scope: 'account',
      createdAt: 1704067200000,
    },
  ],
};

export const variableCreated = {
  variable: {
    id: 'var-003',
    name: 'NewVariable',
    value: 'test-value',
    masked: false,
    scope: 'account',
    createdAt: 1706745600000,
  },
};

export const variableUpdated = {
  variable: {
    id: 'var-001',
    name: 'BackupServer',
    value: '192.168.1.201',
    masked: false,
    scope: 'account',
    modifiedAt: 1706745600000,
  },
};
