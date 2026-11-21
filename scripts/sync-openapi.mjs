// Copies the backend contract (openapi.json exported by FastAPI) into openapi/openapi.json.
//
//   npm run api:sync                 # from horizon-backend main on GitHub
//   OPENAPI_URL=http://localhost:8000/openapi.json npm run api:sync   # from a running api
//   OPENAPI_FILE=../horizon-backend/openapi.json npm run api:sync     # from a local checkout
//
// Exits 0 with a warning while the backend has not published its contract yet (S1-06 backend),
// unless OPENAPI_STRICT=1.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const DEFAULT_URL =
  'https://raw.githubusercontent.com/Horizon-Social-Network-M2-SRE/horizon-backend/main/openapi.json';
const OUT_DIR = 'openapi';
const OUT_FILE = `${OUT_DIR}/openapi.json`;
const strict = process.env.OPENAPI_STRICT === '1';

async function load() {
  if (process.env.OPENAPI_FILE) {
    return readFile(process.env.OPENAPI_FILE, 'utf8');
  }
  const url = process.env.OPENAPI_URL ?? DEFAULT_URL;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.text();
}

// Set process.exitCode instead of calling process.exit(): exiting while fetch handles are
// still closing crashes Node on Windows (libuv assertion in async.c).
async function main() {
  const raw = await load();
  if (raw === null) {
    const msg = 'backend openapi.json not published yet; keeping the current contract';
    if (strict) {
      console.error(`error: ${msg}`);
      process.exitCode = 1;
    } else {
      console.warn(`warning: ${msg}`);
    }
    return;
  }

  const spec = JSON.parse(raw);
  if (!spec.openapi || !spec.paths) {
    throw new Error('not an OpenAPI document (missing "openapi" or "paths")');
  }

  await mkdir(OUT_DIR, { recursive: true });
  // Stable formatting so a diff only shows contract changes.
  await writeFile(OUT_FILE, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(`openapi ${spec.openapi}, ${Object.keys(spec.paths).length} paths -> ${OUT_FILE}`);
}

await main();
