/**
 * Common types shared across resources
 */

/**
 * Pagination details returned by list endpoints
 */
export interface PageDetails {
  /** Number of items in the current page */
  count: number;
  /** Current page number (1-indexed) */
  page: number;
  /** URL for the previous page, or null if on first page */
  prevPageUrl: string | null;
  /** URL for the next page, or null if on last page */
  nextPageUrl: string | null;
}

/**
 * Generic paginated response structure
 */
export interface PaginatedResponse<T> {
  pageDetails: PageDetails;
  [key: string]: T[] | PageDetails | unknown;
}

/**
 * Common timestamp type - can be Date, number (Unix ms), or ISO string
 * depending on client configuration
 */
export type Timestamp = Date | number | string;

/**
 * Device type enumeration
 */
export type DeviceType = 'desktop' | 'laptop' | 'server' | 'esxihost' | 'printer' | 'network_device' | 'unknown';

/**
 * Operating system family
 */
export type OperatingSystemFamily = 'windows' | 'macos' | 'linux' | 'esxi' | 'other';

/**
 * Alert priority levels
 */
export type AlertPriority = 'Critical' | 'High' | 'Moderate' | 'Low' | 'Information';

/**
 * Alert status
 */
export type AlertStatus = 'open' | 'resolved' | 'muted';

/**
 * Job status
 */
export type JobStatus = 'active' | 'completed' | 'failed' | 'cancelled';

/**
 * Common UID type
 */
export type Uid = string;

/**
 * Common API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
}
