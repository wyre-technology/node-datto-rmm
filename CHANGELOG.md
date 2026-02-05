# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-04

### Added

- Initial release of node-datto-rmm library
- Complete Datto RMM API v2 coverage (50+ endpoints)
- OAuth 2.0 token lifecycle management with auto-refresh
- Platform-aware configuration (6 platforms: Pinotage, Merlot, Concord, Vidal, Zinfandel, Syrah)
- Automatic pagination with nextPageUrl following
- Rate limiting with IP block protection (600 req/60s)
- All 25+ typed alert context discriminated unions
- Configurable timestamp handling (Date, Unix ms, ISO string)

#### Resources Implemented

- **Account**: get, users, sites, devices, components, alertsOpen, alertsResolved, variables CRUD, dnetSiteMappings
- **Sites**: create, get, update, devices, networkInterfaces, settings, filters, alerts, variables CRUD, proxy settings
- **Devices**: get (by UID/ID/MAC), alertsOpen, alertsResolved, move, createQuickJob, updateWarranty, setUdf
- **Alerts**: get, resolve, mute (deprecated), unmute (deprecated)
- **Audit**: device, deviceSoftware, deviceByMac, esxiHost, printer
- **Jobs**: get, results, stdout, stderr, components
- **Filters**: defaults, custom
- **System**: status, requestRate, pagination
- **Users**: resetApiKeys
- **ActivityLogs**: list

#### Error Handling

- DattoRmmError (base class)
- DattoRmmAuthenticationError (400, 401)
- DattoRmmNotFoundError (404)
- DattoRmmRateLimitError (429)
- DattoRmmIpBlockedError (403 rate limit escalation)
- DattoRmmForbiddenError (403 permission)
- DattoRmmServerError (500+)

#### Development

- Package.json with ESM and CJS dual exports
- TypeScript configuration with strict mode
- Vitest configuration with MSW for mocking
- ESLint configuration for TypeScript
- Comprehensive test suite (127 tests)
- 80%+ code coverage (excluding type definitions)

[0.1.0]: https://github.com/asachs01/node-datto-rmm/releases/tag/v0.1.0
