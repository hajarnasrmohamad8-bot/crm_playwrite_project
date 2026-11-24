import { expect, Locator, Page } from '@playwright/test';

/** Page actions for moving opportunities between pipeline stages. */
export class MoveToPropositionPage {
  readonly salesButton: Locator;
  readonly myPipelineMenuItem: Locator;

  constructor(private readonly page: Page) {
    this.salesButton = page.getByRole('button', { name: 'Sales' });
    this.myPipelineMenuItem = page.getByRole('menuitem', { name: 'My Pipeline' });
  }

  async moveOpportunityToProposition(opportunityName: string): Promise<void> {
    await this.moveOpportunityToStage(opportunityName, 'New', 'Proposition');
  }

  async moveOpportunityToWon(opportunityName: string): Promise<void> {
    await this.moveOpportunityToStage(opportunityName, 'Proposition', 'Won');
  }

  private async moveOpportunityToStage(
    opportunityName: string,
    sourceStage: string,
    destinationStage: string
  ): Promise<void> {
    await this.salesButton.click();
    await this.myPipelineMenuItem.click();

    const myOpportunitiesFilter = this.page.getByText('My Opportunities', { exact: true });
    if (await myOpportunitiesFilter.isVisible()) {
      const searchFilter = this.page.getByRole('listitem', { name: 'search' })
        .filter({ has: myOpportunitiesFilter });
      await searchFilter.getByRole('button', { name: 'Remove' }).click();
      await expect(myOpportunitiesFilter).toBeHidden();
    }

    const escapedName = opportunityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sourceHeader = this.page.getByText(sourceStage, { exact: true });
    const destinationHeader = this.page.getByText(destinationStage, { exact: true });
    const sourceColumn = this.page.locator('.o_kanban_group').filter({ has: sourceHeader });
    const destinationColumn = this.page.locator('.o_kanban_group').filter({ has: destinationHeader });
    const opportunity = sourceColumn.getByRole('link', {
      name: new RegExp(escapedName, 'i'),
    });

    await expect(opportunity).toBeVisible();
    await opportunity.dragTo(destinationHeader, { steps: 10 });
    await expect(destinationColumn.getByRole('link', {
      name: new RegExp(escapedName, 'i'),
    })).toBeVisible();
  }
}
