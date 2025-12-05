# WooCommerce + FlexTable Automation Tests


This repository contains end-to-end UI automation for a **local WordPress (WPPOOL-style) site** that uses:

- **WooCommerce** for e-commerce flows  
- **FlexTable** plugin for table creation and display  

The tests are built to validate:

- FlexTable table creation from Google Sheets
- FlexTable display and settings on the frontend
- WooCommerce guest and logged-in checkout flows
- Order visibility in the customer account area

All tests are written using **Playwright Test Runner** (with **TypeScript/JavaScript**, depending on the project setup) and follow a **Page Object Model (POM)** approach.

---

## 1. Tech Stack & Tools

- Test Framework: Playwright Test Runner  
- Language: TypeScript / JavaScript (as configured in this repo)  
- Design Pattern: Page Object Model (POM)  
- Target App: Local WordPress site with WooCommerce + FlexTable  
- Main Browser: Chromium (other browsers can be added via Playwright config)  

---

## 2. Requirements

Before running the tests, make sure you have:

- **Node.js** (LTS, recommended ≥ 18.x)  
- **npm** (bundled with Node.js)  
- A **local WordPress site** running at:  
  BASE_URL = `http://localhost/wppool-site/`  
- WordPress admin user:  
  ADMIN_USERNAME = `admin`  
  ADMIN_PASSWORD = `1234567890@Ab`  
- **WooCommerce plugin** installed and activated  
- **FlexTable plugin** installed and activated  
- At least one product created and published in WooCommerce  

Additionally, the FlexTable tests assume:

- A valid **Google Sheet** that will be imported by FlexTable:  
  GSHEET_URL = `https://docs.google.com/spreadsheets/d/11qRH9xUuglOTIZa7JnWTVBYuGMT32ZhFuJ5_xypApGM/edit?gid=0#gid=0`
- A **frontend page** where the FlexTable shortcode is inserted:  
  FLEXTABLE_FRONTEND_URL = `http://localhost/wppool-site/flextable-test-page/`

You may adjust these URLs later, but the tests are designed with the above structure.

---

## 3. Project Structure (High Level)

A typical structure for this repository (names may vary slightly depending on your implementation) is:

- `tests/`
  - `flexTable.spec.*` → FlexTable admin + frontend tests
  - `woocommerce.spec.*` → WooCommerce cart + checkout + orders tests
- `pageObjects/` → Page Object classes for:
  - WordPress Admin Login
  - FlexTable plugin screens
  - WooCommerce Shop, Cart, Checkout, My Account
- `playwright.config.*` → Global Playwright configuration
- `package.json` → Scripts and dependencies

This structure allows separating concerns and reusing locators and actions across tests.

---

## 4. Environment Configuration (.env)

Create a file named `.env` in the root of the project to store environment variables used by the tests. Based on your values, it should contain at least:

BASE_URL=http://localhost/wppool-site/
ADMIN_USERNAME=admin
ADMIN_PASSWORD=1234567890@Ab

GSHEET_URL=https://docs.google.com/spreadsheets/d/11qRH9xUuglOTIZa7JnWTVBYuGMT32ZhFuJ5_xypApGM/edit?gid=0#gid=0
FLEXTABLE_FRONTEND_URL=http://localhost/wppool-site/flextable-test-page/

Notes:  
- `BASE_URL` points to your WordPress (admin/front) root. Many tests rely on this.  
- `ADMIN_USERNAME` and `ADMIN_PASSWORD` are used for logging into `/wp-admin`.  
- `GSHEET_URL` is the Google Sheet that FlexTable will import as a table.  
- `FLEXTABLE_FRONTEND_URL` is the page URL where the FlexTable shortcode is rendered and validated.  

If the project includes other variables (for example, a customer login for WooCommerce or a separate `FRONT_URL`), you can add them in the same `.env` file.

---

## 5. Local Setup & Installation

Follow these steps from a terminal in your working directory.

### 5.1 Clone the Repository

git clone https://github.com/aurnabbiswas/WooCommerce-FlexTable-tests.git  
cd WooCommerce-FlexTable-tests

### 5.2 Install Node Dependencies

npm install

This will install Playwright and any supporting libraries defined in `package.json`.

### 5.3 Install Playwright Browsers

npx playwright install

By default this installs Chromium, Firefox, and WebKit (depending on configuration). The tests primarily target Chromium, but you can update the config to run on more.

### 5.4 Configure Your WordPress Site

- Confirm your local WordPress is accessible via `http://localhost/wppool-site/`  
- Login to WordPress admin and:
  - Ensure WooCommerce is installed, activated, and basic setup done (Shop, Cart, Checkout, My Account pages created and published).
  - Ensure FlexTable is installed and activated.
- Ensure the page corresponding to `FLEXTABLE_FRONTEND_URL` exists:
  - Create or edit a page and insert the FlexTable shortcode that matches the table created in tests.

---

## 6. Running the Test Suite

All commands below should be run from the project root folder.

### 6.1 Run All Tests

npx playwright test

This will:

- Read configuration from `playwright.config.*`
- Use your `.env` values
- Execute all spec files inside `tests/`
- Generate any configured output (reports, traces, screenshots)

### 6.2 Run a Single Test File

To run only FlexTable-related tests:

npx playwright test tests/flexTable.spec.*

To run only WooCommerce-related tests:

npx playwright test tests/woocommerce.spec.*

Replace `*` with the actual extension (e.g., `.ts` or `.js`) used in your project if needed.

### 6.3 Run a Single Test by Title

You can also target by test name using the `-g` flag:

npx playwright test -g "should create a flex table from google sheet"

Use the actual test title string defined in your spec file.

---

## 7. Viewing the Report

After completing a test run, you can open the Playwright HTML report (if reporting is enabled in config) using:

npx playwright show-report

This opens a browser window showing:

- Test run summary (passed/failed/skipped)
- Detailed steps for each test
- Attachments (traces, screenshots, console logs) if configured

---

## 8. What the Tests Cover

### 8.1 FlexTable plugin

Typical FlexTable scenarios automated by this suite include:

- Logging into WordPress admin using `BASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- Navigating to the FlexTable plugin screen
- Creating a new table by importing `GSHEET_URL`
- Saving the table and verifying it appears in the FlexTable list
- Using the generated shortcode on the frontend page `FLEXTABLE_FRONTEND_URL`
- Validating that:
  - Table title is visible
  - Table description (if enabled) appears
  - Table data matches Google Sheet content
  - Pagination is visible and functional
  - Rows per page and table height settings behave correctly
- Deleting the table and confirming that it no longer renders on the frontend

### 8.2 WooCommerce flows

WooCommerce tests generally include:

- Navigating to shop or product listing
- Adding a product to the cart
- Viewing cart details and proceeding to checkout
- Filling billing/shipping information (for guest and/or logged-in users)
- Placing an order and verifying success message
- Logging into My Account (if applicable) and checking that the order appears in the Orders list

---

## 9. Common Issues & Troubleshooting

- Login fails:
  - Double-check the credentials in `.env`: `ADMIN_USERNAME` and `ADMIN_PASSWORD`
  - Make sure your local server (e.g., Apache via XAMPP/WAMP) is running and accessible
- 404 pages or broken routes:
  - Go to WordPress Settings → Permalinks and click “Save Changes” to regenerate rules
  - Verify the URL in `BASE_URL` and `FLEXTABLE_FRONTEND_URL`
- FlexTable table not rendering:
  - Confirm FlexTable plugin is activated
  - Make sure your created table is published and shortcode is inserted on the correct page
- Google Sheets import issues:
  - Check that `GSHEET_URL` is publicly accessible or shared in a way that FlexTable can read
  - Confirm that the sheet structure matches what your test expects (header row, data rows)
- Checkout errors:
  - Ensure WooCommerce is fully configured (currency, basic settings)
  - Confirm there is at least one published product with a price

---

## 10. Extending the Suite

You can extend this suite by:

- Adding new Page Object classes under `pageObjects/` for other admin or frontend sections
- Creating additional spec files under `tests/` for:
  - Coupon application scenarios
  - Different payment methods
  - Additional FlexTable layouts and styles
  - Negative scenarios (invalid login, missing fields, etc.)
- Updating `playwright.config.*` to:
  - Run tests on multiple browsers
  - Enable parallelism or retries
  - Integrate with CI/CD (GitHub Actions, GitLab CI, etc.)

---

## 11. Contact

For any questions, clarifications, or improvements regarding this project:

Author: **Aurnab Biswas**  
Email: **biswasarno75@gmail.com**  

