import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { CreateOpportunityPage } from '../pages/CreateOppertionty';

const customerFile = path.resolve('TestData/customer_data.json');
const opportunityFile = path.resolve('TestData/opportunity_data.json');


test ('create new opportunity' , async ({page}) => {
const data = JSON.parse(
  fs.readFileSync(customerFile, 'utf-8')
);

const customer = data.customers.at(-1);
if (!customer) {
  throw new Error('Create a customer before running the opportunity test.');
}

await page.goto('https://azzrk.odoo.com/odoo/crm')

const opportunityPage = new CreateOpportunityPage(page);
const opportunityName = `${customer.name} opportunity ${Date.now()}`;
await opportunityPage.createOpportunity(
  customer.name,
  opportunityName,
  customer.email,
  customer.phone
);

fs.writeFileSync(opportunityFile, JSON.stringify({ name: opportunityName }, null, 2));
});
