import { type Locator, type Page } from '@playwright/test';

export class myLoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly register: Locator;
    readonly loginButton: Locator;
    readonly errorTitle: Locator;
    readonly errorDescription: Locator;



    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[name="username"]'); //element by locator with name attribute
        this.password = page.locator('[name="password"]');
        this.register = page.getByRole('link', { name: 'Register' }); //element by role with text
        this.loginButton = page.locator('[type="submit"]');
        this.errorTitle =  page.locator('.title'); //element by text
        this.errorDescription = page.locator('.error'); //element by text

    }

    async enterUsername(user: string) {
        try {
            await this.username.waitFor({ state: 'visible' }); //wait till the login form is loaded
            await this.username.fill(user);
        } catch (error) {
            console.error('Unable to enter username in the Username text field in the login page', error);
        }
    }

    async enterPassword(password: string) {
        try {
            await this.password.fill(password);
        } catch (error) {
            console.error('Unable to enter password in the Password text field in the login page', error);
        }
    }

    async clickLogin() {
        try {
            await this.loginButton.click();
        } catch (error) {
            console.error('Unable to click login button in the login page', error);
        }
    }

    async clickRegisterLink() {
        try {
            await this.register.click();
        } catch (error) {
            console.error('Unable to click on Register link in the login page', error);
        }
    }

    async getErrorTitle() {
        try {
            return await this.errorTitle.textContent();
        } catch (error) {
            console.error('Error while trying to get error title in the login page', error);
        }
    }

    async getErrorDesription() {
        try {
            return await this.errorDescription.textContent();
        } catch (error) {
            console.error('Error while trying to get error description in the login page', error);
        }
    }


}