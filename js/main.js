var optional = require('optional')
var fs = require('fs')
var _ = require('lodash')
var Handlebars = require('handlebars')

var React = require('react')
var App = require('./app.jsx')
var linkHandler = require('./linkhandler.js')

// Non-optional modules. 
var style = require('beagle-style')

// TODO Optional seems to have issues with non-essential errors, too. 
var PDFJS = require('beagle-pdf')

// The order of these will matter for loading HTML and CSS
// Eventually, it may be necessary to add overrides, at which point
// this should become an object.
var subModules = [style];

var sidebarOpen = false;

// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets(modules, textInput){
  var sidebar = document.createElement('div');
  sidebar.id = "beagle-sidebar";
  sidebar.innerHTML = '<link href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" />'
  sidebar.innerHTML += '<link href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />'
  sidebar.innerHTML += '<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>'

  // Start the CSS and HTML objects
  var concatCSS = document.createElement('style');
  
  // Get the global CSS
  // May be better for this to be async. For now, there are no checs;
  // it loads or not. The encoding ensures string return, not buffer.
  // Using path.join(__dirname, './main.css', ...) will be more portable,
  // but doesn't work in Chrome for some reason.
  concatCSS.innerHTML = fs.readFileSync(__dirname + '/../build/bundle.min.css', 'utf8');
  var concatHTML = document.createElement('div');
  // Yes, this is the same name. May be best to rename.
  var outerPane = document.createElement('div');
  outerPane.className = 'scinav';
  outerPane.innerHTML += '<div class="pane-bg glass"></div>';
  
  concatHTML.className = 'pane';
  concatHTML.innerHTML += '<h2 style="text-align: center;">Beagle</h2>';
  
  // If needed later. No Global HTML at the moment.
  // fs.readFileSync(__dirname + '/sidebar.html', 'utf8');

  // Read in required modules
  if (subModules !== null) {
    _.each(subModules, function(module) {
      // Grab CSS and HTML files from required modules
      concatCSS.innerHTML += (module.css) ? module.css : '';
      concatHTML.innerHTML += (module.html) ? module.html : '';
    });
  }

  var source = "<h6>Publication</h6><ul><li id='title'>{{title}}</li>  <li>{{journal}}</li>  <li>{{doi}}</li></ul><h6>Graph</h6><a  class='alert alert-info' data-placement='top' title='' data-original-title='View citations'><i class='fa fa-share-alt'></i>Tweets: {{cited_by_tweeters_count}}</a><h6>Tags</h6>{{#each subjects}}<p>{{subject}}</p>{{/each}}<h3>{{#posts}}{{{link_to Post}}}{{/posts}}</h3>";
  var template = Handlebars.compile(source);

  // If there has been an error
  if (typeof textInput == 'string') {
    concatHTML.innerHTML += '<button type="button" class="btn btn-warning btn-full">' + 
      textInput + '</button>'
  } else     
  // Ideally, this would actually be part of the submodule conversation, above. 
  if (textInput !== null) {
    concatHTML.innerHTML += template(textInput);
    concatHTML.innerHTML += '<div id="webui-app"></div>'
  }
  
  // Mung it all together
  sidebar.appendChild(concatCSS);
  outerPane.appendChild(concatHTML);
  sidebar.appendChild(outerPane);

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

        if (!PDFJS) {
          console.log('PDFJS failed to load.');
          buildView(modules, 'Error with PDFJS');
        } else if (document.querySelector("body>embed[type='application/pdf']")) {
          
          PDFJS.readPDF(window.location.href, options, function(err, data) {
            if (err !== null) console.error(err)
            if (data) buildView(modules, data)
          });
        } else {
          console.log('Not a pdf.');
          // console.log(window.location);
          // TODO Add in the DOM here. 
          buildView(modules);
        }
      });
    } else {
      var el = document.getElementById('beagle-sidebar');
      el.parentNode.removeChild(el);
      sidebarOpen = false;
    }
  }
}

function buildView(modules, textInput) {
  textInput = (textInput !== undefined) ? textInput : null;
  var sidebar = buildStaticAssets(modules, textInput);
  document.body.appendChild(sidebar);
  var appEl = document.getElementById('webui-app')
  React.renderComponent(App(), appEl)
  linkHandler()
  sidebarOpen = true;
}

chrome.runtime.onMessage.addListener(handleRequest);
