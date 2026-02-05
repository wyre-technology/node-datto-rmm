# node-datto-rmm

Comprehensive, fully-typed Node.js/TypeScript library for the Datto RMM API v2.

## Project Info

- **PRD**: `/Users/asachs/work/wyre/engineering/projects/mspMarketPlace/files/node-datto-rmm-prd.md`
- **Taskmaster Tag**: `node-datto-rmm`
- **GitHub Repo**: https://github.com/asachs01/node-datto-rmm

## Build Commands

- `npm run build`: Build the project
- `npm run test`: Run tests with Vitest
- `npm run lint`: Run ESLint
- `npm run typecheck`: TypeScript type checking

## Technical Stack

- Node.js >= 18.0.0
- TypeScript >= 5.0
- ESM with CJS compatibility
- HTTP client: undici (Node built-in fetch)
- Test framework: Vitest
- Mock server: MSW or nock
- Build tool: tsup

## Key Features

- Complete Datto RMM API v2 coverage (50+ endpoints)
- OAuth 2.0 token lifecycle management (100-hour expiry)
- Platform-aware (6 platforms: Pinotage, Merlot, Concord, Vidal, Zinfandel, Syrah)
- Automatic pagination (250/page max)
- Rate limiting (600 req/60s with IP block protection)
- 25+ typed alert context discriminated unions
- Unix timestamp handling (millisecond precision)
- Zero live API testing (all mocked)
