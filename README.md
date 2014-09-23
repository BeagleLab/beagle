beagle
======

Navigating the sea of publications

##Installation

1. Git clone this repository.
2. Run `browserify -t brfs ./main.js > bundle.js`.
2. Open Chrome Settings > Extensions.
2. Click 'Load Unpacked Extension'.
3. Select the repository folder.
4. Click on the icon in the search bar on any page.

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
