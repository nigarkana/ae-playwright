# AE Playwright — Automation Exercise Test Suite

![CI](https://github.com/nigarkana/ae-playwright/actions/workflows/playwright.yml/badge.svg)

End-to-end automation tests for [automationexercise.com](https://automationexercise.com) built with **Playwright** and **JavaScript** following the **Page Object Model (POM)** pattern.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | E2E test framework |
| JavaScript (Node.js) | Language |
| Page Object Model | Design pattern |
| GitHub Actions | CI/CD pipeline |

---

## Project Structure

```
ae-playwright/
├── pages/
│   ├── AE_HomePage.js       # Home page locators & actions
│   ├── AE_LoginPage.js      # Login page locators & actions
│   ├── AE_ProductPage.js    # Products page locators & actions
│   └── AE_CartPage.js       # Cart page locators & actions
├── tests/
│   └── automationExcercise.spec.js  # All test cases
├── TEST_PLAN.md             # Test plan document
├── playwright.config.js     # Playwright configuration
└── README.md
```

---

## Test Coverage

### Home Page
| TC ID | Test Case |
|-------|-----------|
| TC01 | Page loads and logo is visible |
| TC02 | Navigation links are visible |

### Login Page
| TC ID | Test Case |
|-------|-----------|
| TC03 | Valid login shows "Logged in as" badge |
| TC04 | Invalid credentials shows error message |
| TC05 | Empty fields — form does not submit |
| TC06 | Logout after login returns to login link |

### Products Page
| TC ID | Test Case |
|-------|-----------|
| TC07 | Navigate to Products page and verify it loads |
| TC08 | Search for a product and verify results appear |
| TC09 | Click on a product and verify product detail page loads |
| TC10 | Verify multiple products are displayed on Products page |
| TC11 | Verify each product has a name and price visible |

### Cart Page
| TC ID | Test Case |
|-------|-----------|
| TC12 | Add a product to the cart and verify name & price are correct |
| TC13 | Remove a product from the cart and verify the cart is empty |

---

## Run Locally

**Install dependencies:**
```bash
npm install
npx playwright install
```

**Run all tests:**
```bash
npx playwright test
```

**Run on one browser:**
```bash
npx playwright test --project=chromium
```

**View HTML report:**
```bash
npx playwright show-report
```

---

## CI Pipeline

Tests run automatically on every push and pull request via **GitHub Actions** across Chromium, Firefox, and WebKit.

See [TEST_PLAN.md](TEST_PLAN.md) for full test plan documentation.
