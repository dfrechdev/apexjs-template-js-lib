const fs = require('fs');
const path = require('path');
const semverRegex = require('semver-regex');
const inquirer = require('inquirer');

/**
 * @exports setupApp
 */
module.exports = { setupApp };

/**
 * @function setupApp
 * @param appDetails
 * @param {string} appDetails.appName
 * @param {string} appDetails.appPath
 * @returns {PromiseLike}
 * @description Entry point for creating a new app with the template
 */
function setupApp(appDetails) {
    console.log('Please answer the following questions:');
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
