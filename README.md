beagle
======

[![Join the chat at https://gitter.im/BeagleLab/beagle](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/BeagleLab/beagle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![license](http://img.shields.io/badge/license-MIT-red.svg?style=flat)](https://raw.githubusercontent.com/BeagleLab/beagle/master/LICENSE)

Navigating the sea of publications

##Installation

1. Git clone this repository.
2. In order to enable this in chrome, you need to open Chrome Settings > Extensions. Click 'Load Unpacked Extension'. Select the `build` folder from within this repository.
3. Go to any page, and click on the icon in the search bar. To see best results, click the icon while looking at a pdf. For best results, open a PDF in Chrome and inject the sidebar into it.

### Developer Installation

You will need to install [node](http://nodejs.org/). This will come with npm preinstalled. Once you have cloned the folder, following the first step above, run `npm install`.

When you have edited `main.js` or any dependency of it, run: `$ gulp`. You may need to run `npm install browserify -g` first. This will set up a watcher on the code - when you make changes, it will reflect those changes in `build`. If you need to watch `background.js` instead, run `gulp --path background`. This will ensure that everything is compiled into bundle.js. After it states `default done`, force refresh (command+shift+r) the page your .pdf loaded on before clicking the Beagle icon.

When you are working on the extension with the intention of using the content script - this happens whenever you are injecting the sidebar into an html page and not using the PDF.js interface - you need to refresh the extensions page as well as the page your extension is injected into.

### Style

We use feross's [standard](https://github.com/feross/standard). Please use a hinter or linter which adheres to it - if you need help, ask @RichardLitt. 

When in doubt, plunk it into a new module.
