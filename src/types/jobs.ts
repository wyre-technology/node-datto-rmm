/**
 * Job types
 */

import type { Uid, JobStatus } from './common.js';

/**
 * Job information
 */
export interface Job {
  /** Job unique identifier */
  uid: Uid;
  /** Job name */
  name: string;
  /** Job status */
  status: JobStatus;
  /** Job type */
  type?: string;
  /** Job priority */
  priority?: number;
  /** Component UID */
  componentUid?: Uid;
  /** Component name */
  componentName?: string;
  /** Device count */
  deviceCount?: number;
  /** Completed device count */
  completedDeviceCount?: number;
  /** Failed device count */
  failedDeviceCount?: number;
  /** Job creation timestamp */
  createdAt?: number;
  /** Job started timestamp */
  startedAt?: number;
  /** Job completed timestamp */
  completedAt?: number;
  /** Created by */
  createdBy?: string;
  /** Job schedule */
  schedule?: {
    type?: 'immediate' | 'scheduled' | 'recurring';
    scheduledAt?: number;
    recurrence?: string;
  };
}

/**
 * Job result for a specific device
 */
export interface JobResult {
  /** Job UID */
  jobUid: Uid;
  /** Device UID */
  deviceUid: Uid;
  /** Device hostname */
  hostname?: string;
  /** Result status */
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  /** Exit code */
  exitCode?: number;
  /** Execution start timestamp */
  startedAt?: number;
  /** Execution end timestamp */
  completedAt?: number;
  /** Execution duration in seconds */
  durationSeconds?: number;
  /** Error message if failed */
  errorMessage?: string;
}

/**
 * Job component information
 */
export interface JobComponent {
  /** Component UID */
  uid: Uid;
  /** Component name */
  name: string;
  /** Component type */
  type?: string;
  /** Component category */
  category?: string;
  /** Variables passed to the component */
  variables?: Record<string, string>;
}

/**
 * Response for job details
 */
export interface JobResponse {
  /** Job data */
  job: Job;
}

/**
 * Response for job results
 */
export interface JobResultsResponse {
  /** Job result for the device */
  result: JobResult;
}

/**
 * Response for job stdout
 */
export interface JobStdoutResponse {
  /** Standard output */
  stdout: string;
}

/**
 * Response for job stderr
 */
export interface JobStderrResponse {
  /** Standard error */
  stderr: string;
}

/**
 * Response for job components
 */
export interface JobComponentsResponse {
  /** List of components */
  components: JobComponent[];
}
