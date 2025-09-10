import { gotoURL, test, expect } from '@base/baseTest';
import { generateUser } from '@utils/generateUser';
import { WELCOMEPAGE } from '@resources/constants';


test.beforeEach(async ({ page }) => {
     await gotoURL(page);
})

test("test successful registration", async ({ loginPage, registerFormPage, welcomePage }) => {
     await loginPage.clickRegisterLink();
     // Generate a new user with unique username and password
     const newUser = generateUser();

     // Fill and submit the registration form
     await registerFormPage.fillForm(newUser);

     const title = await welcomePage.getWelcomeTitle();
     const description = await welcomePage.getWelcomeDesription();

     expect(title).toBe(WELCOMEPAGE.TITLE + newUser.username);
     expect(description).toBe(WELCOMEPAGE.DESCIPTION);
})