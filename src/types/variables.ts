/**
 * Variable types
 */

import type { Uid } from './common.js';

/**
 * Variable information
 */
export interface Variable {
  /** Variable unique identifier */
  id: Uid;
  /** Variable name */
  name: string;
  /** Variable value */
  value: string;
  /** Whether the variable is masked/secret */
  masked?: boolean;
  /** Variable scope */
  scope?: 'account' | 'site';
  /** Creation timestamp */
  createdAt?: number;
  /** Last modified timestamp */
  modifiedAt?: number;
}

/**
 * Variable creation request
 */
export interface VariableCreateRequest {
  /** Variable name */
  name: string;
  /** Variable value */
  value: string;
  /** Whether to mask the variable value */
  masked?: boolean;
}

/**
 * Variable update request
 */
export interface VariableUpdateRequest {
  /** Variable name */
  name?: string;
  /** Variable value */
  value?: string;
  /** Whether to mask the variable value */
  masked?: boolean;
}

/**
 * Response for variable creation
 */
export interface VariableCreatedResponse {
  /** Created variable */
  variable: Variable;
}

/**
 * Response for variable update
 */
export interface VariableUpdatedResponse {
  /** Updated variable */
  variable: Variable;
}

/**
 * Response for variable deletion
 */
export interface VariableDeletedResponse {
  /** Success status */
  success: boolean;
  /** Deleted variable ID */
  variableId: Uid;
}
