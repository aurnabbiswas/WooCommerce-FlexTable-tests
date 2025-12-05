import { Page, expect } from '@playwright/test';

export class PluginsPage {
  constructor(private page: Page) {}

  private flexTableRow() {
    return this.page
      .locator('tr[data-slug*="flextable"], tr:has-text("FlexTable")')
      .first();
  }

  async assertFlexTablePresent() {
    await expect(this.flexTableRow()).toBeVisible();
  }

  async activateFlexTableIfNeeded() {
    const row = this.flexTableRow();
    await expect(row).toBeVisible();

    const activateButton = row.getByRole('link', { name: /Activate/i });
    if (await activateButton.isVisible()) {
      await activateButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }
}
