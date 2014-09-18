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
