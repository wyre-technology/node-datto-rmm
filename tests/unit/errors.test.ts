/**
 * Error classes tests
 */

import { describe, it, expect } from 'vitest';
import {
  DattoRmmError,
  DattoRmmAuthenticationError,
  DattoRmmNotFoundError,
  DattoRmmRateLimitError,
  DattoRmmIpBlockedError,
  DattoRmmForbiddenError,
  DattoRmmServerError,
} from '../../src/errors.js';

describe('Error Classes', () => {
  describe('DattoRmmError', () => {
    it('should create error with message only', () => {
      const error = new DattoRmmError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(0);
      expect(error.response).toBeUndefined();
      expect(error.name).toBe('DattoRmmError');
    });

    it('should create error with all parameters', () => {
      const response = { error: 'details' };
      const error = new DattoRmmError('Test error', 500, response);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.response).toEqual(response);
    });

    it('should be instanceof Error', () => {
      const error = new DattoRmmError('Test');
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('DattoRmmAuthenticationError', () => {
    it('should create authentication error', () => {
      const error = new DattoRmmAuthenticationError('Invalid credentials');
      expect(error.message).toBe('Invalid credentials');
      expect(error.statusCode).toBe(401);
      expect(error.name).toBe('DattoRmmAuthenticationError');
    });

    it('should accept custom status code', () => {
      const error = new DattoRmmAuthenticationError('Bad request', 400);
      expect(error.statusCode).toBe(400);
    });

    it('should be instanceof DattoRmmError', () => {
      const error = new DattoRmmAuthenticationError('Test');
      expect(error).toBeInstanceOf(DattoRmmError);
    });
  });

  describe('DattoRmmNotFoundError', () => {
    it('should create not found error', () => {
      const error = new DattoRmmNotFoundError('Resource not found');
      expect(error.message).toBe('Resource not found');
      expect(error.statusCode).toBe(404);
      expect(error.name).toBe('DattoRmmNotFoundError');
    });

    it('should be instanceof DattoRmmError', () => {
      const error = new DattoRmmNotFoundError('Test');
      expect(error).toBeInstanceOf(DattoRmmError);
    });
  });

  describe('DattoRmmRateLimitError', () => {
    it('should create rate limit error with defaults', () => {
      const error = new DattoRmmRateLimitError('Rate limit exceeded');
      expect(error.message).toBe('Rate limit exceeded');
      expect(error.statusCode).toBe(429);
      expect(error.retryAfter).toBe(5000);
      expect(error.name).toBe('DattoRmmRateLimitError');
    });

    it('should accept custom retryAfter', () => {
      const error = new DattoRmmRateLimitError('Rate limit exceeded', 10000);
      expect(error.retryAfter).toBe(10000);
    });

    it('should be instanceof DattoRmmError', () => {
      const error = new DattoRmmRateLimitError('Test');
      expect(error).toBeInstanceOf(DattoRmmError);
    });
  });

  describe('DattoRmmIpBlockedError', () => {
    it('should create IP blocked error with defaults', () => {
      const error = new DattoRmmIpBlockedError('IP blocked');
      expect(error.message).toBe('IP blocked');
      expect(error.statusCode).toBe(403);
      expect(error.cooldownMs).toBe(300000);
      expect(error.name).toBe('DattoRmmIpBlockedError');
    });

    it('should accept custom cooldownMs', () => {
      const error = new DattoRmmIpBlockedError('IP blocked', 600000);
      expect(error.cooldownMs).toBe(600000);
    });

    it('should be instanceof DattoRmmError', () => {
      const error = new DattoRmmIpBlockedError('Test');
      expect(error).toBeInstanceOf(DattoRmmError);
    });
  });

  describe('DattoRmmForbiddenError', () => {
    it('should create forbidden error', () => {
      const error = new DattoRmmForbiddenError('Access denied');
      expect(error.message).toBe('Access denied');
      expect(error.statusCode).toBe(403);
      expect(error.name).toBe('DattoRmmForbiddenError');
    });

    it('should be instanceof DattoRmmError', () => {
      const error = new DattoRmmForbiddenError('Test');
      expect(error).toBeInstanceOf(DattoRmmError);
    });
  });

  describe('DattoRmmServerError', () => {
    it('should create server error with defaults', () => {
      const error = new DattoRmmServerError('Internal error');
      expect(error.message).toBe('Internal error');
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('DattoRmmServerError');
    });

    it('should accept custom status code', () => {
      const error = new DattoRmmServerError('Service unavailable', 503);
      expect(error.statusCode).toBe(503);
    });

    it('should be instanceof DattoRmmError', () => {
      const error = new DattoRmmServerError('Test');
      expect(error).toBeInstanceOf(DattoRmmError);
    });
  });
});
