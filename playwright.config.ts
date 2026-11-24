import path from 'path';
import { defineConfig } from '@playwright/test';

const authFile = path.resolve('playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  outputDir: './playwright-results',

  // Default patterns plus the repo's `*Test.ts` naming (e.g. loginTest.ts).
  testMatch: ['**/*.test.ts', '**/*.spec.ts', '**/*Test.ts'],

  use: {
    headless: false,
  },
  projects: [
    {
      name: 'SuccessfulLogin',
      testMatch: '**/loginTest.ts',
      grep: /\bsuccessful login$/i,
    }, 
    {
      name: 'CreateCustomer',
      testMatch: '**/createLeadTest.ts',
      dependencies: ['SuccessfulLogin'],
      use: {
        storageState: authFile,
      },
    }, 
    {
      name: 'createOpportunity',
      testMatch: '**/CreateOppertionty.ts',
      grep: /\bcreate new opportunity$/i,
      dependencies: ['CreateCustomer'],
      use: {
        storageState: authFile,
      },
    },
    {
      name: 'CreateActivity',
      testMatch: '**/createActivityTest.ts',
      grep: /\bcreate activity$/i,
      dependencies: ['CreateCustomer'],
      use: {
        storageState: authFile,
      },
    },
    {
      name: 'AssignQuotationToOpportunity',
      testMatch: '**/assignQuotationToOpportunityTest.ts',
      grep: /\bassign quotation activity to opportunity$/i,
      dependencies: ['CreateActivity', 'createOpportunity'],
      use: {
        storageState: authFile,
      },
    },
    {
      name: 'MoveOpportunityToProposition',
      testMatch: '**/moveOpportunityToPropositionTest.ts',
      grep: /\bmove opportunity to proposition$/i,
      dependencies: ['AssignQuotationToOpportunity'],
      use: {
        storageState: authFile,
      },
    },
    {
      name: 'MoveOpportunityToWon',
      testMatch: '**/moveOpportunityToWonTest.ts',
      grep: /\bmove opportunity from proposition to won$/i,
      dependencies: ['MoveOpportunityToProposition'],
      use: {
        storageState: authFile,
      },
    },
  ],
});
