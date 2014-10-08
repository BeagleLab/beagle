var fs = require('fs');
var _ = require('underscore');

// Optional modules required by the user
var test = require('beagle-hello');
var pdfjs = require('beagle-pdf');

console.log('hello', pdfjs);


pdfjs.getDocument('node_modules/beagle-pdf/example.pdf').then(function (pdf) {
  console.log(pdf.getPage(1));
});

// The order of these will matter for loading HTML and CSS
// Eventually, it may be necessary to add overrides, at which point
// this should become an object.
var subModules = [test];

// Init
var sidebarOpen = false;


// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets(modules){
    
    // Init
    var sidebar = document.createElement('div');
    sidebar.id = "beagle-sidebar";

    // Start the CSS and HTML objects
    var concatCSS = document.createElement('style');
    
    // Get the global CSS
    // May be better for this to be async. For now, there are no checs;
    // it loads or not. The encoding ensures string return, not buffer.
    // Using path.join(__dirname, './main.css', ...) will be more portable,
    // but doesn't work in Chrome for some reason.
    concatCSS.innerHTML = fs.readFileSync(__dirname + '/main.css', 'utf8');
    var concatHTML = document.createElement('div');
    // Yes, this is the same name. May be best to rename.
    concatHTML.className = 'beagle-sidebar';
    
    // If needed later. No Global HTML at the moment.
    // fs.readFileSync(__dirname + '/sidebar.html', 'utf8');

    // Read in required modules
    _.each(subModules, function(module) {
      // Grab CSS and HTML files from required modules
      concatCSS.innerHTML += module.css;
      concatHTML.innerHTML += module.html;
    });

    // Mung it all together
    sidebar.appendChild(concatCSS);
    sidebar.appendChild(concatHTML);

    return sidebar;
}

// Handle requests from background.html
function handleRequest(
  // The object data with the request params
  request, 
  // These last two ones isn't important for this example.
  // If you want know more about it visit: 
  // http://code.google.com/chrome/extensions/messaging.html
  sender, sendResponse
  ) {
  if (request.callFunction == "toggleSidebar") {
    // If the extension has specified new modules to load
    var newModules = request.modules ? request.modules : null ;
    
    //Get the current list of used modules
    chrome.storage.sync.get('modules', function(result){

      var modules = result;

      // If there are new modules, append them
      if (newModules) {

        modules.dependencies = (modules.dependencies) ? modules.dependencies : [];

        _.each(newModules, function(module) {
          modules.dependencies.push(module);
        });

        // If there is a change, set it.
        chrome.storage.sync.set(modules);
      }

      // Continue building out the view 
      buildView(modules);
    });
  }
}

chrome.extension.onRequest.addListener(handleRequest);

function buildView(modules) {
  if (sidebarOpen) {
    var el = document.getElementById('beagle-sidebar');
    el.parentNode.removeChild(el);
    sidebarOpen = false;
  } else {
    var sidebar = buildStaticAssets(modules);
    document.body.appendChild(sidebar);
    sidebarOpen = true;
  }
}