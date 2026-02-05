/**
 * Alerts fixtures
 */

export const get = {
  alert: {
    alertUid: 'alert-uid-001',
    alertSourceUuid: 'source-uuid-001',
    deviceUid: 'device-uid-001',
    hostname: 'DESKTOP-001',
    siteUid: 'site-uid-001',
    siteName: 'Headquarters',
    priority: 'High',
    status: 'open',
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
      totalSpaceBytes: 107374182400,
    },
  },
};

export const getEventLog = {
  alert: {
    alertUid: 'alert-uid-eventlog',
    deviceUid: 'device-uid-001',
    priority: 'Moderate',
    alertCategory: 'Event Log',
    alertContext: {
      '@class': 'eventlog_ctx',
      eventLogSource: 'Application',
      eventLogId: 1001,
      eventLogType: 'Error',
      eventLogMessage: 'Application crashed unexpectedly',
    },
  },
};

export const getOnlineOffline = {
  alert: {
    alertUid: 'alert-uid-offline',
    deviceUid: 'device-uid-003',
    priority: 'High',
    alertCategory: 'Status',
    alertContext: {
      '@class': 'online_offline_status_ctx',
      deviceStatus: 'offline',
      lastSeenAt: 1706659200000,
      offlineDurationMinutes: 1440,
      offlineThresholdMinutes: 60,
    },
  },
};

export const resolved = {
  alertUid: 'alert-uid-001',
  success: true,
  resolvedAt: 1706745600000,
};

export const muted = {
  alertUid: 'alert-uid-001',
  success: true,
  mutedUntil: 1706832000000,
};

export const unmuted = {
  alertUid: 'alert-uid-001',
  success: true,
};
