import { Locator, Page } from '@playwright/test';

export class CreateCustomerPage {
  readonly page: Page;
  readonly salesButton: Locator;
  readonly customersMenuItem: Locator;
  readonly newButton: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.salesButton = page.getByRole('button', { name: 'Sales' });
    this.customersMenuItem = page.getByRole('menuitem', { name: 'Customers' });
    this.newButton = page.getByRole('button', { name: 'New' });
    this.name = page.getByRole('combobox', { name: 'Name (company or person)' });
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.phone = page.getByRole('textbox', { name: 'Phone' });
    this.saveButton = page.getByRole('button', { name: 'Save manually' });
  }

  async createCustomer(name: string, email: string, phone: string): Promise<void> {
    await this.salesButton.click();
    await this.customersMenuItem.click();
    await this.newButton.click();
    await this.name.fill(name);
    await this.name.press('Enter');
    await this.email.click();
    await this.email.fill(email);
    await this.phone.click();
    await this.phone.fill(phone);
    await this.saveButton.click();
  }
}


