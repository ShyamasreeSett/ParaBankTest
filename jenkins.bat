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
    call echo ERROR: npm ci failed. Exiting.
    call exit /b 1
)


REM Step 3: Run Playwright E2E tests
echo Installing tests
echo -------------------------------

npm run test:e2e

REM Step 4: Post-Test Info
echo Playwright tests completed successfully.
echo Reports are located in playwright-report\


echo Playwright CI pipeline finished
echo -------------------------------
