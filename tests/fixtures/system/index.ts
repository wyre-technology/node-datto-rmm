/**
 * System fixtures
 */

export const status = {
  status: {
    status: 'operational',
    version: '2.0.0',
    serverTime: 1706745600000,
    message: 'All systems operational',
  },
};

export const requestRate = {
  requestRate: {
    requestCount: 150,
    maxRequests: 600,
    windowSeconds: 60,
    remaining: 450,
    resetAt: 1706745660000,
    limited: false,
  },
};

export const pagination = {
  pagination: {
    defaultPageSize: 50,
    maxPageSize: 250,
    maxTotalResults: 10000,
  },
};
