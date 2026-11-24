import { Locator, Page } from '@playwright/test';

export class CreateOpportunityPage {
  readonly newButton: Locator;
  readonly contact: Locator;
  readonly opportunityName: Locator;
  readonly contactEmail: Locator;
  readonly contactPhone: Locator;
  readonly addButton: Locator;

  constructor(private readonly page: Page) {
    this.newButton = page.getByRole('button', { name: 'New' });
    this.contact = page.getByRole('combobox', { name: 'Contact' });
    this.opportunityName = page.getByRole('textbox', { name: "Opportunity's Name" });
    this.contactEmail = page.getByRole('textbox', { name: 'Contact Email' });
    this.contactPhone = page.getByRole('textbox', { name: 'Contact Phone' });
    this.addButton = page.getByRole('button', { name: 'Add', exact: true });
  }

  async createOpportunity(
    contact: string,
    opportunityName: string,
    email: string,
    phone: string
  ) {
    await this.newButton.click();
    await this.contact.click();
    await this.contact.fill(contact);
    await this.contact.press('Enter');
    await this.opportunityName.click();
    await this.opportunityName.fill(opportunityName);
    await this.contactEmail.click();
    await this.contactEmail.fill(email);
    await this.contactPhone.click();
    await this.contactPhone.fill(phone);
    await this.addButton.click();
  }
}
