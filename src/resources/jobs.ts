/**
 * Jobs resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type {
  Job,
  JobResult,
  JobComponent,
} from '../types/jobs.js';
import { unwrap } from '../unwrap.js';

/**
 * Jobs resource operations
 */
export class JobsResource {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient, _config: ResolvedConfig) {
    this.httpClient = httpClient;
  }

  /**
   * Get job details by UID
   */
  async get(jobUid: string): Promise<Job> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/job/${jobUid}`);
    return unwrap<Job>(response, 'job');
  }

  /**
   * Get job results for a specific device
   */
  async results(jobUid: string, deviceUid: string): Promise<JobResult> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/job/${jobUid}/results/${deviceUid}`);
    return unwrap<JobResult>(response, 'result');
  }

  /**
   * Get job stdout for a specific device
   */
  async stdout(jobUid: string, deviceUid: string): Promise<string> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/job/${jobUid}/results/${deviceUid}/stdout`);
    return unwrap<string>(response, 'stdout');
  }

  /**
   * Get job stderr for a specific device
   */
  async stderr(jobUid: string, deviceUid: string): Promise<string> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/job/${jobUid}/results/${deviceUid}/stderr`);
    return unwrap<string>(response, 'stderr');
  }

  /**
   * Get job components
   */
  async components(jobUid: string): Promise<JobComponent[]> {
    const response = await this.httpClient.request<Record<string, unknown>>(`/job/${jobUid}/components`);
    return unwrap<JobComponent[]>(response, 'components');
  }
}
