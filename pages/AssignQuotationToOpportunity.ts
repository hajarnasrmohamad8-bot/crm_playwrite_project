import { Locator, Page } from '@playwright/test';

/** Page actions for scheduling an activity plan on an opportunity. */
export class AssignQuotationToOpportunityPage {
  readonly page: Page;
  readonly salesButton: Locator;
  readonly myPipelineMenuItem: Locator;
  readonly removeMyOpportunitiesFilterButton: Locator;
  readonly activityButton: Locator;
  readonly scheduleButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.salesButton = page.getByRole('button', { name: 'Sales' });
    this.myPipelineMenuItem = page.getByRole('menuitem', { name: 'My Pipeline' });
    this.removeMyOpportunitiesFilterButton = page.getByRole('button', { name: 'Remove' });
    this.activityButton = page.getByRole('button', { name: 'Activity', exact: true });
    this.scheduleButton = page.getByRole('button', { name: 'Schedule' });
  }

  async assignActivityToOpportunity(opportunityName: string, activityName: string): Promise<void> {
    await this.salesButton.click();
    await this.myPipelineMenuItem.click();
    if (await this.removeMyOpportunitiesFilterButton.isVisible()) {
      await this.removeMyOpportunitiesFilterButton.click();
    }
    const escapedOpportunityName = opportunityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await this.page.getByRole('link', {
      name: new RegExp(escapedOpportunityName, 'i'),
    }).click();
    await this.activityButton.click();
    await this.page.locator('span').filter({ hasText: activityName }).first().click();
    await this.scheduleButton.click();
  }
}
