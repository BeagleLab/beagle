"use strict";

var fs = require('fs')
var _ = require('lodash')
var rangy = require('rangy')

// Display modules
var style = require('beagle-style')
var React = require('react')
var App = require('./app.jsx')
var linkHandler = require('./linkhandler.js')
var sampleData = require('../lib/sampleData.js')

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
			var newModules = request.modules ? request.modules : null

			//Get the current list of used modules
			chrome.storage.sync.get('modules', function(result){

        var modules = result
				// If there are new modules, append them
				if (newModules) {

					modules.dependencies = (modules.dependencies) ? modules.dependencies : []

					_.each(newModules, function(module) {
						modules.dependencies.push(module)
					})

					// If there is a change, set it.
					chrome.storage.sync.set(modules)
				}

        // TODO Specify this only in the background.js file, not here.
				var options = {
					"altmetrics": true
				}

				parsePDF(options, modules)
			})
		} else {
			var el = document.getElementById('beagle-sidebar')
			el.parentNode.removeChild(el)
			sidebarOpen = false
		}
	}
}

function parsePDF(options, modules) {

  modules = modules || null

  function getPdfDocumentLocation () {
    if (document.querySelector("body>embed[type='application/pdf']")) {
      return window.location.href
    }
    else if (document.querySelector("iframe[type='application/pdf']")) {
      return document.querySelector("iframe[type='application/pdf']").contentDocument
    }
    else {
      return false
    }
  }

  try {
    if (!navigator.onLine) {
      throw (new Error('You are offline!'))
    } else if (!PDFJS) {
      throw (new Error('Error with PDFJS'))
    } else if (getPdfDocumentLocation()) {
      PDFJS.readPDF(getPdfDocumentLocation(), options, function(err, altmetricsData) {
        if (err !== null) { throw (new Error('Could not read the PDF')) }

        if (altmetricsData) {
          buildView(modules, {
            data: {
              altmetrics: altmetricsData,
            }
          })
        }
      })
    } else {
      buildView(modules);
      console.log('Not a pdf.')
    }
  }

  catch (e) {
    console.log(e.name, e.message)
  }
}

// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets(modules, textInput){
	var sidebar = document.createElement('div');
	sidebar.id = "beagle-sidebar";

	sidebar.innerHTML = '<link href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" />';
	sidebar.innerHTML += '<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">'

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
  console.log('textInput', textInput)
	React.renderComponent(
		document.getElementById('react')
		App(sampleData),
	)
	linkHandler()
	sidebarOpen = true
}

// check if we're loading in the browser as an extension
if (chrome && chrome.runtime && chrome.runtime.onMessage) {
	chrome.runtime.onMessage.addListener(handleRequest)
} else {

  // for ease of dev. (move these before shipping widely)
  var Abstract = require('./views/abstract.jsx')
  var Alert = require('./components/alert.jsx')
  var AltGraph = require('./views/altGraph.jsx')
  var Annotations = require('./views/annotations.jsx')
  var AnnotationsMilestone = require('./milestones/annotationsMilestone.jsx')
  var AuthorModal = require('./views/authorModal.jsx')
  var Champion = require('./components/champion.jsx')
  var Cite = require('./components/cite.jsx')
  var CiteModal = require('./views/citeModal.jsx')
  var Contact = require('./components/contact.jsx')
  var Figs = require('./views/figs.jsx')
  var GrabText = require('./views/grabText.jsx')
  var Graph = require('./views/graph.jsx')
  var GraphModal = require('./views/graphModal.jsx')
  var JournalModal = require('./views/journalModal.jsx')
  var LinkOut = require('./components/linkOut.jsx')
  var NoteModal = require('./views/noteModal.jsx')
  var NotificationBanner = require('./views/notificationBanner.jsx')
  var PaperModal = require('./views/paperModal.jsx')
  var Publication = require('./views/publication.jsx')
  var PublicationsList = require('./components/publicationsList.jsx')
  var PublicationsListWrapper = require('./components/publicationsListWrapper.jsx')
  var Save = require('./components/save.jsx')
  var SavedPapersModal = require('./views/savedPapersModal.jsx')
  var SignIn = require('./components/signIn.jsx')
  var SignOut = require('./components/signOut.jsx')
  var SignUpMilestone = require('./milestones/signUpMilestone.jsx')
  var Supplement = require('./views/supplement.jsx')
  var Tags = require('./components/tags.jsx')
  var TagsList = require('./components/tagsList.jsx')
  var TagsListWrapper = require('./components/tagsListWrapper.jsx')
  var TagsModal = require('./views/tagsModal.jsx')
  var TfIdf = require('./views/tfIdf.jsx')
  var Toc = require('./views/toc.jsx')

  try {
    parsePDF({'altmetrics': true})
  } catch (e) {
    console.log('PDF document not found in page (Following error is normal).')
    console.log(e.name, e.message)
  }

	// export some things on window for non-extension pages.
	// Declare all modules you need here. See comments above.
	window.bundle = {
    data: require('../lib/sampleData.js'),
    Abstract: Abstract,
    Alert: Alert,
    AltGraph: AltGraph,
    Annotations: Annotations,
    AnnotationsMilestone: AnnotationsMilestone, // This is just to show annotations in the sidebar, and shouldn't actually be necessary
    App: App,
    AuthorModal: AuthorModal,
    Champion: Champion,
    Cite: Cite,
    CiteModal: CiteModal,
    Contact: Contact,
    Figs: Figs,
    GrabText: GrabText,
    Graph: Graph,
    GraphModal: GraphModal,
    JournalModal: JournalModal,
    LinkOut: LinkOut,
    NoteModal: NoteModal,
    NotificationBanner: NotificationBanner,
    PaperModal: PaperModal,
    Publication: Publication,
    PublicationsList: PublicationsList,
    PublicationsListWrapper: PublicationsListWrapper,
    React: React,
    Save: Save,
    SavedPapersModal: SavedPapersModal,
    SignIn: SignIn,
    SignOut: SignOut,
    SignUpMilestone: SignUpMilestone,
    Supplement: Supplement,
    Tags: Tags,
    TagsList: TagsList,
    TagsListWrapper: TagsListWrapper,
    TagsModal: TagsModal,
    TfIdf: TfIdf,
    Toc: Toc,
	}
}
