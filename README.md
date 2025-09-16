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

Test Execution Steps
A . Running Tests Locally (Without Jenkins)
Step 1: Repository cloned locally: https://github.com/ShyamasreeSett/ParaBankTest
Step 2: Open a Terminal / Command Prompt:
Step 3: Navigate to the root of the project directory.
Step 4: Install Dependencies:
npm ci
Step 5: Install Playwright Browsers:
npx playwright install --with-deps
Step 6: Run E2E Tests:
npm run test:e2e
Step 7: Run granular Tests:
npm run test:main
Step 8: View Reports: After tests finish, open the HTML report in playwright-report/index.html to see
results.
B. Running Tests via Jenkins(Local)
Prerequisites
●
●
●
Jenkins installed and running locally.
Node.js installed or configured via Jenkins NodeJS tool.
Repository cloned locally https://github.com/ShyamasreeSett/ParaBankTest
Step 1: Open Jenkins
●
Open Jenkins in a browser (http://localhost:8080 by default).
Step 2: Create a New Pipeline Job
Step 3: Configure the Pipeline
1. 2. 3. ○
In the job configuration, scroll to “Pipeline” section.
Under Definition, select “Pipeline script from SCM”
.
Choose your SCM type (e.g., Git) and enter:
Repository URL: Path to the local repo or remote Git URL:
https://github.com/ShyamasreeSett/ParaBankTest
4. Save the configuration.
Step 4: Configure NodeJS Tool (if required)
1. 2. ○
Go to Manage Jenkins → Global Tool Configuration.
Under NodeJS, configure a NodeJS installation:
Name: NodeJS-16 (matching Jenkinsfile)
○
Install automatically or point to existing NodeJS on local machine.
3. Save.
Step 5: Build the Job
1. tests.
2. Click “Build with Parameters” and select e2e to run end to end test or main to select running granular
Jenkins will execute the pipeline:
■ Clone the repo.
■ Run jenkins.bat:
■ Install dependencies: npm ci
■ Install Playwright browsers: npx playwright install --with-deps
■ Run E2E tests: npm run test:e2e
■ Generate HTML reports in playwright-report/.
Step 6: View Test Reports
After the build completes:
○
○
○
Open the specific build in Jenkins.
Click “Artifacts” in the left-hand menu.
Open playwright-report/index.html to view the HTML report.