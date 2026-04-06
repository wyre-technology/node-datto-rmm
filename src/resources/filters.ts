/**
 * Filters resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type { Filter } from '../types/filters.js';
import { unwrap } from '../unwrap.js';

/**
 * Filters resource operations
 */
export class FiltersResource {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient, _config: ResolvedConfig) {
    this.httpClient = httpClient;
  }

  /**
   * Get default filters
   */
  async defaults(): Promise<Filter[]> {
    const response = await this.httpClient.request<Record<string, unknown>>('/filter/default-filters');
    return unwrap<Filter[]>(response, 'filters');
  }

  /**
   * Get custom filters
   */
  async custom(): Promise<Filter[]> {
    const response = await this.httpClient.request<Record<string, unknown>>('/filter/custom-filters');
    return unwrap<Filter[]>(response, 'filters');
  }
}
