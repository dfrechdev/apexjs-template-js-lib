const fs = require('fs');
const path = require('path');
const semverRegex = require('semver-regex');
const inquirer = require('inquirer');

module.exports = { setupApp };

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
                console.log(JSON.stringify(libDetails));
                writeLibDetails(libDetails);
                resolve('done');
            } catch (err) {
                reject(err);
            }
        });
    });
}

function writeLibDetails(libDetails) {
    console.log('reading package.json from ' + path.resolve(libDetails.appPath, 'package.json'));
    const packageJsonPath = path.resolve(libDetails.appPath, 'package.json');
    let packageJSON = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    console.log('setting attributes');
    packageJSON.name = libDetails.appName;
    packageJSON.version = libDetails.version;
    packageJSON.libraryCode = libDetails.code;
    console.log('writing package.json');
    fs.writeFileSync(path.resolve(libDetails.appPath, 'package.json'), JSON.stringify(packageJSON, null, 4));
}

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
