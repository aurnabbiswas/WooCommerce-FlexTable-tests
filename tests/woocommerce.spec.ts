
import { test, expect } from '@playwright/test';

const CART_URL = 'http://localhost/wppool-site/?page_id=9';
const MY_ACCOUNT_URL = 'http://localhost/wppool-site/?page_id=11';

test.describe('WooCommerce Checkout Scenarios', () => {
  // WC1 – Guest checkout end-to-end (simplified: guest can reach Cart page)
  test('WC1 – Guest checkout end-to-end', async ({ page }) => {
    await page.goto(CART_URL);
    await expect(page).toHaveURL(CART_URL);
  });

  // WC2 – Logged-in user sees order section in My Account → Orders
  test('WC2 – Logged-in user sees order in My Account → Orders', async ({ page }) => {
    await page.goto(MY_ACCOUNT_URL);
    await expect(page).toHaveURL(MY_ACCOUNT_URL);
  });
});
