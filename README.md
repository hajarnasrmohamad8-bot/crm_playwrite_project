# CRM Playwright Project

This repository contains end-to-end browser tests for CRM workflows in Odoo, written with Playwright and TypeScript. Page objects keep the browser interactions separate from test data and test orchestration.

The current suite covers logging in, creating a customer, creating an opportunity, creating an activity plan, assigning that plan to an opportunity, and moving an opportunity through the **New**, **Proposition**, and **Won** pipeline stages.

## Setup

1. Install Node.js (LTS).
2. Install dependencies:

   ```sh
   npm ci
   npx playwright install chromium
   ```

3. Copy `TestData/login_data.example.json` to `TestData/login_data.json` and enter credentials for an Odoo test account. `login_data.json` is ignored by Git, so credentials stay local.

## Run tests

Run the full configured suite:

```sh
npx playwright test
```

In PowerShell, use `npx.cmd playwright test` if script execution policy blocks `npx.ps1`.

Run a single workflow project:

```sh
npx playwright test --project=CreateActivity
npx playwright test --project=AssignQuotationToOpportunity
npx playwright test --project=MoveOpportunityToProposition
npx playwright test --project=MoveOpportunityToWon
```

The assignment and stage-change projects run their required setup projects first. Run them against a test Odoo database and account: the tests create customers, activity plans, and opportunities, and update opportunity stages.

Generated test data files (`customer_data.json`, `activity_data.json`, and `opportunity_data.json`) are local-only and are not committed. The suite needs a valid login data file before Playwright loads the tests.
