beagle
======

[![license](http://img.shields.io/badge/license-MIT-red.svg?style=flat)](https://raw.githubusercontent.com/BeagleLab/beagle/master/LICENSE)

Navigating the sea of publications

##Installation

1. Git clone this repository.
2. In order to enable this in chrome, you need to open Chrome Settings > Extensions. Click 'Load Unpacked Extension', then select the folder you downloaded in the first step.
3. Load a pdf in Chrome to maximise usage, or just click on the icon in the search bar on any page.

### Developer Installation

You will need to install [node](http://nodejs.org/). This will come with npm preinstalled. Once you have cloned the folder, following the first step above, run `npm install`. 

When you have edited `main.js` or any dependency of it, run:

`gulp`.

Let us know what else you'd need to do here, I suspect there is more. 

This will ensure that everything is compiled into bundle.js. You may need to run `npm install browserify -g` first. After it states `default done`, go to the Chrome Extensions page, and refresh it. Refresh the page your .pdf or browser is loaded on before clicking the Beagle icon, as well. Everything should be all set.

On changes, all of your edits will be automagically bundled for you. Just refresh the extension and the page you're testing on. 