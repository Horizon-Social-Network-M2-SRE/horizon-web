// Placeholder until horizon-backend publishes openapi.json (S1-06 backend).
// `npm run api:generate` overwrites this file with the real contract: never edit it by hand.
// It exists so that client.ts type-checks before the contract lands.

export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
  schemas: Record<string, never>;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
