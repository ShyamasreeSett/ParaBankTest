import {type Locator, type Page} from '@playwright/test';
import {NA} from "@resources/constants";

export class myAccountsOverviewPage {
    readonly page: Page;
    readonly title: Locator;
    readonly table: Locator;
    readonly total: Locator;
    readonly balanceCells: Locator;
    readonly firstAccount: Locator;


    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('#showOverview > .title');
        this.table = page.locator('#accountTable');
        this.total = page.locator('text="Total"');
        this.firstAccount = page.locator('//table[@id="accountTable"]//tr[td/a][1]');
        this.balanceCells = page.locator('//table[@id="accountTable"]//tr[td/a]/td[2]');
    }

    async getTitle(): Promise<string> {
        try {
            await this.title.waitFor({state: 'visible'});
            return (await this.title.textContent()).trim();
        } catch (error) {
            console.error('Title is not displayed in overview page:', error);
            return NA;
        }
    }

    async getAccountOverview1stAccount(): Promise<string[]> {
        try {
            await this.total.waitFor({state: 'visible'});
            return (await this.firstAccount.locator('td').allTextContents());// return all elements in the 1st row as array
        } catch (error) {
            console.error('1st Account row was not available', error);
        }
    }

    async getAccountOverviewRow(account: string): Promise<string[]> {
        try {
            await this.total.waitFor({state: 'visible'});
            const rowN = this.page.locator(`//table[@id="accountTable"]//tr[td/a[text()="${account}"]]`);
            const allCells = rowN.locator('td');
            return (await allCells.allTextContents());// return all elements in the row as array
        } catch (error) {
            console.error('Account rows were not available', error);
        }
    }

    async getTotalBalance(): Promise<number> {
        try {
            const balanceTexts = await this.balanceCells.allTextContents();

            // replace dollar and convert to number
            const balances = balanceTexts.map(text => Number(text.replace('$', '').trim())
            );

            // Sum the numbers using lamda function reduce
            return balances.reduce((acc, val) => acc + val, 0);
        } catch (error) {
            console.error('Account balances were not calculated', error);
            return 0;
        }
    }
}