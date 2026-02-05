/**
 * Jobs resource operations
 */

import type { HttpClient } from '../http.js';
import type { ResolvedConfig } from '../config.js';
import type {
  Job,
  JobResult,
  JobComponent,
  JobResponse,
  JobResultsResponse,
  JobStdoutResponse,
  JobStderrResponse,
  JobComponentsResponse,
} from '../types/jobs.js';

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
    const response = await this.httpClient.request<JobResponse>(`/job/${jobUid}`);
    return response.job;
  }

  /**
   * Get job results for a specific device
   */
  async results(jobUid: string, deviceUid: string): Promise<JobResult> {
    const response = await this.httpClient.request<JobResultsResponse>(`/job/${jobUid}/results/${deviceUid}`);
    return response.result;
  }

  /**
   * Get job stdout for a specific device
   */
  async stdout(jobUid: string, deviceUid: string): Promise<string> {
    const response = await this.httpClient.request<JobStdoutResponse>(`/job/${jobUid}/results/${deviceUid}/stdout`);
    return response.stdout;
  }

  /**
   * Get job stderr for a specific device
   */
  async stderr(jobUid: string, deviceUid: string): Promise<string> {
    const response = await this.httpClient.request<JobStderrResponse>(`/job/${jobUid}/results/${deviceUid}/stderr`);
    return response.stderr;
  }

  /**
   * Get job components
   */
  async components(jobUid: string): Promise<JobComponent[]> {
    const response = await this.httpClient.request<JobComponentsResponse>(`/job/${jobUid}/components`);
    return response.components;
  }
}
