// optional imports for apex and jQuery 
// uncomment, if you need them inside this file
//import apex from 'apex'; 
//const $ = apex.jQuery; 

// import of sample less file to test CSS bundling on new template versions
// you may remove this import if you do not bundle CSS at any time
import './css/main.less';

// export of setup tests for new versions of the template
// checks if the library correctly transpiles and polyfills ES6 code during a build
// you may remove this module after the creation at any time
import setupTests from './js/setupTests';
export { setupTests };

/**
 * @constant projectInfo
 * @description Information about the project
 * name and version of the library will be replaced during the build with the values from package.json file
 */
export const projectInfo = { name: 'NPM_PACKAGE_PROJECT_NAME', version: 'NPM_PACKAGE_PROJECT_VERSION' };

/***************************************************************************************/

/**
 * your code goes here
 * - export all variables/ objects/ functions that should be exposed in your library
 * - define your library code and project name in "package.json" file
 * - check the examples folder on how to expose properties to your library
 *
 * example exported function:
 *
 * export function greet(){
 *      console.log("hello world");
 * }
 */
