var fs = require('fs');
var _ = require('underscore');
var Handlebars = require('handlebars');

// Non-optional modules
var PDFJS = require('beagle-pdf');

// Optional modules required by the user
var altmetrics = require('beagle-altmetrics');

// The order of these will matter for loading HTML and CSS
// Eventually, it may be necessary to add overrides, at which point
// this should become an object.
var subModules = [];

var sidebarOpen = false;

// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets(modules, textInput){
    
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
    if (subModules !== null) {
      _.each(subModules, function(module) {
        // Grab CSS and HTML files from required modules
        concatCSS.innerHTML += module.css;
        concatHTML.innerHTML += module.html;
      });
    }

    var source = "<h3>Publication</h3><ul>  <li>{{title}}</li>  <li>{{journal}}</li>  <li>{{doi}}</li></ul><h3>Graph</h3><p>Tweets: {{cited_by_tweeters_count}}</p><h3>Tags</h3>{{#each subjects}}<p>{{subject}}</p>{{/each}}<h3>{{#posts}}{{{link_to Post}}}{{/posts}}</h3>";
    var template = Handlebars.compile(source);

    // Ideally, this would actually be part of the submodule conversation, above. 
    if (textInput !== null) {
      concatHTML.innerHTML += template(textInput);
    }

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

      console.log(window);

      // TODO Separate this so that it is more modular
      PDFJS.pdfjs.getDocument(window.location.href).then(function(pdf) {
        
        // May not be useful at the moment.
        // pdf.getMetadata().then(function(data){
        //   console.log('Metadata:', data);
        // });

        numPages = pdf.numPages;
        // Define vars where they won't be redefined in each loop in if statements
        var response, pageInfo, doi, match;
        // The most robust RegExp for doi matching I could find and edit for javascript
        var myRe = new RegExp('doi\\:(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?!["&\'<>])\\S)+)(\\.[a-zA-Z]{1}[0-9]{3})', 'g');
        for (i = 0; i <= numPages; i++) {
          pdf.getPage(i).then(function(page) {   
            page.getTextContent().then(function(textContent) {
              _.each(textContent.items, function(item){
                // TODO match[2] tracks .t001, .g001, etc. Capture these, they may be relevant
                // to research. 
                match = myRe.exec(item.str);
                if (match && !response) {
                  if (!doi) {
                    // Only call once, for now. TODO Multiple DOIs
                    doi = match[1]; 
                    altmetrics.getDataFromDoi(match[1], function(err, data){
                      if (err !== null) {
                        console.error(err);
                        // What does process do?
                        process.exit(-1); 
                      }

                      buildView(modules, data);
                    });
                    response = true;
                  }
                }
              });
            });
          });
        }
      }, function(err){
        buildView(modules);
      });

      // Continue building out the view 
    });
  }
}

function buildView(modules, textInput) {
  if (sidebarOpen) {
    var el = document.getElementById('beagle-sidebar');
    el.parentNode.removeChild(el);
    sidebarOpen = false;
  } else {
    textInput = (textInput !== undefined) ? textInput : null;
    var sidebar = buildStaticAssets(modules, textInput);
    document.body.appendChild(sidebar);
    sidebarOpen = true;
  }
}

chrome.runtime.onMessage.addListener(handleRequest);
