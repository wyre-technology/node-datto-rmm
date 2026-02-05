/**
 * Pagination tests
 */

import { describe, it, expect } from 'vitest';
import { buildPaginationParams } from '../../src/pagination.js';

describe('Pagination Utilities', () => {
  describe('buildPaginationParams', () => {
    it('should return empty object for undefined params', () => {
      expect(buildPaginationParams()).toEqual({});
    });

    it('should return empty object for empty params', () => {
      expect(buildPaginationParams({})).toEqual({
        page: undefined,
        max: undefined,
      });
    });

    it('should include page when specified', () => {
      expect(buildPaginationParams({ page: 2 })).toEqual({
        page: 2,
        max: undefined,
      });
    });

    it('should include max when specified', () => {
      expect(buildPaginationParams({ max: 100 })).toEqual({
        page: undefined,
        max: 100,
      });
    });

    it('should include both page and max when specified', () => {
      expect(buildPaginationParams({ page: 3, max: 50 })).toEqual({
        page: 3,
        max: 50,
      });
    });
  });
});
