import { type Locator, type Page } from '@playwright/test';

export class myWelcomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly description: Locator;

    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.title');
        this.description = page.locator('.title + p');
    }

    async getWelcomeTitle() {
        try {
            return await this.title.textContent();
        } catch (error) {
            console.error('Welcome title is not visible/registration was not successful', error);
        }
    }

    async getWelcomeDesription() {
        try {
            return await this.description.textContent();
        } catch (error) {
            console.error('Welcome description is not displayed in the welcome page', error);
        }
    }
}