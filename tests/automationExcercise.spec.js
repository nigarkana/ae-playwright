const { test, expect } = require('@playwright/test');
const { AE_HomePage }  = require('../pages/AE_HomePage');
const { AE_LoginPage } = require('../pages/AE_LoginPage');

const VALID_EMAIL    = 'nimo.chen@gmail.com';
const VALID_PASSWORD = 'nimo@chen';

test.describe('Home Page', () => {

  test('TC01 - should load home page and show logo', async ({ page }) => {
    const homePage = new AE_HomePage(page);

    await homePage.goto();

    await expect(homePage.isLoaded()).toBeVisible();
  });

  test('TC02 - should show main navigation links', async ({ page }) => {
    const homePage = new AE_HomePage(page);

    await homePage.goto();

    await expect(homePage.loginNavLink).toBeVisible();
    await expect(homePage.productsNavLink).toBeVisible();
    await expect(homePage.cartNavLink).toBeVisible();
  });

});

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new AE_HomePage(page);
    await homePage.goto();
    await homePage.clickLoginLink();
  });

  test('TC03 - should log in with valid credentials', async ({ page }) => {
    const loginPage = new AE_LoginPage(page);

    await loginPage.waitForPage();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await expect(loginPage.isLoggedIn()).toBeVisible();
  });

  test('TC04 - should show error with invalid credentials', async ({ page }) => {
    const loginPage = new AE_LoginPage(page);

    await loginPage.waitForPage();
    await loginPage.login('wrong@email.com', 'wrongpassword');

    await expect(loginPage.isErrorVisible()).toBeVisible();
  });

  test('TC05 - should not login with empty fields', async ({ page }) => {
    const loginPage = new AE_LoginPage(page);

    await loginPage.waitForPage();
    await loginPage.login('', '');

    // Page should stay on login — heading still visible
    await expect(loginPage.loginHeading).toBeVisible();
  });

  test('TC06 - should logout successfully after login', async ({ page }) => {
    const loginPage = new AE_LoginPage(page);

    await loginPage.waitForPage();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    await expect(loginPage.isLoggedIn()).toBeVisible();

    await loginPage.logout();

    await expect(loginPage.isLoginLinkVisible()).toBeVisible();
  });

});
