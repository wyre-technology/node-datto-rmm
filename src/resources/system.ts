/**
 * System resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type {
  SystemStatus,
  RequestRate,
  PaginationInfo,
  SystemStatusResponse,
  RequestRateResponse,
  PaginationInfoResponse,
} from '../types/system.js';

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
    const response = await this.httpClient.request<SystemStatusResponse>('/system/status');
    return response.status;
  }

  /**
   * Get current request rate (rate limit status)
   */
  async requestRate(): Promise<RequestRate> {
    const response = await this.httpClient.request<RequestRateResponse>('/system/request_rate');
    return response.requestRate;
  }

  /**
   * Get pagination settings
   */
  async pagination(): Promise<PaginationInfo> {
    const response = await this.httpClient.request<PaginationInfoResponse>('/system/pagination');
    return response.pagination;
  }
}
