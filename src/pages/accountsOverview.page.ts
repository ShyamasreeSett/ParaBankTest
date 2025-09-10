import { type Locator, type Page } from '@playwright/test';

export class myAccountsOverviewPage {
    readonly page: Page;
    readonly title: Locator;
 



    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('#showOverview > .title'); 
    }

    async getTitle() {
        try {
        await this.title.waitFor({ state: 'visible' }); 
        return (await this.title.textContent()).trim();
    } catch (error) {
        console.error('Title is not displayed in overview page:', error);
    }
}
    

}