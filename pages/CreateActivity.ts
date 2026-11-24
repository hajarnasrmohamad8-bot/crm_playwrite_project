import { Locator, Page } from '@playwright/test';

/** Page actions for creating an activity plan. */
export class CreateActivityPage {
  readonly page: Page;
  readonly configurationButton: Locator;
  readonly activityPlansMenuItem: Locator;
  readonly newButton: Locator;
  readonly planName: Locator;
  readonly addLineButton: Locator;
  readonly lineName: Locator;
  readonly offset: Locator;
  readonly planDateOffset: Locator;
  readonly afterPlanDate: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.configurationButton = page.getByRole('button', { name: 'Configuration' });
    this.activityPlansMenuItem = page.getByRole('menuitem', { name: 'Activity Plans' });
    this.newButton = page.getByRole('button', { name: 'New' });
    this.planName = page.getByRole('textbox', { name: 'Plan Name' });
    this.addLineButton = page.getByRole('button', { name: 'Add a line' });
    this.lineName = page.getByRole('textbox', { name: 'e.g. Discuss Proposal' });
    this.offset = page.getByRole('cell', { name: '0' }).getByRole('textbox');
    this.planDateOffset = page.getByRole('cell', { name: 'Before Plan Date' }).getByRole('textbox');
    this.afterPlanDate = page.getByRole('menuitem', { name: 'After Plan Date' });
    this.saveButton = page.getByRole('button', { name: 'Save manually' });
  }

  async createActivity(name: string): Promise<void> {
    await this.configurationButton.click();
    await this.activityPlansMenuItem.click();
    await this.newButton.click();
    await this.planName.click();
    await this.planName.fill(name);
    await this.addLineButton.click();
    await this.lineName.click();
    await this.lineName.dblclick();
    await this.lineName.fill(name);
    await this.offset.click();
    await this.offset.fill('2');
    await this.planDateOffset.click();
    await this.afterPlanDate.click();
    await this.saveButton.click();
  }
}
