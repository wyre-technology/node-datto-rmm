/**
 * Devices resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type { PaginationParams } from '../pagination.js';
import { createPaginatedIterable, type PaginatedIterable } from '../pagination.js';
import type {
  Device,
  QuickJobRequest,
  QuickJobResponse,
  UdfUpdateRequest,
  WarrantyUpdateRequest,
  DeviceResponse,
  DeviceAlertsResponse,
  DeviceMoveResponse,
  UdfUpdateResponse,
  WarrantyUpdateResponse,
} from '../types/devices.js';
import type { Alert } from '../types/alerts.js';

/**
 * Devices resource operations
 */
export class DevicesResource {
  private readonly httpClient: HttpClient;
  private readonly config: ResolvedConfig;

  constructor(httpClient: HttpClient, config: ResolvedConfig) {
    this.httpClient = httpClient;
    this.config = config;
  }

  /**
   * Get a device by UID
   */
  async get(deviceUid: string): Promise<Device> {
    const response = await this.httpClient.request<DeviceResponse>(`/device/${deviceUid}`);
    return response.device;
  }

  /**
   * Get a device by numeric ID
   */
  async getById(deviceId: number): Promise<Device> {
    const response = await this.httpClient.request<DeviceResponse>(`/device/id/${deviceId}`);
    return response.device;
  }

  /**
   * Get a device by MAC address
   */
  async getByMac(macAddress: string): Promise<Device> {
    const response = await this.httpClient.request<DeviceResponse>(`/device/macAddress/${macAddress}`);
    return response.device;
  }

  /**
   * List open alerts for a device
   */
  async alertsOpen(deviceUid: string, params?: PaginationParams): Promise<DeviceAlertsResponse> {
    return this.httpClient.request<DeviceAlertsResponse>(`/device/${deviceUid}/alerts/open`, {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all open alerts for a device with automatic pagination
   */
  alertsOpenAll(deviceUid: string, params?: PaginationParams): PaginatedIterable<Alert> {
    return createPaginatedIterable<Alert>(
      this.httpClient,
      this.config.apiUrl,
      `/device/${deviceUid}/alerts/open`,
      'alerts',
      params
    );
  }

  /**
   * List resolved alerts for a device
   */
  async alertsResolved(deviceUid: string, params?: PaginationParams): Promise<DeviceAlertsResponse> {
    return this.httpClient.request<DeviceAlertsResponse>(`/device/${deviceUid}/alerts/resolved`, {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all resolved alerts for a device with automatic pagination
   */
  alertsResolvedAll(deviceUid: string, params?: PaginationParams): PaginatedIterable<Alert> {
    return createPaginatedIterable<Alert>(
      this.httpClient,
      this.config.apiUrl,
      `/device/${deviceUid}/alerts/resolved`,
      'alerts',
      params
    );
  }

  /**
   * Move a device to a different site
   */
  async move(deviceUid: string, siteUid: string): Promise<DeviceMoveResponse> {
    return this.httpClient.request<DeviceMoveResponse>(`/device/${deviceUid}/site/${siteUid}`, {
      method: 'PUT',
    });
  }

  /**
   * Create a quick job for a device
   */
  async createQuickJob(deviceUid: string, data: QuickJobRequest): Promise<QuickJobResponse> {
    return this.httpClient.request<QuickJobResponse>(`/device/${deviceUid}/quickjob`, {
      method: 'PUT',
      body: data,
    });
  }

  /**
   * Update device warranty information
   */
  async updateWarranty(deviceUid: string, data: WarrantyUpdateRequest): Promise<WarrantyUpdateResponse> {
    return this.httpClient.request<WarrantyUpdateResponse>(`/device/${deviceUid}/warranty`, {
      method: 'POST',
      body: data,
    });
  }

  /**
   * Set user-defined fields for a device
   */
  async setUdf(deviceUid: string, data: UdfUpdateRequest): Promise<UdfUpdateResponse> {
    return this.httpClient.request<UdfUpdateResponse>(`/device/${deviceUid}/udf`, {
      method: 'POST',
      body: data,
    });
  }
}
