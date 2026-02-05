# node-datto-rmm

Comprehensive, fully-typed Node.js/TypeScript library for the Datto RMM API v2.

## Features

- Complete Datto RMM API v2 coverage (50+ endpoints)
- OAuth 2.0 token lifecycle management (100-hour expiry, auto-refresh)
- Platform-aware (6 platforms: Pinotage, Merlot, Concord, Vidal, Zinfandel, Syrah)
- Automatic pagination with nextPageUrl following
- Rate limiting (600 req/60s with IP block protection)
- 25+ typed alert context discriminated unions
- Unix timestamp handling (millisecond precision)
- Full TypeScript support with strict mode

## Installation

```bash
npm install node-datto-rmm
```

## Quick Start

```typescript
import { DattoRmmClient } from 'node-datto-rmm';

const client = new DattoRmmClient({
  apiKey: process.env.DATTO_API_KEY,
  apiSecretKey: process.env.DATTO_API_SECRET,
  platform: 'merlot', // or 'pinotage', 'concord', 'vidal', 'zinfandel', 'syrah'
});

// Get account info
const account = await client.account.get();

// List all devices with automatic pagination
for await (const device of client.account.devicesAll()) {
  console.log(device.hostname, device.operatingSystem);
}

// Resolve an alert
await client.alerts.resolve('alert-uid-here');
```

## Configuration

```typescript
const client = new DattoRmmClient({
  // Required
  apiKey: 'your-api-key',
  apiSecretKey: 'your-api-secret-key',

  // Platform (required) - determines API base URL
  platform: 'merlot',

  // OR explicit API URL (alternative to platform)
  // apiUrl: 'https://merlot-api.centrastage.net',

  // Optional: timestamp format in responses
  timestamps: 'date', // 'date' | 'number' | 'iso'

  // Optional: rate limiting configuration
  rateLimit: {
    enabled: true,
    maxRequests: 600,
    windowMs: 60000,
    throttleThreshold: 0.8,
  },
});
```

## Platform URLs

| Platform   | API URL                                    |
|------------|-------------------------------------------|
| pinotage   | https://pinotage-api.centrastage.net      |
| merlot     | https://merlot-api.centrastage.net        |
| concord    | https://concord-api.centrastage.net       |
| vidal      | https://vidal-api.centrastage.net         |
| zinfandel  | https://zinfandel-api.centrastage.net     |
| syrah      | https://syrah-api.centrastage.net         |

## API Coverage

### Account Operations
- `client.account.get()` - Get account info
- `client.account.users()` - List users
- `client.account.sites()` / `sitesAll()` - List sites
- `client.account.devices()` / `devicesAll()` - List devices
- `client.account.components()` - List components
- `client.account.alertsOpen()` / `alertsOpenAll()` - Open alerts
- `client.account.alertsResolved()` / `alertsResolvedAll()` - Resolved alerts
- `client.account.variables()` - List variables
- `client.account.createVariable()` / `updateVariable()` / `deleteVariable()`

### Site Operations
- `client.sites.get(siteUid)` - Get site
- `client.sites.create(data)` - Create site
- `client.sites.update(siteUid, data)` - Update site
- `client.sites.devices(siteUid)` / `devicesAll(siteUid)` - List site devices
- `client.sites.settings(siteUid)` - Get site settings
- `client.sites.filters(siteUid)` - Get site filters
- `client.sites.alertsOpen(siteUid)` / `alertsResolved(siteUid)`
- `client.sites.variables(siteUid)` - CRUD operations

### Device Operations
- `client.devices.get(deviceUid)` - Get by UID
- `client.devices.getById(deviceId)` - Get by numeric ID
- `client.devices.getByMac(macAddress)` - Get by MAC address
- `client.devices.move(deviceUid, siteUid)` - Move to site
- `client.devices.createQuickJob(deviceUid, data)` - Create quick job
- `client.devices.setUdf(deviceUid, data)` - Set user-defined fields
- `client.devices.updateWarranty(deviceUid, data)` - Update warranty

### Alert Operations
- `client.alerts.get(alertUid)` - Get alert
- `client.alerts.resolve(alertUid)` - Resolve alert
- `client.alerts.mute(alertUid)` - Mute alert (deprecated)
- `client.alerts.unmute(alertUid)` - Unmute alert (deprecated)

### Audit Operations
- `client.audit.device(deviceUid)` - Full device audit
- `client.audit.deviceSoftware(deviceUid)` - Software inventory
- `client.audit.deviceByMac(macAddress)` - Audit by MAC
- `client.audit.esxiHost(deviceUid)` - ESXi host audit
- `client.audit.printer(deviceUid)` - Printer audit

### Job Operations
- `client.jobs.get(jobUid)` - Get job status
- `client.jobs.results(jobUid, deviceUid)` - Get results
- `client.jobs.stdout(jobUid, deviceUid)` - Get stdout
- `client.jobs.stderr(jobUid, deviceUid)` - Get stderr
- `client.jobs.components(jobUid)` - Get components

### Filter Operations
- `client.filters.defaults()` - Default filters
- `client.filters.custom()` - Custom filters

### System Operations
- `client.system.status()` - API status
- `client.system.requestRate()` - Current rate limit status
- `client.system.pagination()` - Pagination settings

## Error Handling

```typescript
import {
  DattoRmmError,
  DattoRmmAuthenticationError,
  DattoRmmNotFoundError,
  DattoRmmRateLimitError,
  DattoRmmIpBlockedError,
} from 'node-datto-rmm';

try {
  const device = await client.devices.get('invalid-uid');
} catch (error) {
  if (error instanceof DattoRmmNotFoundError) {
    console.log('Device not found');
  } else if (error instanceof DattoRmmRateLimitError) {
    console.log('Rate limited, retry after:', error.retryAfter);
  } else if (error instanceof DattoRmmIpBlockedError) {
    console.log('IP blocked for 5 minutes');
  }
}
```

## License

Apache-2.0
