var optional = require('optional')
var fs = require('fs')
var _ = require('lodash')
var $ = require('jquery')

// Display modules
var style = require('beagle-style')
var React = require('react')
var App = require('./app.jsx')
var linkHandler = require('./linkhandler.js')

// for ease of dev. (move these before shipping widely)
var Milestones = require('./milestones.jsx')

// TODO Optional seems to have issues with non-essential errors, too.
var PDFJS = require('beagle-pdf')

var sidebarOpen = false;

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

    if (!sidebarOpen) {
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

        var options = {
          "altmetrics": true
        }

        try {
          if (!navigator.onLine) {
            throw (new Error('You are offline!'))
          } else if (!PDFJS) {
            console.log('PDFJS failed to load.');
            throw (new Error('Error with PDFJS'))
            // buildView(modules, 'Error with PDFJS');
          } else if (document.querySelector("body>embed[type='application/pdf']")) {

            PDFJS.readPDF(window.location.href, options, function(err, altmetricsData) {
              if (err !== null) {
                throw (new Error('Could not read the PDF'))
              }

              if (altmetricsData) buildView(modules, {
                data: {
                  altmetrics: altmetricsData,
                }
              })
            });
          } else {
            console.log('Not a pdf.');
            // console.log(window.location);
            // TODO Add in the DOM here.
            buildView(modules);
          }
        }

        catch (e) {
          console.log(e.name, e.message)
          buildView(modules, e.message)
        }
      });
    } else {
      var el = document.getElementById('beagle-sidebar');
      el.parentNode.removeChild(el);
      sidebarOpen = false;
    }
  }
}

// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets(modules, textInput){
  var sidebar = document.createElement('div');
  sidebar.id = "beagle-sidebar";

  sidebar.innerHTML = '<link href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" />';
  sidebar.innerHTML += '<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">'

  // Start the CSS and HTML objects
  var concatCSS = document.createElement('style');

  // Get the global CSS
  // May be better for this to be async. For now, there are no checs;
  // it loads or not. The encoding ensures string return, not buffer.
  // Using path.join(__dirname, './main.css', ...) will be more portable,
  // but doesn't work in Chrome for some reason.
  concatCSS.innerHTML += fs.readFileSync(__dirname + '/../build/bundle.min.css', 'utf8');

  var outerPane = document.createElement('div');
  outerPane.id = 'react';

  // Grab CSS files from style module. CSS and HTML shouldn't be exported from
  // other submodules, in order to make sure that everything is modular.
  if (style) {
    concatCSS.innerHTML += (style.css) ? style.css : '';
  }

  // Mung it all together
  sidebar.appendChild(concatCSS);
  sidebar.appendChild(outerPane);

  return sidebar;
}

function buildView(modules, textInput) {
  textInput = (textInput !== undefined) ? textInput : null;
  var sidebar = buildStaticAssets(modules, textInput);
  document.body.appendChild(sidebar);
  React.renderComponent(
    App(textInput),
    document.getElementById('react')
  )
  linkHandler()
  sidebarOpen = true;
}

// check if we're loading in the browser as an extension
if (chrome && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener(handleRequest);
} else {

  // export some things on window for non-extension pages.
  window.bundle = {
    React: React,
    App: App,
    Milestones: Milestones,
  }
}
