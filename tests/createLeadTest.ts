import { test } from '@playwright/test';
import { CreateCustomerPage } from '../pages/CreateCustomer';
import { SaveDataToFile } from '../utilites/append_data';

const customerData = {
    "name" : "feras company",
    "email" : "feras@gmail.com",
    "phone" : "01004638678"
}

test ('create new customer' , async ({page}) => {
 await page.goto('https://azzrk.odoo.com/odoo/crm')

  const customerPage = new CreateCustomerPage(page);
  await customerPage.createCustomer(customerData.name, customerData.email, customerData.phone);

  
  SaveDataToFile(customerData);
});

/* await page.getByRole('button', { name: 'Sales' }).click();
await page.getByRole('menuitem', { name: 'Customers' }).click();
await page.getByRole('button', { name: 'New' }).click();
await page.getByRole('combobox', { name: 'Name (company or person)' }).click();
await page.getByRole('combobox', { name: 'Name (company or person)' }).fill('feras company');
await page.getByRole('combobox', { name: 'Name (company or person)' }).press('Enter');
await page.getByRole('textbox', { name: 'Email' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('feras@gmail.com');
await page.getByRole('textbox', { name: 'Phone' }).click();
await page.getByRole('textbox', { name: 'Phone' }).fill('01004638678');
 */