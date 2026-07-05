class AE_LoginPage {
  constructor(page) {
    this.page = page;

    this.loginHeading    = page.getByRole('heading', { name: 'Login to your account' });
    this.emailInput      = page.locator('input[data-qa="login-email"]');
    this.passwordInput   = page.locator('input[data-qa="login-password"]');
    this.loginButton     = page.locator('button[data-qa="login-button"]');
    this.errorMessage    = page.getByText('Your email or password is incorrect!');
    this.loggedInBadge   = page.getByText('Logged in as');
    this.logoutLink      = page.getByRole('link', { name: /Logout/i });
    this.loginNavLink    = page.getByRole('link', { name: /Signup.*Login/i });
  }

  async waitForPage() {
    await this.page.waitForURL('**/login');
    await this.emailInput.waitFor({ timeout: 15000 });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  isLoggedIn() {
    return this.loggedInBadge;
  }

  isErrorVisible() {
    return this.errorMessage;
  }

  isLoginLinkVisible() {
    return this.loginNavLink;
  }
}

module.exports = { AE_LoginPage };
