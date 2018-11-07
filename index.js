const semverRegex = require('semver-regex');
const inquirer = require('inquirer');

module.exports = { setupLibrary };

function setupLibrary(library, logger) {
    logger.logInfo('Please answer the following questions:');
    return inquirer.prompt(getQuestions).then((answers) => {
        logger.log('Thanks\n');
        return new Promise((resolve, reject) => {
            library.code = answers['library-code'];
            library.version = answers['initial-version'];

            writePackageDetailsSync(library);
            resolve('done');
        });
    });
}

function writeLibrayDetails(library) {
    const packageJsonPath = `${library.getLibraryPath()}/package.json`;
    let packageJSON = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJSON.name = library.name;
    packageJSON.version = library.version;
    packageJSON.libraryCode = library.code;
    fs.writeFileSync(`${library.getLibraryPath()}/package.json`, JSON.stringify(packageJSON, null, 4));
}

function getQuestions() {
    return [
        {
            name: 'library-code',
            type: 'input',
            default: this.name,
            message: 'Library code:',
            validate: function(input) {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'The library code may only include letters, numbers, underscores and hashes.';
            }
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
