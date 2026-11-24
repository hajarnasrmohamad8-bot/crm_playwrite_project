import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { CreateActivityPage } from '../pages/CreateActivity';

const activityFile = path.resolve('TestData/activity_data.json');

test('create activity', async ({ page }) => {
  const activityName = 'send quotation';

  await page.goto('https://azzrk.odoo.com/odoo/crm');
  const activityPage = new CreateActivityPage(page);
  await activityPage.createActivity(activityName);

  fs.writeFileSync(activityFile, JSON.stringify({ name: activityName }, null, 2));
});
