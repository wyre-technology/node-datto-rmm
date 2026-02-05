/**
 * Activity logs resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import { createPaginatedIterable, type PaginatedIterable } from '../pagination.js';
import type { ActivityLog, ActivityLogParams, ActivityLogsResponse } from '../types/activity-logs.js';

/**
 * Activity logs resource operations
 */
export class ActivityLogsResource {
  private readonly httpClient: HttpClient;
  private readonly config: ResolvedConfig;

  constructor(httpClient: HttpClient, config: ResolvedConfig) {
    this.httpClient = httpClient;
    this.config = config;
  }

  /**
   * List activity logs
   */
  async list(params?: ActivityLogParams): Promise<ActivityLogsResponse> {
    const queryParams: Record<string, string | number | undefined> = {};

    if (params) {
      if (params.page !== undefined) queryParams['page'] = params.page;
      if (params.max !== undefined) queryParams['max'] = params.max;
      if (params.startDate !== undefined) {
        queryParams['startDate'] = typeof params.startDate === 'number'
          ? params.startDate
          : new Date(params.startDate).getTime();
      }
      if (params.endDate !== undefined) {
        queryParams['endDate'] = typeof params.endDate === 'number'
          ? params.endDate
          : new Date(params.endDate).getTime();
      }
      if (params.activityType !== undefined) queryParams['activityType'] = params.activityType;
      if (params.user !== undefined) queryParams['user'] = params.user;
      if (params.siteUid !== undefined) queryParams['siteUid'] = params.siteUid;
      if (params.deviceUid !== undefined) queryParams['deviceUid'] = params.deviceUid;
    }

    return this.httpClient.request<ActivityLogsResponse>('/activity-logs', {
      params: queryParams,
    });
  }

  /**
   * List all activity logs with automatic pagination
   */
  listAll(params?: ActivityLogParams): PaginatedIterable<ActivityLog> {
    return createPaginatedIterable<ActivityLog>(
      this.httpClient,
      this.config.apiUrl,
      '/activity-logs',
      'activityLogs',
      { page: params?.page, max: params?.max }
    );
  }
}
