class AE_ProductPage {
  constructor(page) {
    this.page = page;

    this.searchInput         = page.locator('input#search_product');
    this.searchButton        = page.locator('button#submit_search');
    this.searchResultHeading = page.locator('h2.title', { hasText: 'Searched Products' });
    this.productCards        = page.locator('.productinfo');
    this.productNames        = page.locator('.productinfo p');
    this.productPrices       = page.locator('.productinfo h2');
    this.firstViewProduct    = page.locator('.choose a').first();
    this.productDetailName   = page.locator('.product-information h2');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/products');
    await this.searchInput.waitFor({ timeout: 15000 });
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async clickFirstProduct() {
    await this.page.goto('https://automationexercise.com/product_details/1');
    await this.productDetailName.waitFor({ timeout: 15000 });
  }

  getProductCards() {
    return this.productCards;
  }

  getProductCount() {
    return this.productCards.count();
  }

  getProductNames() {
    return this.productNames;
  }

  getProductPrices() {
    return this.productPrices;
  }

  getSearchResultHeading() {
    return this.searchResultHeading;
  }

  getProductDetailName() {
    return this.productDetailName;
  }
}

module.exports = { AE_ProductPage };
