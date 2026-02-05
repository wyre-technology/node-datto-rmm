/**
 * Main Datto RMM Client
 */

import type { DattoRmmConfig, ResolvedConfig } from './config.js';
import { resolveConfig } from './config.js';
import { AuthManager } from './auth.js';
import { HttpClient } from './http.js';
import { RateLimiter } from './rate-limiter.js';
import { AccountResource } from './resources/account.js';
import { SitesResource } from './resources/sites.js';
import { DevicesResource } from './resources/devices.js';
import { AlertsResource } from './resources/alerts.js';
import { AuditResource } from './resources/audit.js';
import { JobsResource } from './resources/jobs.js';
import { FiltersResource } from './resources/filters.js';
import { SystemResource } from './resources/system.js';
import { UsersResource } from './resources/users.js';
import { ActivityLogsResource } from './resources/activity-logs.js';

/**
 * Datto RMM API Client
 *
 * @example
 * ```typescript
 * const client = new DattoRmmClient({
 *   apiKey: 'your-api-key',
 *   apiSecretKey: 'your-api-secret',
 *   platform: 'merlot',
 * });
 *
 * const account = await client.account.get();
 * ```
 */
export class DattoRmmClient {
  private readonly config: ResolvedConfig;
  private readonly authManager: AuthManager;
  private readonly rateLimiter: RateLimiter;
  private readonly httpClient: HttpClient;

  /** Account operations */
  readonly account: AccountResource;
  /** Site operations */
  readonly sites: SitesResource;
  /** Device operations */
  readonly devices: DevicesResource;
  /** Alert operations */
  readonly alerts: AlertsResource;
  /** Audit operations */
  readonly audit: AuditResource;
  /** Job operations */
  readonly jobs: JobsResource;
  /** Filter operations */
  readonly filters: FiltersResource;
  /** System operations */
  readonly system: SystemResource;
  /** User operations */
  readonly users: UsersResource;
  /** Activity log operations */
  readonly activityLogs: ActivityLogsResource;

  constructor(config: DattoRmmConfig) {
    this.config = resolveConfig(config);
    this.authManager = new AuthManager(this.config);
    this.rateLimiter = new RateLimiter(this.config.rateLimit);
    this.httpClient = new HttpClient(this.config, this.authManager, this.rateLimiter);

    // Initialize resources
    this.account = new AccountResource(this.httpClient, this.config);
    this.sites = new SitesResource(this.httpClient, this.config);
    this.devices = new DevicesResource(this.httpClient, this.config);
    this.alerts = new AlertsResource(this.httpClient, this.config);
    this.audit = new AuditResource(this.httpClient, this.config);
    this.jobs = new JobsResource(this.httpClient, this.config);
    this.filters = new FiltersResource(this.httpClient, this.config);
    this.system = new SystemResource(this.httpClient, this.config);
    this.users = new UsersResource(this.httpClient, this.config);
    this.activityLogs = new ActivityLogsResource(this.httpClient, this.config);
  }

  /**
   * Get the current configuration
   */
  getConfig(): Readonly<ResolvedConfig> {
    return this.config;
  }

  /**
   * Invalidate the current auth token, forcing a new token to be acquired
   * on the next request
   */
  invalidateToken(): void {
    this.authManager.invalidateToken();
  }
}
