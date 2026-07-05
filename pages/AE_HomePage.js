class AE_HomePage {
  constructor(page) {
    this.page = page;

    this.loginNavLink    = page.getByRole('link', { name: /Signup.*Login/i });
    this.productsNavLink = page.getByRole('link', { name: /Products/i });
    this.cartNavLink     = page.getByRole('link', { name: /Cart/i });
    this.logo            = page.locator('#header .logo img');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com');
  }

  async clickLoginLink() {
    await this.loginNavLink.click();
  }

  async clickProductsLink() {
    await this.productsNavLink.click();
  }

  isLoaded() {
    return this.logo;
  }
}

module.exports = { AE_HomePage };
