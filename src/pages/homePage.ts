import { type Locator, type Page } from '@playwright/test';

export class myHomePage {
    readonly page: Page;
    readonly title: Locator;
     readonly caption: Locator;
     readonly atmService: Locator;


    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('#showOverview > .title');
        this.atmService = page.locator('text="ATM Services"'); 
 
    }

    async isATMServiceAvailable() {
        try {
                        await this.atmService.waitFor({ state: 'visible' }); //wait till the login form is loaded

        await this.atmService.isVisible();
    } catch (error) {
        console.error('ATM service link is not displayed in home page:', error);
    }
}
    

}