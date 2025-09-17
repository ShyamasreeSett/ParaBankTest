# parabankTest

Created by Shyamasree Sett
September 2025


Playwright  
Typescript  
POM  

--- Used different types of element location: by locator, by role, by text  
--- Wrapped each action in try-catch block to specify error for future debugging  
--- Created a Base Test fixture under base folder which acts as an function with common setup for the tests as well as initiates the page objects  
--- Created a POJO for the registration form page  
--- Used faker to create random user data. Concatenated timestamp to firstname to generate username to make it unique  

# Test Execution Steps

## A. Running Tests Locally (Without Jenkins)

**Step 1:** Clone the repository:  
👉 [ParaBankTest](https://github.com/ShyamasreeSett/ParaBankTest)

**Step 2:** Open a Terminal / Command Prompt  

**Step 3:** Navigate to the root of the project directory  

**Step 4:** Install dependencies  
bash
npm ci  

**Step 5:** Install Playwright Browsers:  
 		npx playwright install --with-deps  
**Step 6:** Run E2E Tests:  
		npm run test:e2e  
**Step 7:** Run granular Tests:  
npm run test:main  
**Step 8:** View Reports:  After tests finish, open the HTML report in playwright-report/index.html to see results.  
## B. Running Tests via Jenkins(Local)  
**Prerequisites**  
--Jenkins installed and running locally.  
--Node.js installed or configured via Jenkins NodeJS tool.  
--Repository cloned locally  https://github.com/ShyamasreeSett/ParaBankTest  
**Step 1:**  Open Jenkins  
1. Open Jenkins in a browser (http://localhost:8080 by default).  


**Step 2:** Create a New Pipeline Job  
**Step 3:** Configure the Pipeline  
1. In the job configuration, scroll to “Pipeline” section.  
2. Under Definition, select “Pipeline script from SCM”.  
3. Choose your SCM type (e.g., Git) and enter:  Repository URL: Path to the local repo or remote Git URL: https://github.com/ShyamasreeSett/ParaBankTest  
4. Save the configuration.  


**Step 4:** Configure NodeJS Tool (if required)   
1. Go to Manage Jenkins → Global Tool Configuration.  
2. Under NodeJS, configure a NodeJS installation:  
Name: NodeJS-16 (matching Jenkinsfile)  
3. Install automatically or point to existing NodeJS on local machine.  
Save.  


**Step 5:** Build the Job  
1. Click “Build with Parameters” and select e2e to run end to end test or main to select running granular tests.  
2. Jenkins will execute the pipeline:  
Clone the repo.  
Run jenkins.bat:  
Install dependencies: npm ci  
Install Playwright browsers: npx playwright install --with-deps  
Run E2E tests: npm run test:e2e   
Generate HTML reports in playwright-report/.  

**Step 6:** View Test Reports  
After the build completes:  
1. Open the specific build in Jenkins.  
2. Click “Artifacts” .  
3. Open playwright-report/index.html to view the HTML report.  



# Key Features & Improvements

- **Single End-to-End Test**  
  Encompasses all steps for transactions and balance checks.

- **Granular Tests**  
  Highlight reusability and modularity of the suite with **1 intentionally failed test**.

- **Reusable Page Objects (POM)**  
  - All UI interactions are modularized for maintainability  
  - A **Base Test fixture** under the `base` folder provides common setup for tests  
  - Initializes page objects, ensuring consistency across the suite  

- **Utility Helpers**  
  - Balance conversion  
  - Dynamic payee generation  
  - API helpers  
  - Random data generation using **Faker**  
  - Random user registration with timestamp-concatenated usernames ensures uniqueness in each test execution  

- **Playwright Config for Cross-Browser Testing**

- **Assertions & Error Handling**  
  - Assertions added at every step ensure correct behavior  
  - Each UI action wrapped in a **try-catch** block to capture errors for debugging  

- **Dynamic Data & POJOs**  
  - Created a **POJO** for the registration form page  
  - Data-driven approach with dynamic/randomized values ensures realistic testing scenarios  

- **Element Location Strategies**  
  - By locator  
  - By role  
  - By text  
  These enhance test robustness.  

- **HTML Report Enhancements**  
  - Screenshots  
  - Trace files  
  - Logical step grouping for easier debugging and analysis  

- **CI/CD Ready**  
  - Playwright configuration supports Jenkins integration  
  - `jenkins.bat` and `Jenkinsfile` included in the repo  
  - Enables automated execution in pipelines  

- **`.env` File for Secrets**

- **Test Cases Wrapped in Test Steps**  
  Improves test report readability


# Test Scenarios

## UI Test Scenarios

1. Navigate to **ParaBank** application.  
2. Create a new user from the **User Registration** page  
   - Ensure the username is generated randomly and is unique in every test execution.  
3. Login to the application with the user created in Step 2.  
4. Verify if the **Global Navigation Menu** on the home page works as expected.  
5. Create a **Savings Account** from the **Open New Account** page and capture the account number.  
6. Validate that the **Accounts Overview** page displays balance details as expected.  
7. Transfer funds from the account created in Step 5 to another account.  
8. Pay a bill with the account created in Step 5.  
9. Add necessary assertions at each test step where applicable.  

---

## API Test Scenarios

1. Search the transactions using the **Find Transactions API** by `amount` for the payment transactions made in Step 8.  
2. Validate the details displayed in the JSON response.  
