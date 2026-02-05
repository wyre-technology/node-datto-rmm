/**
 * System types
 */

/**
 * System status information
 */
export interface SystemStatus {
  /** API status */
  status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  /** API version */
  version?: string;
  /** Server timestamp */
  serverTime?: number;
  /** Status message */
  message?: string;
  /** Maintenance information */
  maintenance?: {
    scheduled?: boolean;
    startTime?: number;
    endTime?: number;
    description?: string;
  };
}

/**
 * Request rate information
 */
export interface RequestRate {
  /** Current number of requests in the window */
  requestCount: number;
  /** Maximum allowed requests */
  maxRequests: number;
  /** Window duration in seconds */
  windowSeconds: number;
  /** Requests remaining */
  remaining: number;
  /** Reset timestamp (when the window resets) */
  resetAt?: number;
  /** Whether rate limiting is being applied */
  limited?: boolean;
}

/**
 * Pagination information
 */
export interface PaginationInfo {
  /** Default page size */
  defaultPageSize: number;
  /** Maximum page size */
  maxPageSize: number;
  /** Maximum total results that can be retrieved */
  maxTotalResults?: number;
}

/**
 * Response for system status
 */
export interface SystemStatusResponse {
  /** System status */
  status: SystemStatus;
}

/**
 * Response for request rate
 */
export interface RequestRateResponse {
  /** Request rate information */
  requestRate: RequestRate;
}

/**
 * Response for pagination info
 */
export interface PaginationInfoResponse {
  /** Pagination information */
  pagination: PaginationInfo;
}
