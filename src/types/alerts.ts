/**
 * Alert types
 */

import type { Uid, AlertPriority, AlertStatus } from './common.js';
import type { AlertContext } from './alert-contexts.js';

/**
 * Alert information
 */
export interface Alert {
  /** Alert unique identifier */
  alertUid: Uid;
  /** Alert source UUID (for related alerts) */
  alertSourceUuid?: string;
  /** Device UID that triggered the alert */
  deviceUid: Uid;
  /** Device hostname */
  hostname?: string;
  /** Site UID */
  siteUid?: Uid;
  /** Site name */
  siteName?: string;
  /** Alert priority */
  priority: AlertPriority;
  /** Alert status */
  status?: AlertStatus;
  /** Alert category */
  alertCategory?: string;
  /** Alert type */
  alertType?: string;
  /** Alert message/description */
  message?: string;
  /** Alert context with type-specific details */
  alertContext?: AlertContext;
  /** Whether the alert is muted */
  muted?: boolean;
  /** Alert creation timestamp */
  createdAt?: number;
  /** Alert resolved timestamp */
  resolvedAt?: number;
  /** Who resolved the alert */
  resolvedBy?: string;
  /** Resolution notes */
  resolutionNotes?: string;
  /** Muted until timestamp */
  mutedUntil?: number;
  /** Who muted the alert */
  mutedBy?: string;
}

/**
 * Response for alert details
 */
export interface AlertResponse {
  /** Alert data */
  alert: Alert;
}

/**
 * Response for alert resolve operation
 */
export interface AlertResolveResponse {
  /** Alert UID */
  alertUid: Uid;
  /** Success status */
  success: boolean;
  /** Resolution timestamp */
  resolvedAt?: number;
}

/**
 * Response for alert mute operation
 * @deprecated Mute/unmute endpoints deprecated in version 8.9.0
 */
export interface AlertMuteResponse {
  /** Alert UID */
  alertUid: Uid;
  /** Success status */
  success: boolean;
  /** Muted until timestamp */
  mutedUntil?: number;
}

/**
 * Response for alert unmute operation
 * @deprecated Mute/unmute endpoints deprecated in version 8.9.0
 */
export interface AlertUnmuteResponse {
  /** Alert UID */
  alertUid: Uid;
  /** Success status */
  success: boolean;
}
