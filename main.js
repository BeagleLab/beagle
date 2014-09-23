var fs = require('fs');

/*Handle requests from background.html*/
function handleRequest(
  //The object data with the request params
  request, 
  //These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
  sender, sendResponse
  ) {
  if (request.callFunction == "toggleSidebar")
    toggleSidebar();
}
chrome.extension.onRequest.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarOpen = false;
function toggleSidebar() {
  if(sidebarOpen) {
    var el = document.getElementById('mySidebar');
    el.parentNode.removeChild(el);
    sidebarOpen = false;
  }
  else {
    var sidebar = document.createElement('div');
    sidebar.innerHTML = '<style>' + 
      fs.readFileSync(__dirname + '/main.css', 'utf8') + '</style>';
    sidebar.innerHTML += fs.readFileSync(__dirname + '/sidebar.html', 'utf8');
    sidebar.id = "mySidebar";
    document.body.appendChild(sidebar);
    sidebarOpen = true;
  }
}