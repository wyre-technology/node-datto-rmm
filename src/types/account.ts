/**
 * Account types
 */

import type { PageDetails, Uid } from './common.js';
import type { Site } from './sites.js';
import type { Device } from './devices.js';
import type { Alert } from './alerts.js';
import type { Variable } from './variables.js';

/**
 * Account information
 */
export interface Account {
  /** Account unique identifier */
  uid: Uid;
  /** Account name */
  name: string;
  /** Account description */
  description?: string;
  /** Number of sites in the account */
  siteCount: number;
  /** Number of devices in the account */
  deviceCount: number;
  /** Account creation timestamp */
  createdAt?: number;
  /** Last modification timestamp */
  modifiedAt?: number;
}

/**
 * Account user information
 */
export interface AccountUser {
  /** User unique identifier */
  uid: Uid;
  /** Username */
  username: string;
  /** User's email address */
  email: string;
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Whether the user is active */
  active: boolean;
  /** User's role */
  role?: string;
  /** Last login timestamp */
  lastLoginAt?: number;
  /** User creation timestamp */
  createdAt?: number;
}

/**
 * Component information
 */
export interface Component {
  /** Component unique identifier */
  uid: Uid;
  /** Component name */
  name: string;
  /** Component description */
  description?: string;
  /** Component category */
  category?: string;
  /** Whether the component is active */
  active: boolean;
  /** Component version */
  version?: string;
}

/**
 * D-NET site mapping
 */
export interface DnetSiteMapping {
  /** Site UID */
  siteUid: Uid;
  /** Site name */
  siteName: string;
  /** D-NET company ID */
  dnetCompanyId?: string;
  /** D-NET company name */
  dnetCompanyName?: string;
}

/**
 * Response for account details
 */
export interface AccountResponse {
  /** Account data */
  account: Account;
}

/**
 * Response for account users list
 */
export interface AccountUsersResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of users */
  users: AccountUser[];
}

/**
 * Response for account sites list
 */
export interface AccountSitesResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of sites */
  sites: Site[];
}

/**
 * Response for account devices list
 */
export interface AccountDevicesResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of devices */
  devices: Device[];
}

/**
 * Response for account components list
 */
export interface AccountComponentsResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of components */
  components: Component[];
}

/**
 * Response for account alerts
 */
export interface AccountAlertsResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of alerts */
  alerts: Alert[];
}

/**
 * Response for account variables
 */
export interface AccountVariablesResponse {
  /** List of variables */
  variables: Variable[];
}

/**
 * Response for D-NET site mappings
 */
export interface DnetSiteMappingsResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of mappings */
  mappings: DnetSiteMapping[];
}
