/**
 * Filters resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type { Filter, DefaultFiltersResponse, CustomFiltersResponse } from '../types/filters.js';

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
    const response = await this.httpClient.request<DefaultFiltersResponse>('/filter/default-filters');
    return response.filters;
  }

  /**
   * Get custom filters
   */
  async custom(): Promise<Filter[]> {
    const response = await this.httpClient.request<CustomFiltersResponse>('/filter/custom-filters');
    return response.filters;
  }
}
