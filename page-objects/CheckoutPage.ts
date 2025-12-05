import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillBillingDetails() {
    await this.page.fill('#billing_first_name', 'Test');
    await this.page.fill('#billing_last_name', 'User');
    await this.page.fill('#billing_address_1', 'Test Street 123');
    await this.page.fill('#billing_city', 'Dhaka');
    await this.page.fill('#billing_postcode', '1200');
    await this.page.fill('#billing_phone', '01700000000');
    await this.page.fill('#billing_email', 'test@example.com');
  }

  async selectCODIfAvailable() {
    const cod = this.page.locator('input[id*="payment_method_cod"]');
    if (await cod.isVisible()) {
      await cod.check();
    }
  }

  async placeOrder() {
    await this.page.getByRole('button', { name: /Place order/i }).click();
  }

  async assertOrderReceived() {
    await this.page.waitForURL('**/order-received/**', { timeout: 30000 });
    await expect(this.page.getByText(/Order received/i)).toBeVisible();
  }
}
