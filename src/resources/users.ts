/**
 * Users resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type { ResetApiKeysResponse } from '../types/users.js';

/**
 * Users resource operations
 */
export class UsersResource {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient, _config: ResolvedConfig) {
    this.httpClient = httpClient;
  }

  /**
   * Reset API keys for the current user
   * WARNING: This will invalidate the current API keys
   */
  async resetApiKeys(): Promise<ResetApiKeysResponse> {
    return this.httpClient.request<ResetApiKeysResponse>('/user/resetApiKeys', {
      method: 'POST',
    });
  }
}
