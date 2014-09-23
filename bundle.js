(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


// Init
var sidebarOpen = false;

// TODO Include other beagle-* modules here, using alternative manifest

// TODO Enable Static Assets to go to other Views besides SideBar
function buildSidebarStaticAssets(){
    
    // Init
    var sidebar = document.createElement('div');
    sidebar.id = "beagle-sidebar";

    // TODO Concat CSS files
    // Add in CSS
    sidebar.innerHTML = '<style>' + 
    ".beagle-sidebar {\n  background:white;\n  box-shadow:0 0 1em black;\n  color: #000;\n  height:100%;\n  position:fixed;\n  right:0px;\n  top:0px;\n  width:30%;\n  z-index:999999;\n}\n" + '</style>';

    // TODO Concat HTML files
    // Add in HTML
    sidebar.innerHTML += "<div class=\"beagle-sidebar\">\n    <h1>Hello</h1>\n    World!\n</div>";

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
    toggleSidebar();
  }
}

chrome.extension.onRequest.addListener(handleRequest);

// TODO Stop destroying the sidebar - hide it instead.
function toggleSidebar() {
  if (sidebarOpen) {
    var el = document.getElementById('beagle-sidebar');
    el.parentNode.removeChild(el);
    sidebarOpen = false;
  } else {
    var sidebar = buildSidebarStaticAssets();
    document.body.appendChild(sidebar);
    sidebarOpen = true;
  }
}
},{}]},{},[1]);
