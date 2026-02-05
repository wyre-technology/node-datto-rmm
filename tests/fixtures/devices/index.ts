/**
 * Devices fixtures
 */

export const getByUid = {
  device: {
    uid: 'device-uid-001',
    id: 1001,
    siteUid: 'site-uid-001',
    siteName: 'Headquarters',
    hostname: 'DESKTOP-001',
    description: 'Main workstation',
    deviceType: 'desktop',
    operatingSystem: 'Windows 11 Pro',
    operatingSystemFamily: 'windows',
    operatingSystemVersion: '22H2',
    isOnline: true,
    lastSeenAt: 1706745600000,
    lastAuditAt: 1706659200000,
    ipAddresses: ['192.168.1.100'],
    macAddresses: ['AA:BB:CC:DD:EE:01'],
    serialNumber: 'ABC123XYZ',
    manufacturer: 'Dell',
    model: 'OptiPlex 7080',
    openAlerts: 1,
    agentVersion: '2.0.1.234',
    createdAt: 1704067200000,
    domain: 'TESTDOMAIN',
    loggedInUser: 'TESTDOMAIN\\jsmith',
  },
};

export const getById = {
  device: {
    uid: 'device-uid-001',
    id: 1001,
    siteUid: 'site-uid-001',
    hostname: 'DESKTOP-001',
    deviceType: 'desktop',
    isOnline: true,
  },
};

export const getByMac = {
  device: {
    uid: 'device-uid-001',
    id: 1001,
    siteUid: 'site-uid-001',
    hostname: 'DESKTOP-001',
    deviceType: 'desktop',
    isOnline: true,
    macAddresses: ['AA:BB:CC:DD:EE:01'],
  },
};

export const alertsOpen = {
  pageDetails: {
    count: 1,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: null,
  },
  alerts: [
    {
      alertUid: 'alert-uid-001',
      deviceUid: 'device-uid-001',
      priority: 'High',
      message: 'Disk usage high',
    },
  ],
};

export const moved = {
  deviceUid: 'device-uid-001',
  siteUid: 'site-uid-002',
  success: true,
};

export const quickJobCreated = {
  uid: 'job-uid-001',
  name: 'Restart Service',
  status: 'active',
};

export const warrantyUpdated = {
  deviceUid: 'device-uid-001',
  warrantyExpiry: 1738368000000,
  warrantyNotes: 'Extended warranty',
};

export const udfUpdated = {
  deviceUid: 'device-uid-001',
  udf: {
    udf1: 'Building A',
    udf2: 'Floor 3',
  },
};
