// imports of sample CSS files and apex and jQuery libraries
// the CSS file is imported by default, to verify CSS bundling on template generation
// you may activate/deactivate these imports as you need
import './css/main.less';
//import apex from 'apex'; // active to import apex if needed
//const $ = apex.jQuery; // activate to assign apex.jQuery to the $ variable if wanted

// export of initial tests after the library template is built to verify that everything is working
// checks if the library correctly transpiles and ployfills ES6 code during a build
// you may remove this module after the creation at any time
import setupTests from './js/setupTests';
export { setupTests };

/**
 * @constant projectInfo
 * @description Information about the project
 * ! name and version of the library will be replaced during the build with the values from the package.json file
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
