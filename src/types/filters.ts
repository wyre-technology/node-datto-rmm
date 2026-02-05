/**
 * Filter types
 */

import type { Uid } from './common.js';

/**
 * Filter information
 */
export interface Filter {
  /** Filter unique identifier */
  uid: Uid;
  /** Filter name */
  name: string;
  /** Filter description */
  description?: string;
  /** Filter type */
  type: 'default' | 'custom';
  /** Filter category */
  category?: string;
  /** Filter criteria */
  criteria?: FilterCriteria[];
  /** Whether the filter is active */
  active?: boolean;
  /** Device count matching the filter */
  deviceCount?: number;
  /** Created by */
  createdBy?: string;
  /** Creation timestamp */
  createdAt?: number;
  /** Last modified timestamp */
  modifiedAt?: number;
}

/**
 * Filter criteria
 */
export interface FilterCriteria {
  /** Field to filter on */
  field: string;
  /** Comparison operator */
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty';
  /** Value to compare against */
  value?: string | number | boolean;
  /** Logical operator for combining with other criteria */
  logicalOperator?: 'and' | 'or';
}

/**
 * Response for default filters list
 */
export interface DefaultFiltersResponse {
  /** List of default filters */
  filters: Filter[];
}

/**
 * Response for custom filters list
 */
export interface CustomFiltersResponse {
  /** List of custom filters */
  filters: Filter[];
}
