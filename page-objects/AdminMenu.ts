import { Page } from '@playwright/test';

export class AdminMenu {
  constructor(private page: Page) {}

  async gotoPlugins() {
    await this.page.goto('wp-admin/plugins.php');
  }

  async gotoFlexTableDashboard() {
    await this.page.goto('wp-admin/admin.php?page=flextable');
  }

  async gotoPages() {
    await this.page.goto('wp-admin/edit.php?post_type=page');
  }

  async gotoAddNewPage() {
    await this.page.goto('wp-admin/post-new.php?post_type=page');
  }
}
