import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/Login';
import fs from 'fs';
import path from 'path';

const loginData = JSON.parse(fs.readFileSync(path.resolve('TestData/login_data.json'), 'utf-8'));

const validCases = loginData.loginCases.filter(
  (item: any) => item.type === 'valid'
);

const invalidCases = loginData.loginCases.filter(
  (item: any) => item.type === 'invalid'
);

const authFile = path.resolve('playwright/.auth/user.json');

test('successful login', async ({page}) => {
    await page.goto('https://azzrk.odoo.com/web/login?redirect=%2Fodoo%2Fcrm%3F')

   const loginPage = new LoginPage(page);
   await loginPage.login(validCases[0].username, validCases[0].password);

   await expect(page).toHaveURL(/\/crm/);

   fs.mkdirSync(path.dirname(authFile), { recursive: true });
   await page.context().storageState({ path: authFile });
});

test('Unsuccessful login', async ({page}) => {

    await page.goto('https://azzrk.odoo.com/web/login?redirect=%2Fodoo%2Fcrm%3F')

   const loginPage = new LoginPage(page);
   await loginPage.login(invalidCases[0].username, invalidCases[0].password);

    await expect(loginPage.errorMessage)
    .toHaveText('Wrong login/password');
});







/* 
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {

    await page.goto('https://azzrk.odoo.com');

    // هنا هنستدعي Login Page Object
    // وننفذ خطوات تسجيل الدخول الصحيحة

    await expect(page).toHaveURL(/odoo/);

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});
 */