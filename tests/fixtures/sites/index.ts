/**
 * Sites fixtures
 */

export const get = {
  site: {
    uid: 'site-uid-001',
    name: 'Headquarters',
    description: 'Main office location',
    devicesCount: 50,
    onlineDevices: 45,
    offlineDevices: 5,
    openAlerts: 3,
    createdAt: 1704067200000,
    modifiedAt: 1706745600000,
    notes: 'Primary data center',
  },
};

export const created = {
  site: {
    uid: 'site-uid-new',
    name: 'New Site',
    description: 'A new site',
    devicesCount: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    openAlerts: 0,
    createdAt: 1706745600000,
  },
};

export const updated = {
  site: {
    uid: 'site-uid-001',
    name: 'Headquarters Updated',
    description: 'Main office location - updated',
    devicesCount: 50,
    onlineDevices: 45,
    offlineDevices: 5,
    openAlerts: 3,
    modifiedAt: 1706745600000,
  },
};

export const devices = {
  pageDetails: {
    count: 2,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: null,
  },
  devices: [
    {
      uid: 'device-uid-001',
      id: 1001,
      siteUid: 'site-uid-001',
      hostname: 'DESKTOP-001',
      deviceType: 'desktop',
      isOnline: true,
    },
    {
      uid: 'device-uid-002',
      id: 1002,
      siteUid: 'site-uid-001',
      hostname: 'SERVER-001',
      deviceType: 'server',
      isOnline: true,
    },
  ],
};

export const settings = {
  settings: {
    siteUid: 'site-uid-001',
    patchManagement: true,
    antivirus: true,
    remoteControl: true,
    screenshotCapture: false,
    maintenanceWindow: {
      enabled: true,
      startTime: '02:00',
      endTime: '06:00',
      days: ['Saturday', 'Sunday'],
    },
  },
};

export const filters = {
  filters: [
    {
      uid: 'filter-uid-001',
      name: 'Windows Servers',
      type: 'custom',
      deviceCount: 5,
    },
  ],
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
      message: 'Test alert',
    },
  ],
};

export const alertsResolved = {
  pageDetails: {
    count: 0,
    page: 1,
    prevPageUrl: null,
    nextPageUrl: null,
  },
  alerts: [],
};

export const variables = {
  variables: [
    {
      id: 'site-var-001',
      name: 'LocalDC',
      value: '192.168.1.1',
      scope: 'site',
    },
  ],
};
