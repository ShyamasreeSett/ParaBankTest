import { type Locator, type Page } from '@playwright/test';

export class myNavigationPanel {
    readonly page: Page;
    readonly logout: Locator;
    readonly newAccount: Locator;
    readonly home: Locator;
    readonly userName: Locator;
    readonly accountOverview: Locator;
    readonly transferFunds: Locator;




    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#leftPanel p.smallText'); //used xpath
        this.home = page.getByRole('link', { name: 'home' });
        this.newAccount = page.getByRole('link', { name: 'Open New Account' });
        this.accountOverview = page.getByRole('link', { name: 'Accounts Overview' });
        this.logout = page.getByRole('link', { name: 'Log Out' }); //element by role with text
        this.transferFunds = page.getByRole('link', { name: 'Transfer Funds' });



    }

    async getUserName() {
        try {
            return await this.userName.innerText();
        } catch (error) {
            console.error('UserName is not displayed in left pane after login ', error);
        }
    }

    async userLogout() {
        try {
            await this.logout.click();
        } catch (error) {
            console.error('Unable to click logout in the left pane ', error);
        }
    }

    async clickOpenNewAccount() {
        try {
            await this.newAccount.click();
        } catch (error) {
            console.error('Unable to click open new account link in the left pane ', error);
        }
    }

    async clickAccountOverview() {
        try {
            await this.accountOverview.click();
        } catch (error) {
            console.error('Unable to click accounts overview link in the left pane ', error);
        }
    }

    async clickTransferFunds() {
        try {
            await this.transferFunds.click();
        } catch (error) {
            console.error('Unable to click transfer funds link in the left pane ', error);
        }
    }

    async clickHomePage() {
        try {
            await this.home.click();
        } catch (error) {
            console.error('Unable to click home link in the top pane ', error);
        }
    }
}