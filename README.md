# apexjs-template-js-lib

Default JavaScript template for the create-apex-js-lib project.

### Questions during the creation of library

-   **Library code**: This will be the code that is exposed on your APEX page and contains all of your source code. As with the library name, the library code may only include letters, numbers, underscores and hashes. By default, your library name is used for the library code as well.

-   **Initial version**: Define the initial version of your library. The version needs to follow the [semantic versioning](https://semver.org/) rules. By default, version 1.0.0 is us1d.

-   **output format**: The output format defines the module you want to create. By default, the library is created as an IIFE (Immediately Invoked Function Execution), which is s good fit for browsers. If you want to use your library in other modules/libraries however, you might want to choose another format.

### Externals

Externals are parts of your app, that should not be included in your bundle, as they are already loaded on your page. With this template, the following libraries are set as externals:

#### apex

The apex JavaScript API is passed to your app as an argument when it is loaded. You therefore need to ensure, that your library is loaded after the apex library.

#### jQuery

The jQuery library is included in the apex library and can be referenced with `apex.jQuery`. Additionally, you can map `apex.jQuery` to the `$` variable in your files if you wish such as:

```javascript
const $ = apex.jQuery;
```

As you are working in your own namespace, it is safe to override the `$` variable. This way you can make sure that you always access the jQuery library from the apex library while being able to continue to use the `$` shortcut.

## Author

Daniel Frech, 2018

## License

[MIT](LICENSE)
