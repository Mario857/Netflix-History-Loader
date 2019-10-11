# Netflix-History-Loader

## Usage

To run a development server that will watch for file changes and rebuild the scripts, run:

```
npm start
```

To just build the files without the development server:

```
npm build
```

Both commands will create a `dist/` directory, it will contain the built files that should be loaded into the browser or packed.

## Load into Chrome

To load the built files into Chrome, open [chrome://extensions/](chrome://extensions/).

Enable "Developer mode" if it's not enabled yet:

![Developer Mode Checkbox](assets/dev_mode.png)

Click on "Load unpacked":

![Load Unpacked Button](assets/load_unpacked.png)

Find the `dist/` directory on your system and open it.

The extension should be now at the top of the page:

![Extension Loaded](assets/ext_loaded.png)

## Publishing

[Follow the official docs](https://developer.chrome.com/webstore/publish) to learn how to publish a Chrome extension.
Please note that Google has its own process to review public extensions and using this boilerplate **does not guarantee** that the extension will pass it. Passing the review process is your responsibility!

## External resources

*   [Sample extension built with this template](https://github.com/edrpls/social-network-alert)

*   [Chrome Developer Documentation](https://developer.chrome.com/extensions/devguide)

*   [Overview slides about Chrome Extensions](https://github.com/edrpls/chrome-extensions-what-why-how)
