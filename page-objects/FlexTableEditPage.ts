import { Page, expect } from '@playwright/test';

export class FlexTableEditPage {
  constructor(private page: Page) {}


  async createFromGoogleSheet(sheetUrl: string, title: string, description: string) {
    
    const nameInputByLabel = this.page.getByLabel(/table name/i);
    if (await nameInputByLabel.count()) {
      await nameInputByLabel.fill(title);
    } else {
      await this.page.locator('form input[type="text"]').first().fill(title);
    }

 
    const descByLabel = this.page.getByLabel(/description/i);
    if (await descByLabel.count()) {
      await descByLabel.fill(description);
    } else {
      const descTextarea = this.page.locator('textarea').first();
      if (await descTextarea.count()) {
        await descTextarea.fill(description);
      }
    }


    let sheetInput = this.page.getByLabel(/(google.*sheet|sheet url|sheet link)/i);
    if (!(await sheetInput.count())) {
      sheetInput = this.page.locator('input[type="url"]');
    }
    if (!(await sheetInput.count())) {
      sheetInput = this.page.locator('input[placeholder*="https://docs.google.com"]');
    }
    await sheetInput.first().fill(sheetUrl);


    const fetchButtons = this.page.getByRole('button', { name: /fetch|save/i });
    if (await fetchButtons.count()) {
      await fetchButtons.first().click();
    } else {
      await this.page.locator('button.button-primary, .ft-save-button').first().click();
    }

    await this.page.waitForLoadState('networkidle');
  }

  private async openLayoutTab() {
    const tab = this.page.getByRole('tab', { name: /layout/i });
    if (await tab.count()) {
      await tab.click();
    } else {
      await this.page.getByText(/layout/i).first().click();
    }
  }

  private async openStylingTab() {
    const tab = this.page.getByRole('tab', { name: /styling|style/i });
    if (await tab.count()) {
      await tab.click();
    } else {
      await this.page.getByText(/styling|style/i).first().click();
    }
  }

  private async clickSave() {
    const saveBtn = this.page.getByRole('button', { name: /save/i });
    if (await saveBtn.count()) {
      await saveBtn.first().click();
    } else {
      await this.page.locator('button.button-primary, .ft-save-button').first().click();
    }
    await this.page.waitForLoadState('networkidle');
  }


  async enableShowTitleAndDescriptionBelow() {
    await this.openLayoutTab();
    const showTitle = this.page.getByLabel(/show table title/i);
    const showDescBelow = this.page.getByLabel(/description.*below/i);

    if (await showTitle.count()) await showTitle.check();
    if (await showDescBelow.count()) await showDescBelow.check();

    await this.clickSave();
  }


  async enableEntryInfoAndPagination() {
    await this.openLayoutTab();
    const entryInfo = this.page.getByLabel(/entry info/i);
    const pagination = this.page.getByLabel(/pagination/i);

    if (await entryInfo.count()) await entryInfo.check();
    if (await pagination.count()) await pagination.check();

    await this.clickSave();
  }

  
  async setRowsPerPageAndTableHeight(rows: number, heightPx: number) {
    await this.openStylingTab();

    const rowsInput = this.page.getByLabel(/rows per page/i);
    if (await rowsInput.count()) {
      await rowsInput.fill(String(rows));
    }

    const heightInput = this.page.getByLabel(/table height/i);
    if (await heightInput.count()) {
      await heightInput.fill(String(heightPx));
    }

    await this.clickSave();
  }
}
