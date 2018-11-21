const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const semverRegex = require('semver-regex');
const inquirer = require('inquirer');

/**
 * @exports setupApp
 */
module.exports = { setupApp, logWelcomeMsg };

/**
 * @function setupApp
 * @param appDetails
 * @param {string} appDetails.appName
 * @param {string} appDetails.appPath
 * @param {boolean} appDetails.suppressInquiry
 * @returns {PromiseLike}
 * @description Entry point for creating a new app with the template
 */
function setupApp(appDetails) {
    console.log('Please answer the following questions:');
    if (appDetails.suppressInquiry) {
        const libDetails = {
            appName: appDetails.appName,
            appPath: appDetails.appPath,
            code: appDetails.appName,
            version: '1.0.0'
        };
        writeLibDetails(libDetails);
        return Promise.resolve('done');
    } else {
        return inquirer.prompt(getQuestions(appDetails)).then((answers) => {
            return new Promise((resolve, reject) => {
                try {
                    const libDetails = {
                        appName: appDetails.appName,
                        appPath: appDetails.appPath,
                        code: answers['library-code'],
                        version: answers['initial-version']
                    };
                    writeLibDetails(libDetails);
                    resolve('done');
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}

/**
 * @function logWelcomeMsg
 * @param appDetails
 * @param {string} appDetails.appName
 * @param {string} appDetails.appPath
 * @description Prints a welcome message for the template to the console
 */
function logWelcomeMsg(appDetails) {
    console.log('Inside your app directory you can run the following commands:\n');
    console.log(chalk.cyan('$ npm run bundle'));
    console.log('Bundles your library for production.\n');
    console.log(chalk.cyan('$ npm run bundle-dev'));
    console.log('Bundles your library for development.\n');
    console.log(chalk.cyan('$ npm run bundle-watch'), '/', chalk.cyan('$ npm run bundle-dev-watch'));
    console.log('Same as the above, but watches for changes of our files and bundles after each change.\n');
    console.log(chalk.cyan('$ npm run doc'));
    console.log('Creates JSDoc documentation from your source files.\n');
    console.log(chalk.cyan('npm run build'));
    console.log('Bundles the app for production and creates the documentation.\n');
    console.log('We suggest that you begin by typing:\n');
    console.log(chalk.cyan('$ cd'), appDetails.appName);
    console.log(chalk.cyan('$ npm run bundle-dev'));
}

/**
 * @private
 */
function writeLibDetails(libDetails) {
    const packageJsonPath = path.resolve(libDetails.appPath, 'package.json');
    let packageJSON = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJSON.name = libDetails.appName;
    packageJSON.version = libDetails.version;
    packageJSON.libraryCode = libDetails.code;
    fs.writeFileSync(path.resolve(libDetails.appPath, 'package.json'), JSON.stringify(packageJSON, null, 4));
}

/**
 * @private
 */
function getQuestions(appDetails) {
    return [
        {
            name: 'library-code',
            type: 'input',
            default: appDetails.appName,
            message: 'Library code:',
            validate: (input) => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'The library code may only include letters, numbers, underscores and hashes.';
            }
        },
        {
            name: 'output-format',
            type: 'list',
            message: 'Output format:',
            default: 'iife',
            choices: ['amd', 'cjs', 'esm', 'iife', 'umd']
        },
        {
            name: 'initial-version',
            type: 'input',
            message: 'Initial version:',
            default: '1.0.0',
            validate: (input) => {
                if (semverRegex().test(input)) return true;
                else return 'The initial version must match a semantic versions such as 0.0.1';
            }
        }
    ];
}
