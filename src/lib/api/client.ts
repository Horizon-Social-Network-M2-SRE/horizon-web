// Typed client for the Horizon API.
// `schema.d.ts` is generated from openapi/openapi.json by `npm run api:generate`: never edit it.
import createClient from 'openapi-fetch';
import type { paths } from './schema';

// The browser reaches the api on the same origin through the ingress (/api -> api service).
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api';

export const api = createClient<paths>({
  baseUrl,
  // The refresh token lives in an httpOnly cookie.
  credentials: 'include',
});

export type { paths };
