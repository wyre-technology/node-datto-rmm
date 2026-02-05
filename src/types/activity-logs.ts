/**
 * Activity log types
 */

import type { Uid, PageDetails } from './common.js';

/**
 * Activity log entry
 */
export interface ActivityLog {
  /** Activity log unique identifier */
  id: Uid;
  /** Activity type */
  activityType: string;
  /** Activity category */
  category?: string;
  /** Activity description */
  description?: string;
  /** User who performed the activity */
  user?: string;
  /** User email */
  userEmail?: string;
  /** Device UID (if applicable) */
  deviceUid?: Uid;
  /** Device hostname (if applicable) */
  deviceHostname?: string;
  /** Site UID (if applicable) */
  siteUid?: Uid;
  /** Site name (if applicable) */
  siteName?: string;
  /** Source IP address */
  sourceIp?: string;
  /** Activity timestamp */
  timestamp: number;
  /** Additional details */
  details?: Record<string, unknown>;
}

/**
 * Activity log list parameters
 */
export interface ActivityLogParams {
  /** Page number */
  page?: number;
  /** Maximum results per page */
  max?: number;
  /** Start date (Unix timestamp ms or ISO string) */
  startDate?: number | string;
  /** End date (Unix timestamp ms or ISO string) */
  endDate?: number | string;
  /** Filter by activity type */
  activityType?: string;
  /** Filter by user */
  user?: string;
  /** Filter by site UID */
  siteUid?: Uid;
  /** Filter by device UID */
  deviceUid?: Uid;
}

/**
 * Response for activity logs list
 */
export interface ActivityLogsResponse {
  /** Page details */
  pageDetails: PageDetails;
  /** List of activity logs */
  activityLogs: ActivityLog[];
}
