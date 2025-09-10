import { type Locator, type Page } from '@playwright/test';

export class myNavigationPanel {
    readonly page: Page;
    readonly logout: Locator;
    readonly newAccount: Locator;
    readonly home: Locator;
    readonly userName: Locator;


    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#leftPanel p.smallText'); //used xpath
        this.logout = page.getByRole('link', { name: 'Log Out' }); //element by role with text
        this.newAccount = page.getByRole('link', { name: 'Open New Account' }); 
        this.home = page.getByRole('link', { name: 'home' }); 

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

        async clickHomePage() {
        try {
            await this.home.click();
        } catch (error) {
            console.error('Unable to click home link in the top pane ', error);
        }
    }
}