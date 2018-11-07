export function setupLibrary(library) {
    logger.logInfo('Please answer the following questions:');
    return inquirer.prompt(this.questions).then((answers) => {
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
