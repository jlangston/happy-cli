#!/usr/bin/env bun

import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

// Get path to the actual CLI entrypoint and run it with bun
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const entrypoint = join(projectRoot, 'dist', 'index.mjs');

// Execute the actual CLI directly with bun
try {
  execFileSync('bun', [
    entrypoint,
    ...process.argv.slice(2)
  ], {
    stdio: 'inherit',
    env: process.env
  });
} catch (error) {
  // execFileSync throws if the process exits with non-zero
  process.exit(error.status || 1);
}
