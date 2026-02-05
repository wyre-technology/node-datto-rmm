/**
 * Account resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type { PaginationParams } from '../pagination.js';
import { createPaginatedIterable, type PaginatedIterable } from '../pagination.js';
import type {
  Account,
  Component,
  DnetSiteMapping,
  AccountResponse,
  AccountUsersResponse,
  AccountSitesResponse,
  AccountDevicesResponse,
  AccountComponentsResponse,
  AccountAlertsResponse,
  AccountVariablesResponse,
  DnetSiteMappingsResponse,
} from '../types/account.js';
import type { Site } from '../types/sites.js';
import type { Device } from '../types/devices.js';
import type { Alert } from '../types/alerts.js';
import type { Variable, VariableCreateRequest, VariableUpdateRequest, VariableCreatedResponse, VariableUpdatedResponse, VariableDeletedResponse } from '../types/variables.js';

/**
 * Account resource operations
 */
export class AccountResource {
  private readonly httpClient: HttpClient;
  private readonly config: ResolvedConfig;

  constructor(httpClient: HttpClient, config: ResolvedConfig) {
    this.httpClient = httpClient;
    this.config = config;
  }

  /**
   * Get account information
   */
  async get(): Promise<Account> {
    const response = await this.httpClient.request<AccountResponse>('/account');
    return response.account;
  }

  /**
   * List account users
   */
  async users(params?: PaginationParams): Promise<AccountUsersResponse> {
    return this.httpClient.request<AccountUsersResponse>('/account/users', {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List account sites
   */
  async sites(params?: PaginationParams): Promise<AccountSitesResponse> {
    return this.httpClient.request<AccountSitesResponse>('/account/sites', {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all account sites with automatic pagination
   */
  sitesAll(params?: PaginationParams): PaginatedIterable<Site> {
    return createPaginatedIterable<Site>(
      this.httpClient,
      this.config.apiUrl,
      '/account/sites',
      'sites',
      params
    );
  }

  /**
   * List D-NET site mappings
   */
  async dnetSiteMappings(params?: PaginationParams): Promise<DnetSiteMappingsResponse> {
    return this.httpClient.request<DnetSiteMappingsResponse>('/account/dnet-site-mappings', {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all D-NET site mappings with automatic pagination
   */
  dnetSiteMappingsAll(params?: PaginationParams): PaginatedIterable<DnetSiteMapping> {
    return createPaginatedIterable<DnetSiteMapping>(
      this.httpClient,
      this.config.apiUrl,
      '/account/dnet-site-mappings',
      'mappings',
      params
    );
  }

  /**
   * List account devices
   */
  async devices(params?: PaginationParams): Promise<AccountDevicesResponse> {
    return this.httpClient.request<AccountDevicesResponse>('/account/devices', {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all account devices with automatic pagination
   */
  devicesAll(params?: PaginationParams): PaginatedIterable<Device> {
    return createPaginatedIterable<Device>(
      this.httpClient,
      this.config.apiUrl,
      '/account/devices',
      'devices',
      params
    );
  }

  /**
   * List account components
   */
  async components(params?: PaginationParams): Promise<AccountComponentsResponse> {
    return this.httpClient.request<AccountComponentsResponse>('/account/components', {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all account components with automatic pagination
   */
  componentsAll(params?: PaginationParams): PaginatedIterable<Component> {
    return createPaginatedIterable<Component>(
      this.httpClient,
      this.config.apiUrl,
      '/account/components',
      'components',
      params
    );
  }

  /**
   * List open alerts for the account
   */
  async alertsOpen(params?: PaginationParams): Promise<AccountAlertsResponse> {
    return this.httpClient.request<AccountAlertsResponse>('/account/alerts/open', {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all open alerts with automatic pagination
   */
  alertsOpenAll(params?: PaginationParams): PaginatedIterable<Alert> {
    return createPaginatedIterable<Alert>(
      this.httpClient,
      this.config.apiUrl,
      '/account/alerts/open',
      'alerts',
      params
    );
  }

  /**
   * List resolved alerts for the account
   */
  async alertsResolved(params?: PaginationParams): Promise<AccountAlertsResponse> {
    return this.httpClient.request<AccountAlertsResponse>('/account/alerts/resolved', {
      params: params as Record<string, string | number | undefined>,
    });
  }

  /**
   * List all resolved alerts with automatic pagination
   */
  alertsResolvedAll(params?: PaginationParams): PaginatedIterable<Alert> {
    return createPaginatedIterable<Alert>(
      this.httpClient,
      this.config.apiUrl,
      '/account/alerts/resolved',
      'alerts',
      params
    );
  }

  /**
   * List account variables
   */
  async variables(): Promise<Variable[]> {
    const response = await this.httpClient.request<AccountVariablesResponse>('/account/variables');
    return response.variables;
  }

  /**
   * Create an account variable
   */
  async createVariable(data: VariableCreateRequest): Promise<Variable> {
    const response = await this.httpClient.request<VariableCreatedResponse>('/account/variable', {
      method: 'PUT',
      body: data,
    });
    return response.variable;
  }

  /**
   * Update an account variable
   */
  async updateVariable(variableId: string, data: VariableUpdateRequest): Promise<Variable> {
    const response = await this.httpClient.request<VariableUpdatedResponse>(`/account/variable/${variableId}`, {
      method: 'POST',
      body: data,
    });
    return response.variable;
  }

  /**
   * Delete an account variable
   */
  async deleteVariable(variableId: string): Promise<void> {
    await this.httpClient.request<VariableDeletedResponse>(`/account/variable/${variableId}`, {
      method: 'DELETE',
    });
  }
}
