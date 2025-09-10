import { Page } from '@playwright/test';

// Define all selectors in one place
const SELECTORS = {
  firstName: '#customer\\.firstName',
  lastName: '#customer\\.lastName',
  address: '#customer\\.address\\.street',
  city: '#customer\\.address\\.city',
  state: '#customer\\.address\\.state',
  zip: '#customer\\.address\\.zipCode',
  phone: '#customer\\.phoneNumber',
  ssn: '#customer\\.ssn',
  username: '#customer\\.username',
  password: '#customer\\.password',
  confirmPassword: '#repeatedPassword',
  registerButton: 'input[type="submit"][value="Register"]'
};

export const myRegisterFormPage = (page: Page) => ({


  fillFirstName: async (firstName: string) => {
    await page.fill(SELECTORS.firstName, firstName);
  },
  fillLastName: async (lastName: string) => {
    await page.fill(SELECTORS.lastName, lastName);
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
  fillSSN: async (ssn: string) => {
    await page.fill(SELECTORS.ssn, ssn);
  },
  fillUsername: async (username: string) => {
    await page.fill(SELECTORS.username, username);
  },
  fillPassword: async (password: string) => {
    await page.fill(SELECTORS.password, password);
  },
  fillConfirmPassword: async (password: string) => {
    await page.fill(SELECTORS.confirmPassword, password);
  },
  submit: async () => {
    await page.click(SELECTORS.registerButton);
  },

  fillForm: async (data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
  }) => {
    await page.fill(SELECTORS.firstName, data.firstName);
    await page.fill(SELECTORS.lastName, data.lastName);
    await page.fill(SELECTORS.address, data.address);
    await page.fill(SELECTORS.city, data.city);
    await page.fill(SELECTORS.state, data.state);
    await page.fill(SELECTORS.zip, data.zip);
    await page.fill(SELECTORS.phone, data.phone);
    await page.fill(SELECTORS.ssn, data.ssn);
    await page.fill(SELECTORS.username, data.username);
    await page.fill(SELECTORS.password, data.password);
    await page.fill(SELECTORS.confirmPassword, data.password);
    await page.click(SELECTORS.registerButton);
  }
});
