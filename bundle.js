(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


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
      ".beagle-sidebar {\n  background:white;\n  box-shadow:0 0 1em black;\n  color: #990;\n  height:100%;\n  position:fixed;\n  right:0px;\n  top:0px;\n  width:30%;\n  z-index:999999;\n}\n" + '</style>';
    sidebar.innerHTML += "<div class=\"beagle-sidebar\">\n    <h1>Hello</h1>\n    World!\n</div>";
    sidebar.id = "mySidebar";
    document.body.appendChild(sidebar);
    sidebarOpen = true;
  }
}
},{}]},{},[1]);
