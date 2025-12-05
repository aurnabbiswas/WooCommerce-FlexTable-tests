import { Page, expect } from '@playwright/test';

export class MyAccountPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('my-account/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.getByRole('button', { name: /Log in/i }).click();
  }

  async gotoOrders() {
    await this.page.getByRole('link', { name: /Orders/i }).click();
  }

  async assertHasOrders() {
    await expect(this.page.locator('table.my_account_orders')).toBeVisible();
    const rows = await this.page
      .locator('table.my_account_orders tbody tr')
      .count();
    expect(rows).toBeGreaterThan(0);
  }
}
