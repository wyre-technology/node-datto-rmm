/**
 * Alerts resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type {
  Alert,
  AlertResolveResponse,
  AlertMuteResponse,
  AlertUnmuteResponse,
} from '../types/alerts.js';
import { unwrap } from '../unwrap.js';

/**
 * Alerts resource operations
 */
export class AlertsResource {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient, _config: ResolvedConfig) {
    this.httpClient = httpClient;
  }

  /**
   * Get an alert by UID
   */
  async get(alertUid: string): Promise<Alert> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/alert/${alertUid}`);
    return unwrap<Alert>(response, 'alert');
  }

  /**
   * Resolve an alert
   */
  async resolve(alertUid: string): Promise<AlertResolveResponse> {
    return this.httpClient.request<AlertResolveResponse>(`/alert/${alertUid}/resolve`, {
      method: 'POST',
    });
  }

  /**
   * Mute an alert
   * @deprecated This endpoint is deprecated as of version 8.9.0
   */
  async mute(alertUid: string): Promise<AlertMuteResponse> {
    return this.httpClient.request<AlertMuteResponse>(`/alert/${alertUid}/mute`, {
      method: 'POST',
    });
  }

  /**
   * Unmute an alert
   * @deprecated This endpoint is deprecated as of version 8.9.0
   */
  async unmute(alertUid: string): Promise<AlertUnmuteResponse> {
    return this.httpClient.request<AlertUnmuteResponse>(`/alert/${alertUid}/unmute`, {
      method: 'POST',
    });
  }
}
