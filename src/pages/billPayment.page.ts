import { Page } from '@playwright/test';

// Define all selectors in one place
const SELECTORS = {
  payeeName: '[name="payee\\.name"]',
  address: '[name="payee\\.address\\.street"]',
  city: '[name="payee\\.address\\.city"]',
  state: '[name="payee\\.address\\.state"',
  zip: '[name="payee\\.address\\.zipCode"]',
  phone: '[name="payee\\.phoneNumber"]',
  accountNumber: '[name="payee\\.accountNumber"]',
  verifyAccountNumber: '[name="verifyAccount"]',
  amount: '[name="amount"]',
  fromAccount: '[name="fromAccountId"]',
  submitButton: 'input[type="submit"][value="Send Payment"]'
};

export const myBillPaymentFormPage = (page: Page) => ({
  fillPayeeName: async (name: string) => {
    await page.fill(SELECTORS.payeeName, name);
  },
  fillAddress: async (address: string) => {
    await page.fill(SELECTORS.address, address);
  },
  fillCity: async (city: string) => {
    await page.fill(SELECTORS.city, city);
  },
  fillState: async (state: string) => {
    await page.fill(SELECTORS.state, state);
  },
  fillZipCode: async (zip: string) => {
    await page.fill(SELECTORS.zip, zip);
  },
  fillPhone: async (phone: string) => {
    await page.fill(SELECTORS.phone, phone);
  },
  fillAccountNumber: async (account: string) => {
    await page.fill(SELECTORS.accountNumber, account);
  },
  fillVerifyAccountNumber: async (account: string) => {
    await page.fill(SELECTORS.verifyAccountNumber, account);
  },
  fillAmount: async (amount: string) => {
    await page.fill(SELECTORS.amount, amount);
  },
  fillFromAccount: async (account: string) => {
    await page.fill(SELECTORS.fromAccount, account);
  },
  submit: async () => {
    await page.click(SELECTORS.submitButton);
  },

  fillForm: async (data: {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    accountNumber: string;
    verifyAccountNumber: string;
    amount: string;
    fromAccount: string;
  }) => {
    await page.fill(SELECTORS.payeeName, data.payeeName);
    await page.fill(SELECTORS.address, data.address);
    await page.fill(SELECTORS.city, data.city);
    await page.fill(SELECTORS.state, data.state);
    await page.fill(SELECTORS.zip, data.zip);
    await page.fill(SELECTORS.phone, data.phone);
    await page.fill(SELECTORS.accountNumber, data.accountNumber);
    await page.fill(SELECTORS.verifyAccountNumber, data.verifyAccountNumber);
    await page.fill(SELECTORS.amount, data.amount);
    await page.selectOption(SELECTORS.fromAccount, { value: data.fromAccount });
    await page.click(SELECTORS.submitButton);
  }
});
