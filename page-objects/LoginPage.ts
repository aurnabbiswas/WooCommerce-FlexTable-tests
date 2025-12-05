import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('wp-login.php');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user_login', username);
    await this.page.fill('#user_pass', password);
    await this.page.click('#wp-submit');
  }

  async assertLoggedIn() {
    await this.page.waitForURL('**/wp-admin/**');
    await expect(this.page.locator('#wpadminbar')).toBeVisible();
  }
}
