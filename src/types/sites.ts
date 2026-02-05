/**
 * Site types
 */

import type { PageDetails, Uid } from './common.js';
import type { Device } from './devices.js';
import type { Alert } from './alerts.js';
import type { Variable } from './variables.js';
import type { Filter } from './filters.js';

/**
 * Site information
 */
export interface Site {
  /** Site unique identifier */
  uid: Uid;
  /** Site name */
  name: string;
  /** Site description */
  description?: string;
  /** Number of devices at the site */
  devicesCount: number;
  /** Number of online devices */
  onlineDevices: number;
  /** Number of offline devices */
  offlineDevices: number;
  /** Number of open alerts */
  openAlerts: number;
  /** Site creation timestamp */
  createdAt?: number;
  /** Last modification timestamp */
  modifiedAt?: number;
  /** Notes about the site */
  notes?: string;
  /** On-demand status */
  onDemand?: boolean;
  /** Site proxy URL */
  proxyUrl?: string;
  /** Site proxy type */
  proxyType?: string;
}

/**
 * Site creation request
 */
export interface SiteCreateRequest {
  /** Site name (required) */
  name: string;
  /** Site description */
  description?: string;
  /** Notes about the site */
  notes?: string;
  /** Whether the site is on-demand */
  onDemand?: boolean;
}

/**
 * Site update request
 */
export interface SiteUpdateRequest {
  /** Site name */
  name?: string;
  /** Site description */
  description?: string;
  /** Notes about the site */
  notes?: string;
  /** Whether the site is on-demand */
  onDemand?: boolean;
}

/**
 * Site settings
 */
export interface SiteSettings {
  /** Site UID */
  siteUid: Uid;
  /** Patch management enabled */
  patchManagement?: boolean;
  /** Antivirus enabled */
  antivirus?: boolean;
  /** Remote control enabled */
  remoteControl?: boolean;
  /** Screenshot capture enabled */
  screenshotCapture?: boolean;
  /** Patch schedule */
  patchSchedule?: string;
  /** Maintenance window */
  maintenanceWindow?: {
    enabled: boolean;
    startTime?: string;
    endTime?: string;
    days?: string[];
  };
}

/**
 * Site proxy settings
 */
export interface SiteProxySettings {
  /** Proxy URL */
  url: string;
  /** Proxy type */
  type?: 'http' | 'socks5';
  /** Proxy port */
  port?: number;
  /** Proxy username */
  username?: string;
  /** Proxy password */
  password?: string;
}

/**
 * Network interface information
 */
export interface NetworkInterface {
  /** Interface name */
  name: string;
  /** MAC address */
  macAddress: string;
  /** IP address */
  ipAddress?: string;
  /** IPv6 address */
  ipv6Address?: string;
  /** Subnet mask */
  subnetMask?: string;
  /** Default gateway */
  defaultGateway?: string;
  /** DNS servers */
  dnsServers?: string[];
  /** Whether DHCP is enabled */
  dhcpEnabled?: boolean;
  /** Interface type */
  type?: string;
  /** Interface speed in Mbps */
  speed?: number;
  /** Whether the interface is up */
  isUp?: boolean;
}

/**
 * Response for site details
 */
export interface SiteResponse {
  /** Site data */
  site: Site;
}

/**
 * Response for site devices list
 */
export interface SiteDevicesResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of devices */
  devices: Device[];
}

/**
 * Response for site network interfaces
 */
export interface SiteNetworkInterfacesResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of network interfaces */
  networkInterfaces: NetworkInterface[];
}

/**
 * Response for site settings
 */
export interface SiteSettingsResponse {
  /** Site settings */
  settings: SiteSettings;
}

/**
 * Response for site filters
 */
export interface SiteFiltersResponse {
  /** List of filters */
  filters: Filter[];
}

/**
 * Response for site alerts
 */
export interface SiteAlertsResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of alerts */
  alerts: Alert[];
}

/**
 * Response for site variables
 */
export interface SiteVariablesResponse {
  /** List of variables */
  variables: Variable[];
}

/**
 * Response for site creation
 */
export interface SiteCreatedResponse {
  /** Created site */
  site: Site;
}

/**
 * Response for site update
 */
export interface SiteUpdatedResponse {
  /** Updated site */
  site: Site;
}
