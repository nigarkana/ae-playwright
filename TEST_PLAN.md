# Test Plan — Automation Exercise Website
**Project:** ae-playwright  
**Version:** 1.0  
**Date:** 2026-07-03  
**Author:** QA Engineer  
**Tool:** Playwright (JavaScript)  

---

## 1. Objective

To validate the core functionality of the **Home Page** and **Login Page** on [automationexercise.com](https://automationexercise.com) using automated end-to-end tests built with Playwright following the Page Object Model (POM) pattern.

---

## 2. Scope

### In Scope
- Home Page — navigation and page load
- Login Page — valid login, invalid login, empty fields, logout

### Out of Scope
- Product pages
- Cart and Checkout
- Signup / Registration
- Payment flows
- API testing

---

## 3. Test Environment

| Item | Detail |
|------|--------|
| URL | https://automationexercise.com |
| Browsers | Chromium, Firefox, WebKit (Safari) |
| Framework | Playwright v1.x |
| Language | JavaScript (Node.js) |
| Pattern | Page Object Model (POM) |
| CI | GitHub Actions |
| OS | macOS / Ubuntu (CI) |

---

## 4. Test Scenarios

### 4.1 Home Page

| TC ID | Test Case | Steps | Expected Result | Priority |
|-------|-----------|-------|----------------|----------|
| TC01 | Page loads successfully | 1. Navigate to https://automationexercise.com | Logo is visible | High |
| TC02 | Navigation links are visible | 1. Navigate to home page | Signup/Login, Products, Cart links are all visible | High |

---

### 4.2 Login Page

| TC ID | Test Case | Steps | Expected Result | Priority |
|-------|-----------|-------|----------------|----------|
| TC03 | Valid login | 1. Go to Login page 2. Enter valid email & password 3. Click Login | "Logged in as" badge is visible | High |
| TC04 | Invalid credentials | 1. Go to Login page 2. Enter wrong email & password 3. Click Login | Error message "Your email or password is incorrect!" is visible | High |
| TC05 | Empty fields | 1. Go to Login page 2. Leave email & password empty 3. Click Login | Login page heading remains visible (form does not submit) | Medium |
| TC06 | Logout after login | 1. Login with valid credentials 2. Click Logout | "Signup / Login" nav link is visible again | High |

---

## 5. Entry Criteria

- Playwright is installed and configured
- Test account exists on automationexercise.com
- All page objects are implemented
- Site is accessible

## 6. Exit Criteria

- All High priority test cases pass
- No P1 (critical) bugs are open
- Tests pass on all 3 browsers (Chromium, Firefox, WebKit)
- CI pipeline runs successfully on GitHub Actions

---

## 7. Test Data

| Data | Value | Notes |
|------|-------|-------|
| Valid Email | nimo.chen@gmail.com | Test account — not a real inbox |
| Valid Password | nimo@chen | Test account password |
| Invalid Email | wrong@email.com | Does not exist on site |
| Invalid Password | wrongpassword | Incorrect password |

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Site has ads/overlays that block elements | High | Use `data-qa` attributes instead of visual locators |
| Site is down or slow | Medium | Add retry logic in CI (`retries: 2`) |
| Placeholder text changes | Low | Use `data-qa` attributes — not text-based locators |
| Test account gets deleted | Medium | Re-create account and update credentials |

---

## 9. Defect Management

Bugs found during testing will be logged as GitHub Issues with the following labels:
- `bug` — functional defect
- `blocked` — test cannot run due to environment issue
- `enhancement` — improvement to test coverage

---

## 10. Deliverables

- [x] Page Object Model files (`pages/`)
- [x] Test spec file (`tests/automationExcercise.spec.js`)
- [x] Test Plan (`TEST_PLAN.md`)
- [ ] GitHub Repository
- [ ] GitHub Actions CI workflow
- [ ] README with CI badge
