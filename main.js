var fs = require('fs');
var _ = require('underscore');

// Init
var sidebarOpen = false;

// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets(modules){
    
    // Init
    var sidebar = document.createElement('div');
    sidebar.id = "beagle-sidebar";

    // Grab CSS and HTML files from required modules

    // TODO Concat CSS files
    // Add in CSS
    sidebar.innerHTML = '<style>' + 
    fs.readFileSync(__dirname + '/main.css', 'utf8') + 
    test.load().css + 
    '</style>';

    // TODO Concat HTML files
    // Add in HTML
    // sidebar.innerHTML += fs.readFileSync(__dirname + '/sidebar.html', 'utf8');
    sidebar.innerHTML += test.load().html;

    return sidebar;
}

// This function will write a manifest to local storage
function setManifest(modules) {
   
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