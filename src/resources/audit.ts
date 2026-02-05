/**
 * Audit resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type {
  DeviceAudit,
  AuditSoftware,
  EsxiHostAudit,
  PrinterAudit,
  DeviceAuditResponse,
  DeviceSoftwareResponse,
  EsxiHostAuditResponse,
  PrinterAuditResponse,
} from '../types/audit.js';

/**
 * Audit resource operations
 */
export class AuditResource {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient, _config: ResolvedConfig) {
    this.httpClient = httpClient;
  }

  /**
   * Get full audit information for a device
   */
  async device(deviceUid: string): Promise<DeviceAudit> {
    const response = await this.httpClient.request<DeviceAuditResponse>(`/audit/device/${deviceUid}`);
    return response.audit;
  }

  /**
   * Get software inventory for a device
   */
  async deviceSoftware(deviceUid: string): Promise<AuditSoftware[]> {
    const response = await this.httpClient.request<DeviceSoftwareResponse>(`/audit/device/${deviceUid}/software`);
    return response.software;
  }

  /**
   * Get device audit by MAC address
   */
  async deviceByMac(macAddress: string): Promise<DeviceAudit> {
    const response = await this.httpClient.request<DeviceAuditResponse>(`/audit/device/macAddress/${macAddress}`);
    return response.audit;
  }

  /**
   * Get ESXi host audit information
   */
  async esxiHost(deviceUid: string): Promise<EsxiHostAudit> {
    const response = await this.httpClient.request<EsxiHostAuditResponse>(`/audit/esxihost/${deviceUid}`);
    return response.audit;
  }

  /**
   * Get printer audit information
   */
  async printer(deviceUid: string): Promise<PrinterAudit> {
    const response = await this.httpClient.request<PrinterAuditResponse>(`/audit/printer/${deviceUid}`);
    return response.audit;
  }
}
