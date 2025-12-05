import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async assertOnDashboard() {
    await expect(this.page.locator('#wpadminbar')).toBeVisible();
    await expect(this.page.getByText(/Dashboard/i)).toBeVisible();
  }
}
