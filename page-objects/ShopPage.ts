
import { Page, expect } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  async goto() {

    await this.page.goto('?post_type=product');
  }

  async addFirstProductToCart() {
    
    const loopButton = this.page
      .locator('a.add_to_cart_button, a.ajax_add_to_cart, a[href*="add-to-cart"]')
      .first();

    if (await loopButton.count()) {
      await expect(loopButton).toBeVisible({ timeout: 15000 });
      await loopButton.click();
      return;
    }


    const productLink = this.page
      .locator(
        'a[href*="?product="], a[href*="&product="], a[href*="?p="], a.woocommerce-LoopProduct-link'
      )
      .first();

    await productLink.waitFor({ state: 'visible', timeout: 15000 });
    await productLink.click();

    const singleButton = this.page
      .locator(
        'button.single_add_to_cart_button, button[name="add-to-cart"]'
      )
      .first();

    await expect(singleButton).toBeVisible({ timeout: 15000 });
    await singleButton.click();
  }
}
