var fs = require('fs');

// Init
var sidebarOpen = false;

// TODO Include other beagle-* modules here, using alternative manifest

// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets(){
    
    // Init
    var sidebar = document.createElement('div');
    sidebar.id = "beagle-sidebar";

    // TODO Concat CSS files
    // Add in CSS
    sidebar.innerHTML = '<style>' + 
    fs.readFileSync(__dirname + '/main.css', 'utf8') + '</style>';

    // TODO Concat HTML files
    // Add in HTML
    sidebar.innerHTML += fs.readFileSync(__dirname + '/sidebar.html', 'utf8');

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
    // A param should be able to go here with extra modules
    // Which can be added to the required list. 
    buildView();
  }
}

chrome.extension.onRequest.addListener(handleRequest);

// TODO Stop destroying the sidebar - hide it instead.
function buildView() {
  if (sidebarOpen) {
    var el = document.getElementById('beagle-sidebar');
    el.parentNode.removeChild(el);
    sidebarOpen = false;
  } else {
    var sidebar = buildStaticAssets();
    document.body.appendChild(sidebar);
    sidebarOpen = true;
  }
}