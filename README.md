beagle
======

[![Join the chat at https://gitter.im/BeagleLab/beagle](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/BeagleLab/beagle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![license](http://img.shields.io/badge/license-MIT-red.svg?style=flat)](https://raw.githubusercontent.com/BeagleLab/beagle/master/LICENSE)

Navigating the sea of publications

##Installation

1. Git clone this repository.
2. In order to enable this in chrome, you need to open Chrome Settings > Extensions. Click 'Load Unpacked Extension'. Select the `build` folder from within this repository. 
3. Go to any page, and click on the icon in the search bar. To see best results, click the icon while looking at a pdf. 

### Developer Installation

You will need to install [node](http://nodejs.org/). This will come with npm preinstalled. Once you have cloned the folder, following the first step above, run `npm install`. 

When you have edited `main.js` or any dependency of it, run: `$ gulp`

This will set up a watcher on the code - when you make changes, it will reflect those changes in `build`, which you need to manually refresh from the Chrome Extensions page. Once 'default' has finished, you should cancel out it by pressing Ctrl+C if you're not interested in watching it for more changes.  

If you need to watch `background.js` instead, run `gulp --path background`. 

This will ensure that everything is compiled into bundle.js. You may need to run `npm install browserify -g` first. After it states `default done`, go to the Chrome Extensions page, and refresh it. Refresh the page your .pdf or browser is loaded on before clicking the Beagle icon, as well. Everything should be all set.

On changes, all of your edits will be automagically bundled for you. Just refresh the extension and the page you're testing on.

Here is a screencast of me going over all of the code, if that's helpful: https://www.screenmailer.com/v/jDCSGJmBaNZpVw4

Let us know what else you'd need to do here, I suspect there is more. 

### Style

We use feross's [standard](https://github.com/feross/standard). Please use a hinter or linter which adheres to it - if you need help, ask @RichardLitt. 

When in doubt, plunk it into a new module. 
