/**
 * Sites resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type { PaginationParams } from '../pagination.js';
import { createPaginatedIterable, type PaginatedIterable } from '../pagination.js';
import type {
  Site,
  SiteCreateRequest,
  SiteUpdateRequest,
  SiteSettings,
  SiteProxySettings,
  NetworkInterface,
  SiteResponse,
  SiteDevicesResponse,
  SiteNetworkInterfacesResponse,
  SiteSettingsResponse,
  SiteFiltersResponse,
  SiteAlertsResponse,
  SiteVariablesResponse,
  SiteCreatedResponse,
  SiteUpdatedResponse,
} from '../types/sites.js';
import type { Device } from '../types/devices.js';
import type { Alert } from '../types/alerts.js';
import type { Filter } from '../types/filters.js';
import type { Variable, VariableCreateRequest, VariableUpdateRequest, VariableCreatedResponse, VariableUpdatedResponse, VariableDeletedResponse } from '../types/variables.js';

/**
 * Sites resource operations
 */
export class SitesResource {
  private readonly httpClient: HttpClient;
  private readonly config: ResolvedConfig;

  constructor(httpClient: HttpClient, config: ResolvedConfig) {
    this.httpClient = httpClient;
    this.config = config;
  }

  /**
   * Create a new site
   */
  async create(data: SiteCreateRequest): Promise<Site> {
    const response = await this.httpClient.request<SiteCreatedResponse>('/site', {
      method: 'PUT',
      body: data,
    });
    return response.site;
  }

  /**
   * Get a site by UID
   */
  async get(siteUid: string): Promise<Site> {
    const response = await this.httpClient.request<SiteResponse>(`/site/${siteUid}`);
    return response.site;
  }

  /**
   * Update a site
   */
  async update(siteUid: string, data: SiteUpdateRequest): Promise<Site> {
    const response = await this.httpClient.request<SiteUpdatedResponse>(`/site/${siteUid}`, {
      method: 'POST',
      body: data,
    });
    return response.site;
  }

  /**
   * List devices at a site
   */
  async devices(siteUid: string, params?: PaginationParams): Promise<SiteDevicesResponse> {
    return this.httpClient.request<SiteDevicesResponse>(`/site/${siteUid}/devices`, {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all devices at a site with automatic pagination
   */
  devicesAll(siteUid: string, params?: PaginationParams): PaginatedIterable<Device> {
    return createPaginatedIterable<Device>(
      this.httpClient,
      this.config.apiUrl,
      `/site/${siteUid}/devices`,
      'devices',
      params
    );
  }

  /**
   * List network interfaces for devices at a site
   */
  async networkInterfaces(siteUid: string, params?: PaginationParams): Promise<SiteNetworkInterfacesResponse> {
    return this.httpClient.request<SiteNetworkInterfacesResponse>(`/site/${siteUid}/devices/network-interface`, {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all network interfaces with automatic pagination
   */
  networkInterfacesAll(siteUid: string, params?: PaginationParams): PaginatedIterable<NetworkInterface> {
    return createPaginatedIterable<NetworkInterface>(
      this.httpClient,
      this.config.apiUrl,
      `/site/${siteUid}/devices/network-interface`,
      'networkInterfaces',
      params
    );
  }

  /**
   * Get site settings
   */
  async settings(siteUid: string): Promise<SiteSettings> {
    const response = await this.httpClient.request<SiteSettingsResponse>(`/site/${siteUid}/settings`);
    return response.settings;
  }

  /**
   * Get site filters
   */
  async filters(siteUid: string): Promise<Filter[]> {
    const response = await this.httpClient.request<SiteFiltersResponse>(`/site/${siteUid}/filters`);
    return response.filters;
  }

  /**
   * List open alerts for a site
   */
  async alertsOpen(siteUid: string, params?: PaginationParams): Promise<SiteAlertsResponse> {
    return this.httpClient.request<SiteAlertsResponse>(`/site/${siteUid}/alerts/open`, {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all open alerts for a site with automatic pagination
   */
  alertsOpenAll(siteUid: string, params?: PaginationParams): PaginatedIterable<Alert> {
    return createPaginatedIterable<Alert>(
      this.httpClient,
      this.config.apiUrl,
      `/site/${siteUid}/alerts/open`,
      'alerts',
      params
    );
  }

  /**
   * List resolved alerts for a site
   */
  async alertsResolved(siteUid: string, params?: PaginationParams): Promise<SiteAlertsResponse> {
    return this.httpClient.request<SiteAlertsResponse>(`/site/${siteUid}/alerts/resolved`, {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all resolved alerts for a site with automatic pagination
   */
  alertsResolvedAll(siteUid: string, params?: PaginationParams): PaginatedIterable<Alert> {
    return createPaginatedIterable<Alert>(
      this.httpClient,
      this.config.apiUrl,
      `/site/${siteUid}/alerts/resolved`,
      'alerts',
      params
    );
  }

  /**
   * List site variables
   */
  async variables(siteUid: string): Promise<Variable[]> {
    const response = await this.httpClient.request<SiteVariablesResponse>(`/site/${siteUid}/variables`);
    return response.variables;
  }

  /**
   * Create a site variable
   */
  async createVariable(siteUid: string, data: VariableCreateRequest): Promise<Variable> {
    const response = await this.httpClient.request<VariableCreatedResponse>(`/site/${siteUid}/variable`, {
      method: 'PUT',
      body: data,
    });
    return response.variable;
  }

  /**
   * Update a site variable
   */
  async updateVariable(siteUid: string, variableId: string, data: VariableUpdateRequest): Promise<Variable> {
    const response = await this.httpClient.request<VariableUpdatedResponse>(`/site/${siteUid}/variable/${variableId}`, {
      method: 'POST',
      body: data,
    });
    return response.variable;
  }

  /**
   * Delete a site variable
   */
  async deleteVariable(siteUid: string, variableId: string): Promise<void> {
    await this.httpClient.request<VariableDeletedResponse>(`/site/${siteUid}/variable/${variableId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Set site proxy settings
   */
  async setProxy(siteUid: string, data: SiteProxySettings): Promise<void> {
    await this.httpClient.request(`/site/${siteUid}/settings/proxy`, {
      method: 'POST',
      body: data,
    });
  }

  /**
   * Delete site proxy settings
   */
  async deleteProxy(siteUid: string): Promise<void> {
    await this.httpClient.request(`/site/${siteUid}/settings/proxy`, {
      method: 'DELETE',
    });
  }
}
