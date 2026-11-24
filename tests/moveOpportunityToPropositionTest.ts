import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { MoveToPropositionPage } from '../pages/MoveToProposation';

const opportunityFile = path.resolve('TestData/opportunity_data.json');

test('move opportunity to proposition', async ({ page }) => {
  const opportunityData = JSON.parse(fs.readFileSync(opportunityFile, 'utf-8')) as { name: string };
  if (!opportunityData.name) {
    throw new Error('Create an opportunity before running the stage change test.');
  }

  await page.goto('https://azzrk.odoo.com/odoo/crm');
  const movePage = new MoveToPropositionPage(page);
  await movePage.moveOpportunityToProposition(opportunityData.name);
});
