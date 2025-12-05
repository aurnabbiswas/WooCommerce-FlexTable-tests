import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost/wppool-site/',
    headless: false,
  },
  timeout: 60000,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
