const { test, expect } = require('@playwright/test');
const { AE_HomePage }    = require('../pages/AE_HomePage');
const { AE_LoginPage }   = require('../pages/AE_LoginPage');
const { AE_ProductPage } = require('../pages/AE_ProductPage');
const { AE_CartPage }    = require('../pages/AE_CartPage');

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

test.describe('Products Page', () => {

  test('TC07 - should navigate to Products page and show all products', async ({ page }) => {
    const productPage = new AE_ProductPage(page);

    await productPage.goto();

    await expect(productPage.getProductCards().first()).toBeVisible();
  });

  test('TC08 - should search for a product and show results', async ({ page }) => {
    const productPage = new AE_ProductPage(page);

    await productPage.goto();
    await productPage.searchProduct('top');

    await expect(productPage.getSearchResultHeading()).toBeVisible();
    await expect(productPage.getProductCards().first()).toBeVisible();
  });

  test('TC09 - should open product detail page when clicking a product', async ({ page }) => {
    const productPage = new AE_ProductPage(page);

    await productPage.goto();
    await productPage.clickFirstProduct();

    await expect(productPage.getProductDetailName()).toBeVisible();
  });

  test('TC10 - should display multiple products on Products page', async ({ page }) => {
    const productPage = new AE_ProductPage(page);

    await productPage.goto();

    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThan(1);
  });

  test('TC11 - should show name and price for each product', async ({ page }) => {
    const productPage = new AE_ProductPage(page);

    await productPage.goto();

    await expect(productPage.getProductNames().first()).toBeVisible();
    await expect(productPage.getProductPrices().first()).toBeVisible();
  });

});

test.describe('Cart Page', () => {

  test('TC12 - should add a product to the cart and show correct details', async ({ page }) => {
    const productPage = new AE_ProductPage(page);
    const cartPage    = new AE_CartPage(page);

    await productPage.clickFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();

    await expect(cartPage.getProductName(1)).toHaveText('Blue Top');
    await expect(cartPage.getProductPrice(1)).toHaveText('Rs. 500');
  });

  test('TC13 - should remove a product from the cart', async ({ page }) => {
    const productPage = new AE_ProductPage(page);
    const cartPage    = new AE_CartPage(page);

    await productPage.clickFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();
    await expect(cartPage.getProductRow(1)).toBeVisible();

    await cartPage.deleteProduct(1);

    await expect(cartPage.getEmptyCartMessage()).toBeVisible();
  });

  test('TC14 - should show Proceed To Checkout button when cart has items', async ({ page }) => {
    const productPage = new AE_ProductPage(page);
    const cartPage    = new AE_CartPage(page);

    await productPage.clickFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();

    await expect(cartPage.getProceedToCheckoutButton()).toBeVisible();
  });

  test('TC15 - should update quantity and total price when adding a custom quantity', async ({ page }) => {
    const productPage = new AE_ProductPage(page);
    const cartPage    = new AE_CartPage(page);

    await productPage.clickFirstProduct();
    await productPage.setQuantity(3);
    await productPage.addToCart();
    await productPage.goToCart();

    await expect(cartPage.getProductQuantity(1)).toHaveText('3');
    await expect(cartPage.getProductTotal(1)).toHaveText('Rs. 1500');
  });

  test('TC16 - should add multiple products to the cart and show all items', async ({ page }) => {
    const productPage = new AE_ProductPage(page);
    const cartPage    = new AE_CartPage(page);

    await productPage.clickFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();

    await productPage.goToProductDetails(2);
    await productPage.addToCart();
    await productPage.goToCart();

    await expect(cartPage.getProductName(1)).toHaveText('Blue Top');
    await expect(cartPage.getProductName(2)).toHaveText('Men Tshirt');
  });

  test('TC17 - should remove one product and keep the other in the cart', async ({ page }) => {
    const productPage = new AE_ProductPage(page);
    const cartPage    = new AE_CartPage(page);

    await productPage.clickFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();

    await productPage.goToProductDetails(2);
    await productPage.addToCart();
    await productPage.goToCart();

    await cartPage.deleteProduct(1);

    await expect(cartPage.getProductRow(1)).toBeHidden();
    await expect(cartPage.getProductRow(2)).toBeVisible();
    await expect(cartPage.getProductName(2)).toHaveText('Men Tshirt');
    await expect(cartPage.getEmptyCartMessage()).toBeHidden();
  });

  test('TC18 - should prompt to login when proceeding to checkout while logged out', async ({ page }) => {
    const productPage = new AE_ProductPage(page);
    const cartPage    = new AE_CartPage(page);

    await productPage.clickFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();

    await cartPage.clickProceedToCheckout();

    await expect(cartPage.getCheckoutModalMessage()).toHaveText('Register / Login account to proceed on checkout.');
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
