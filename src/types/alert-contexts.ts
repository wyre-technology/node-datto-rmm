/**
 * Alert context types - discriminated union for all 25+ alert context types
 */

/**
 * Base alert context with discriminator
 */
interface BaseAlertContext {
  '@class': string;
}

/**
 * Antivirus alert context
 */
export interface AntivirusAlertContext extends BaseAlertContext {
  '@class': 'antivirus_ctx';
  antivirusProduct?: string;
  antivirusStatus?: string;
  definitionsOutOfDate?: boolean;
  scanRequired?: boolean;
  threatDetected?: boolean;
  threatName?: string;
}

/**
 * Component script alert context
 */
export interface ComponentScriptAlertContext extends BaseAlertContext {
  '@class': 'comp_script_ctx';
  componentName?: string;
  componentUid?: string;
  exitCode?: number;
  stdout?: string;
  stderr?: string;
  executionTime?: number;
}

/**
 * Custom SNMP alert context
 */
export interface CustomSnmpAlertContext extends BaseAlertContext {
  '@class': 'custom_snmp_ctx';
  oid?: string;
  value?: string;
  expectedValue?: string;
  comparison?: string;
}

/**
 * Disk health alert context (ESXi)
 */
export interface DiskHealthAlertContext extends BaseAlertContext {
  '@class': 'disk_health_ctx';
  diskName?: string;
  diskStatus?: string;
  smartStatus?: string;
  temperature?: number;
  powerOnHours?: number;
  reallocatedSectors?: number;
}

/**
 * Event log alert context
 */
export interface EventLogAlertContext extends BaseAlertContext {
  '@class': 'eventlog_ctx';
  eventLogSource: string;
  eventLogId: number;
  eventLogType: string;
  eventLogMessage: string;
  eventLogCategory?: string;
  eventLogUser?: string;
  eventLogComputer?: string;
}

/**
 * Fan alert context (ESXi)
 */
export interface FanAlertContext extends BaseAlertContext {
  '@class': 'fan_ctx';
  fanName?: string;
  fanStatus?: string;
  fanSpeed?: number;
  fanSpeedUnit?: string;
  threshold?: number;
}

/**
 * File/folder size alert context
 */
export interface FsObjectAlertContext extends BaseAlertContext {
  '@class': 'fs_object_ctx';
  path?: string;
  objectType?: 'file' | 'folder';
  sizeBytes?: number;
  sizeThresholdBytes?: number;
  comparison?: string;
}

/**
 * Online/offline status alert context
 */
export interface OnlineOfflineAlertContext extends BaseAlertContext {
  '@class': 'online_offline_status_ctx';
  deviceStatus?: 'online' | 'offline';
  lastSeenAt?: number;
  offlineDurationMinutes?: number;
  offlineThresholdMinutes?: number;
}

/**
 * Patch alert context
 */
export interface PatchAlertContext extends BaseAlertContext {
  '@class': 'patch_ctx';
  patchTitle?: string;
  patchKbId?: string;
  patchSeverity?: string;
  patchCategory?: string;
  patchStatus?: string;
  installAttempts?: number;
  failureReason?: string;
}

/**
 * Disk usage alert context
 */
export interface DiskUsageAlertContext extends BaseAlertContext {
  '@class': 'perf_disk_usage_ctx';
  drive: string;
  threshold: number;
  usagePercent: number;
  freeSpaceBytes: number;
  totalSpaceBytes?: number;
  usedSpaceBytes?: number;
}

/**
 * Windows performance monitor alert context
 */
export interface PerfMonAlertContext extends BaseAlertContext {
  '@class': 'perf_mon_ctx';
  counterName?: string;
  counterInstance?: string;
  counterValue?: number;
  threshold?: number;
  comparison?: string;
}

/**
 * Resource usage alert context (CPU/Memory/SNMP Throughput)
 */
export interface ResourceUsageAlertContext extends BaseAlertContext {
  '@class': 'perf_resource_usage_ctx';
  resourceType?: 'cpu' | 'memory' | 'snmp_throughput';
  usagePercent?: number;
  threshold?: number;
  durationMinutes?: number;
  currentValue?: number;
  maxValue?: number;
}

/**
 * Ping alert context
 */
export interface PingAlertContext extends BaseAlertContext {
  '@class': 'ping_ctx';
  targetHost?: string;
  targetIp?: string;
  responseTime?: number;
  responseTimeThreshold?: number;
  packetLoss?: number;
  packetLossThreshold?: number;
  pingStatus?: 'success' | 'timeout' | 'unreachable';
}

/**
 * Process resource usage alert context
 */
export interface ProcessResourceAlertContext extends BaseAlertContext {
  '@class': 'process_resource_usage_ctx';
  processName?: string;
  processId?: number;
  resourceType?: 'cpu' | 'memory';
  usagePercent?: number;
  threshold?: number;
  memoryBytes?: number;
}

/**
 * Process status alert context
 */
export interface ProcessStatusAlertContext extends BaseAlertContext {
  '@class': 'process_status_ctx';
  processName?: string;
  expectedStatus?: 'running' | 'not_running';
  actualStatus?: 'running' | 'not_running';
  instanceCount?: number;
  expectedInstanceCount?: number;
}

/**
 * PSU alert context (ESXi)
 */
export interface PsuAlertContext extends BaseAlertContext {
  '@class': 'psu_ctx';
  psuName?: string;
  psuStatus?: string;
  voltage?: number;
  wattage?: number;
  temperature?: number;
}

/**
 * Ransomware alert context
 */
export interface RansomwareAlertContext extends BaseAlertContext {
  '@class': 'ransomware_ctx';
  detectionType?: string;
  affectedPath?: string;
  suspiciousProcess?: string;
  suspiciousActivity?: string;
  quarantineStatus?: string;
}

/**
 * Security management alert context (Webroot)
 */
export interface SecurityManagementAlertContext extends BaseAlertContext {
  '@class': 'sec_management_ctx';
  securityProduct?: string;
  securityStatus?: string;
  threatType?: string;
  threatName?: string;
  threatSeverity?: string;
  actionTaken?: string;
}

/**
 * Service resource usage alert context
 */
export interface ServiceResourceAlertContext extends BaseAlertContext {
  '@class': 'srvc_resource_usage_ctx';
  serviceName?: string;
  serviceDisplayName?: string;
  resourceType?: 'cpu' | 'memory';
  usagePercent?: number;
  threshold?: number;
  memoryBytes?: number;
}

/**
 * Service status alert context
 */
export interface ServiceStatusAlertContext extends BaseAlertContext {
  '@class': 'srvc_status_ctx';
  serviceName?: string;
  serviceDisplayName?: string;
  expectedStatus?: 'running' | 'stopped';
  actualStatus?: 'running' | 'stopped' | 'starting' | 'stopping' | 'paused';
  startType?: string;
}

/**
 * Software action alert context
 */
export interface SoftwareActionAlertContext extends BaseAlertContext {
  '@class': 'sw_action_ctx';
  softwareName?: string;
  softwareVersion?: string;
  action?: 'installed' | 'uninstalled' | 'updated';
  previousVersion?: string;
  installDate?: number;
}

/**
 * Temperature alert context (ESXi)
 */
export interface TemperatureAlertContext extends BaseAlertContext {
  '@class': 'temperature_ctx';
  sensorName?: string;
  temperature?: number;
  temperatureUnit?: 'celsius' | 'fahrenheit';
  threshold?: number;
  status?: string;
}

/**
 * WMI alert context
 */
export interface WmiAlertContext extends BaseAlertContext {
  '@class': 'wmi_ctx';
  wmiNamespace?: string;
  wmiQuery?: string;
  wmiProperty?: string;
  wmiValue?: string;
  expectedValue?: string;
  comparison?: string;
}

/**
 * Unknown/generic alert context for new or unrecognized types
 */
export interface UnknownAlertContext extends BaseAlertContext {
  '@class': string;
  [key: string]: unknown;
}

/**
 * Discriminated union of all alert context types
 */
export type AlertContext =
  | AntivirusAlertContext
  | ComponentScriptAlertContext
  | CustomSnmpAlertContext
  | DiskHealthAlertContext
  | EventLogAlertContext
  | FanAlertContext
  | FsObjectAlertContext
  | OnlineOfflineAlertContext
  | PatchAlertContext
  | DiskUsageAlertContext
  | PerfMonAlertContext
  | ResourceUsageAlertContext
  | PingAlertContext
  | ProcessResourceAlertContext
  | ProcessStatusAlertContext
  | PsuAlertContext
  | RansomwareAlertContext
  | SecurityManagementAlertContext
  | ServiceResourceAlertContext
  | ServiceStatusAlertContext
  | SoftwareActionAlertContext
  | TemperatureAlertContext
  | WmiAlertContext
  | UnknownAlertContext;

/**
 * Type guard for checking alert context type
 */
export function isAlertContextType<T extends AlertContext>(
  context: AlertContext,
  className: T['@class']
): context is T {
  return context['@class'] === className;
}

/**
 * Mapping of @class values to human-readable names
 */
export const ALERT_CONTEXT_TYPES: Record<string, string> = {
  antivirus_ctx: 'Antivirus Status',
  comp_script_ctx: 'Component Script',
  custom_snmp_ctx: 'SNMP',
  disk_health_ctx: 'ESXi Disk Health',
  eventlog_ctx: 'Event Log',
  fan_ctx: 'ESXi Fan',
  fs_object_ctx: 'File/Folder Size',
  online_offline_status_ctx: 'Online Status',
  patch_ctx: 'Patch',
  perf_disk_usage_ctx: 'Disk Usage',
  perf_mon_ctx: 'Windows Performance',
  perf_resource_usage_ctx: 'CPU / Memory / SNMP Throughput',
  ping_ctx: 'Ping',
  process_resource_usage_ctx: 'Process CPU / Memory',
  process_status_ctx: 'Process Status',
  psu_ctx: 'ESXi PSU',
  ransomware_ctx: 'Ransomware',
  sec_management_ctx: 'Webroot Security',
  srvc_resource_usage_ctx: 'Service CPU / Memory',
  srvc_status_ctx: 'Service Status',
  sw_action_ctx: 'Software',
  temperature_ctx: 'ESXi Temperature',
  wmi_ctx: 'WMI',
};
