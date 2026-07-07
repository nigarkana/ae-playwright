class AE_CartPage {
  constructor(page) {
    this.page = page;

    this.cartTable            = page.locator('#cart_info_table');
    this.emptyCartMessage     = page.locator('#empty_cart');
    this.proceedToCheckout    = page.locator('a.check_out');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/view_cart');
  }

  getProductRow(productId) {
    return this.page.locator(`#product-${productId}`);
  }

  getProductName(productId) {
    return this.getProductRow(productId).locator('.cart_description h4 a');
  }

  getProductPrice(productId) {
    return this.getProductRow(productId).locator('.cart_price p');
  }

  getProductQuantity(productId) {
    return this.getProductRow(productId).locator('.cart_quantity button');
  }

  getProductTotal(productId) {
    return this.getProductRow(productId).locator('.cart_total_price');
  }

  async deleteProduct(productId) {
    await this.getProductRow(productId).locator('.cart_quantity_delete').click();
  }

  getEmptyCartMessage() {
    return this.emptyCartMessage;
  }
}

module.exports = { AE_CartPage };
