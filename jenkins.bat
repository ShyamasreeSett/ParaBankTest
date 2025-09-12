@echo off
REM Jenkins CI / Local Batch Script for Playwright E2E

echo Starting Playwright CI pipeline
echo -------------------------------

REM Step 0: Determine suite parameter
IF "%1"=="" (
    REM If no parameter passed, default to main suite
    SET SUITE=e2e
) ELSE (
    SET SUITE=%1
)

echo Selected suite: %SUITE%

REM Step 1: Navigate to repo root
cd /d %~dp0

REM Step 2: Clean node_modules and install dependencies
echo Installing dependencies via npm ci...
echo -------------------------------

IF EXIST node_modules (
    rmdir /s /q node_modules
)
npm ci
IF ERRORLEVEL 1 (
    echo ERROR: npm ci failed. Exiting.
    exit /b 1
)

REM Step 3: Clean previous Playwright reports
IF EXIST playwright-report (
    echo Removing old Playwright report...
    rmdir /s /q playwright-report
)

REM Step 4: Run Playwright E2E tests
IF "%SUITE%"=="e2e" (
    echo Running E2E tests...
    npm run test e2e
) ELSE IF "%SUITE%"=="main" (
    echo Running Main Suite tests...
    npm run test main-suite
) ELSE (
    echo WARNING: Invalid suite parameter. Use 'e2e' or 'main'. Running all tests by default
    npm run test
)

IF ERRORLEVEL 1 (
    echo ERROR: Playwright tests failed.
    exit /b 1
)

REM Step 5: Post-Test Info
echo Playwright tests completed successfully.
echo Reports are located in playwright-report\


echo Playwright CI pipeline finished
echo -------------------------------
pause
