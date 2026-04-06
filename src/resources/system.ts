/**
 * System resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type {
  SystemStatus,
  RequestRate,
  PaginationInfo,
} from '../types/system.js';
import { unwrap } from '../unwrap.js';

/**
 * System resource operations
 */
export class SystemResource {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient, _config: ResolvedConfig) {
    this.httpClient = httpClient;
  }

  /**
   * Get system status
   */
  async status(): Promise<SystemStatus> {
    const response = await this.httpClient.request<Record<string, unknown>>('/system/status');
    return unwrap<SystemStatus>(response, 'status');
  }

  /**
   * Get current request rate (rate limit status)
   */
  async requestRate(): Promise<RequestRate> {
    const response = await this.httpClient.request<Record<string, unknown>>('/system/request_rate');
    return unwrap<RequestRate>(response, 'requestRate');
  }

  /**
   * Get pagination settings
   */
  async pagination(): Promise<PaginationInfo> {
    const response = await this.httpClient.request<Record<string, unknown>>('/system/pagination');
    return unwrap<PaginationInfo>(response, 'pagination');
  }
}
