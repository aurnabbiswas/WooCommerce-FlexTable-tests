import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('cart/');
  }

  async assertHasItems() {
    const count = await this.page.locator('.cart_item').count();
    expect(count).toBeGreaterThan(0);
  }

  async proceedToCheckout() {
    await this.page.getByRole('link', { name: /Proceed to checkout/i }).click();
  }
}
