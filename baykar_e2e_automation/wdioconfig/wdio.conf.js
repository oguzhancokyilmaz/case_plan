const { hooks } = require('../src/support/hooks');
require('dotenv').config();
const { exec } = require('child_process');
const allure = require('allure-commandline');
const fs = require('fs-extra');
const path = require('path');
const allureReporter = require('@wdio/allure-reporter').default;

exports.config = {
    runner: 'local',
    specs: [
        '../src/features/**/*.feature'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'trace',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: [
        'spec',
        ...(process.env.ALLURE_REPORT === 'true' ? [['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]] : []),
    ],
    cucumberOpts: {
        require: ['./src/steps/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tags: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    afterScenario: async function (uri, feature, scenario, result, sourceLocation, context) {
        await browser.deleteAllCookies();
        await browser.execute(() => {
            window.localStorage.clear();
            window.sessionStorage.clear();
        });
    },
    afterStep: async function (uri, feature, { error }, stepData, context) {
        console.log('afterStep hook triggered');
        if (error) {
            console.log('Error detected, taking screenshot');
            const screenshot = await browser.takeScreenshot();
            
            const dir = path.join('screenshots', feature.name);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const screenshotPath = path.join(dir, `${stepData.text}.png`);
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            console.log(`Saved screenshot: ${screenshotPath}`);

            allureReporter.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
            console.log('Screenshot added to Allure report');
        }
    },
   /* after: async function (result, capabilities, specs) {
        exec('taskkill /F /IM chrome.exe /T', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error killing chrome: ${err}`);
                return;
            }
            console.log(`Chrome processes killed: ${stdout}`);
        });
    },*/
    onPrepare: async function (config, capabilities) {
        console.log('onPrepare hook started'); 
        
        const projectRoot = path.resolve(__dirname, '..'); 
        const allureResultsDir = path.join(projectRoot, 'allure-results'); 
        const screenshotsDir = path.join(projectRoot, 'screenshots'); 
        
        console.log(`Resolved allureResultsDir: ${allureResultsDir}`); 
        
        if (fs.existsSync(allureResultsDir)) {
            console.log('allure-results directory exists. Removing...'); 
            await fs.remove(allureResultsDir);
            console.log('allure-results directory cleaned'); 
        } else {
            console.log('allure-results directory does not exist. No action needed.'); 
        }
        if (fs.existsSync(screenshotsDir)) {
            console.log('screenshots directory exists. Removing...');
            await fs.remove(screenshotsDir);
            console.log('screenshots directory cleaned');
        } else {
            console.log('screenshots directory does not exist. No action needed.');
        }
    },
    onComplete: async function (exitCode, config, capabilities, results) {
        if (process.env.ALLURE_REPORT === 'true') {
            const reportError = new Error('Could not generate Allure report');
            const generation = exec('allure generate allure-results --clean');
    
            return new Promise((resolve, reject) => {
                const generationTimeout = setTimeout(() => reject(reportError), 5000);
    
                generation.on('exit', function (exitCode) {
                    clearTimeout(generationTimeout);
    
                    if (exitCode !== 0) {
                        return reject(reportError);
                    }
    
                    console.log('Allure report successfully generated');
                    resolve();
                });
            });
        }
    },
    ...hooks
};
