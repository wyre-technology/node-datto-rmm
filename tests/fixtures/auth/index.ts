/**
 * Auth fixtures
 */

export const tokenSuccess = {
  access_token: 'mock-jwt-token-for-testing',
  token_type: 'bearer',
  expires_in: 360000, // 100 hours in seconds
};

export const tokenFailure = {
  error: 'invalid_grant',
  error_description: 'Bad credentials',
};
