import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';

import { workspaceRoot } from '@nx/devkit';
import { join } from 'node:path';

const baseURL = process.env['BASE_URL'] || 'http://localhost:3000';
export const STORAGE_STATE = join(__dirname, 'src/core/storageState.json');
export const GLOBAL_SETUP = join(__dirname, 'src/core/global.setup.ts');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  globalSetup: GLOBAL_SETUP,
  use: {
    baseURL,
    storageState: STORAGE_STATE,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'nx dev:uat web',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
