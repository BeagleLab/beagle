beagle
======

Navigating the sea of publications

##Installation

1. Git clone this repository.
2. In order to enable this in chrome, you need to open Chrome Settings > Extensions. Click 'Load Unpacked Extension', then select the folder you downloaded in the first step.
3. Load a pdf in Chrome to maximise usage, or just click on the icon in the search bar on any page.

### Developer Installation

You will need to install [node](http://nodejs.org/). This will come with npm preinstalled. Once you have cloned the folder, following the first step above, run `npm install`. 

When you have edited `main.js` or any dependency of it, run:

`browserify -t brfs main.js > bundle.js`

This will ensure that everything is compiled into bundle.js. You may need to run `npm install browserify -g` first. Go to the Chrome Extensions page, and refresh it. Refresh the page your .pdf or browser is loaded on before clicking the Beagle icon, as well. Everything should be all set.

If you don't like running `browserify` every time you want to change something, I don't blame you. Run this, instead:

`watchify -t brfs main.js -o bundle.js -v`

All of your edits will be automagically bundled for you. Just refresh the extension and the page you're testing on. 

## Module Plan

### Beagle-core
* Install all necessary modules
* Install all optional modules
* Compile together HTML and CSS
* Send to a viewer (sidebar, elsewhere)

### Beagle-extension
* Take in what was sent from Beagle Core
* Display in sidebar.html and sidebar.css

## Open questions
* How do I require modules based on user input?
    - A: Simple argument object passed in (to what?)? Can I have a live node implementation running on the extension? Browserify needs to be working on the extension in order to compile on the fly; do I add in modules and then demand that the user refresh the page // the extension? This won't work.
* How do I require html and css from required modules? 
* How do I best concatinate html and css?
* How do I have live reloading of HTML, CSS, and JS dependencies? 

##Goal

```
// beagle-core/index.js
var annotationModule = require('beagle-annotation-module')
var citationModule = require('beagle-citation-module')
var localStorage = require('beagle-local-storage')
 
function coreModule() {
  if (!(this instanceof coreModule))  
    return new coreModule()
  
  var m = this.modules = {}
  m.localStorage = localStorage()
  m.citations = citationModule(m.localStorage)
  m.annotations = annotationModule(m.citations)
}
 
---
// beagle-citations/index.js
 
module.exports = citationModule
function citationModule(citations) {
  ...
}
 
 
---
// beagle-annotation/index.js
 
module.exports = annotationModule
function annotationModule(citations) {
  ...
}
 
```
