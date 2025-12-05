
import { Page } from '@playwright/test';

export class FlexTableDashboardPage {
  constructor(private page: Page) {}

  async assertLoaded() {

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async clickCreateNewTable() {
    const create = this.page
      .locator('a, button')
      .filter({ hasText: /Create new table/i })
      .first();

    if (await create.count()) {
      await create.click();
    }
    
  }

  async getFirstTableShortcode(): Promise<string> {
    const rows = this.page.locator('table tbody tr');
    if ((await rows.count()) === 0) {
      
      return '';
    }

    const row = rows.first();
    const shortcodeCell = row.locator('td').nth(2); // 3rd column usually holds shortcode
    const shortcodeText = (await shortcodeCell.innerText()).trim();
    return shortcodeText;
  }

  async openTableByName(name: string) {
    const row = this.page
      .locator('table tbody tr')
      .filter({ hasText: name })
      .first();

    if (await row.count()) {
      await row.getByRole('link', { name: /edit/i }).click().catch(() => {});
    }
  
  }

  async deleteTableByName(name: string) {
    const row = this.page
      .locator('table tbody tr')
      .filter({ hasText: name })
      .first();

    if (!(await row.count())) {
      return;
    }

    await row.hover().catch(() => {});
    const deleteLink = row.getByRole('link', { name: /delete/i });
    await deleteLink.click().catch(() => {});


    await this.page
      .getByRole('button', { name: /ok|confirm|yes/i })
      .click()
      .catch(() => {});
  }
}
