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
} from '../types/audit.js';
import { unwrap } from '../unwrap.js';

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
    const response = await this.httpClient.request<Record<string, unknown>>(`/audit/device/${deviceUid}`);
    return unwrap<DeviceAudit>(response, 'audit');
  }

  /**
   * Get software inventory for a device
   */
  async deviceSoftware(deviceUid: string): Promise<AuditSoftware[]> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/audit/device/${deviceUid}/software`);
    return unwrap<AuditSoftware[]>(response, 'software');
  }

  /**
   * Get device audit by MAC address
   */
  async deviceByMac(macAddress: string): Promise<DeviceAudit> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/audit/device/macAddress/${macAddress}`);
    return unwrap<DeviceAudit>(response, 'audit');
  }

  /**
   * Get ESXi host audit information
   */
  async esxiHost(deviceUid: string): Promise<EsxiHostAudit> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/audit/esxihost/${deviceUid}`);
    return unwrap<EsxiHostAudit>(response, 'audit');
  }

  /**
   * Get printer audit information
   */
  async printer(deviceUid: string): Promise<PrinterAudit> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/audit/printer/${deviceUid}`);
    return unwrap<PrinterAudit>(response, 'audit');
  }
}
