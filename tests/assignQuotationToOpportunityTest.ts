import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { AssignQuotationToOpportunityPage } from '../pages/AssignQuotationToOpportunity';

const activityFile = path.resolve('TestData/activity_data.json');
const opportunityFile = path.resolve('TestData/opportunity_data.json');

test('assign quotation activity to opportunity', async ({ page }) => {
  const activityData = JSON.parse(fs.readFileSync(activityFile, 'utf-8')) as { name: string };
  const opportunityData = JSON.parse(fs.readFileSync(opportunityFile, 'utf-8')) as { name: string };

  if (!activityData.name || !opportunityData.name) {
    throw new Error('Create the activity and opportunity before running the assignment test.');
  }

  await page.goto('https://azzrk.odoo.com/odoo/crm');
  const assignmentPage = new AssignQuotationToOpportunityPage(page);
  await assignmentPage.assignActivityToOpportunity(opportunityData.name, activityData.name);
});
