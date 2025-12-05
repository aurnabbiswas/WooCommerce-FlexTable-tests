
import { Page, expect } from '@playwright/test';

export class FrontendTablePage {
  constructor(private page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  
  async assertTableVisible() {
    const table = this.page.locator('table');
    await expect(table).toBeVisible({ timeout: 15000 });
  }


  async expectSomeCellsNotEmpty() {
    const firstCell = this.page.locator('table tbody tr td').first();
    await expect(firstCell).toBeVisible({ timeout: 15000 });
    const text = (await firstCell.innerText()).trim();
    expect(text.length).toBeGreaterThan(0);
  }

 
  async expectTitleVisible(title: string) {
    
    const titleLocator = this.page.getByText(title, { exact: false }).first();
    await expect(titleLocator).toBeVisible({ timeout: 10000 });
  }

  async expectDescriptionVisible(desc: string) {
    const descLocator = this.page.getByText(desc, { exact: false }).first();
    await expect(descLocator).toBeVisible({ timeout: 10000 });
  }

 
  async expectEntryInfoVisible() {
   
    const info = this.page.getByText(/Showing\s+\d+\s+to\s+\d+\s+of\s+\d+\s+entries/i);
    await expect(info).toBeVisible({ timeout: 10000 });
  }

  async expectPaginationVisible() {
    
    const pagination = this.page.locator(
      '.dataTables_paginate, .paginate_button, nav[aria-label*="pagination" i]'
    );
    await expect(pagination.first()).toBeVisible({ timeout: 10000 });
  }

  
  async expectRowsPerPage(maxRows: number) {
    const rows = await this.page.locator('table tbody tr').count();
    
    expect(rows).toBeLessThanOrEqual(maxRows);
  }

  async expectTableHeight(expectedHeightPx: number) {
    const table = this.page.locator('table').first();
    await expect(table).toBeVisible({ timeout: 10000 });

    const height = await table.evaluate(el => (el as HTMLElement).getBoundingClientRect().height);
    
    expect(height).toBeGreaterThanOrEqual(expectedHeightPx - 80);
  }


  async expectTableDeletedMessage() {
    const msg = this.page.getByText(/table maybe deleted or can’t be loaded/i);
    await expect(msg).toBeVisible({ timeout: 10000 });
  }
}
