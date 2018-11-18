const fs = require('fs');
const semverRegex = require('semver-regex');
const inquirer = require('inquirer');

module.exports = { setupApp };

function setupApp(appName, appPath) {
    console.log('Please answer the following questions:');
    return inquirer.prompt(getQuestions(appName)).then((answers) => {
        return new Promise((resolve, reject) => {
            const libDetails = {
                name = appName,
                path = appPath,
                code = answers['library-code'],
                version = answers['initial-version']
            };
            writeLibDetails(app);
            resolve('done');
        });
    });
}

function writeLibDetails(libDetails) {
    const packageJsonPath = `${libDetails.path}/package.json`;
    let packageJSON = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJSON.name = libDetails.name;
    packageJSON.version = libDetails.version;
    packageJSON.libraryCode = libDetails.code;
    fs.writeFileSync(`${libDetails.path}/package.json`, JSON.stringify(packageJSON, null, 4));
}

function getQuestions(appName) {
    return [
        {
            name: 'library-code',
            type: 'input',
            default: appName,
            message: 'Library code:',
            validate: function(input) {
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
            validate: function(input) {
                if (semverRegex().test(input)) return true;
                else return 'The initial version must match a semantic versions such as 0.0.1';
            }
        }
    ];
}
