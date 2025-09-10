import { type Locator, type Page } from '@playwright/test';

export class myAccountsOverviewPage {
    readonly page: Page;
    readonly title: Locator;
    readonly table: Locator; 


    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('#showOverview > .title');
        this.table = page.locator('#accountTable');

    }

    async getTitle() {
        try {
            await this.title.waitFor({ state: 'visible' });
            return (await this.title.textContent()).trim();
        } catch (error) {
            console.error('Title is not displayed in overview page:', error);
        }
    }

    async getAccountOverviewRow(account: string): Promise<string[]> {
        try {
            const rowN = this.table.locator('tr', { has: this.page.locator('a', { hasText: account }) });
            const allCells = rowN.locator('td');
            return (await allCells.allTextContents());// return all elements in the row as array
        } catch (error) {
            console.error('Account rows were not available', error);
        }
    }
// Wait until network is idle (page is stable)
      async  waitUntilStable() {
        await this.page.waitForLoadState('networkidle'); // waits until no network requests for ~500ms
      }
}