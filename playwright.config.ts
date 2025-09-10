import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  retries: 1,
  use: {
    headless: false,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */
  ],
 
  reporter: 'html',
});
