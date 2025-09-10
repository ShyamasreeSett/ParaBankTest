import { test } from '@base/baseTest';
import { generateUser } from '@utils/generateUser';


test("test successful registration and login", async ({loginPage, registerFormPage}) =>
     { 
          await loginPage.gotoURL(); 
          await loginPage.clickRegisterLink(); 
          // Generate a new user with unique username and password
  const newUser = generateUser();
  console.log(newUser);

  // Fill and submit the registration form
  await registerFormPage.fillForm(newUser);
     })