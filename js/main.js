"use strict";

var fs = require('fs')
var _ = require('lodash')

// Display modules
var style = require('beagle-style')
var React = require('react')
var App = require('./app.jsx')
var linkHandler = require('./linkhandler.js')
var sampleData = require('../lib/sampleData.js')

// TODO Optional seems to have issues with non-essential errors, too.
var PDFJS = require('beagle-pdf')

var sidebarOpen = false,
  sidebarId = 'beagle-sidebar'

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
            altmetrics: altmetricsData,
            doctype: 'pdf'
          })
        }
      })
    } else {
      console.log('Not a pdf.')
      buildView(modules, {doctype: 'html'})
    }
  }

  catch (e) {
    console.log(e.name, e.message)
  }
}

// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets(modules, data){

  var sidebar, iframeCSS

  if (data.doctype === 'pdf') {

  	sidebar = document.createElement('div')
  	sidebar.id = sidebarId

  } else if (data.doctype === 'html') {

    if (document.getElementById(sidebarId)) {
      throw (new Error('id:' + sidebarId + 'taken. Use another id!'))
    }

    sidebar = document.createElement('iframe')
    sidebar.id = sidebarId

    // Get the CSS that is inject into the main page if it is HTML.
    if (document.head) {
      iframeCSS = document.createElement('style')
      iframeCSS.innerHTML = fs.readFileSync(__dirname + '/../build/iframe.min.css', 'utf8')
      document.head.appendChild(iframeCSS)
    } else {
      throw (new Error('There is no head for this document!'))
    }
  }

  document.body.appendChild(sidebar)

  // Start the CSS
  var concatCSS = document.createElement('style')
  concatCSS.innerHTML += '@import url("https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css");'
  concatCSS.innerHTML += '@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");'

  // Get the global CSS
  // May be better for this to be async. For now, there are no tests
  // it loads or not. The encoding ensures string return, not buffer.
  concatCSS.innerHTML += fs.readFileSync(__dirname + '/../build/bundle.min.css', 'utf8')

  // Grab CSS files from style module. CSS and HTML shouldn't be exported from
  // other submodules, in order to make sure that everything is modular.
  if (style) {
    concatCSS.innerHTML += (style.css) ? style.css : ''
  }

  // Make a wrapper for the HTML
  var outerPane = document.createElement('div')
  outerPane.id = 'react'
  outerPane.className = 'beagle-wrapper'

  // Mung it all together
  if (data.doctype === 'pdf') {
    sidebar.appendChild(concatCSS)
    sidebar.appendChild(outerPane)
  } else if (data.doctype === 'html') {
  	document.getElementById(sidebarId).contentDocument.head.appendChild(concatCSS)
  	document.getElementById(sidebarId).contentDocument.body.appendChild(outerPane)
  }
}

function buildView(modules, data) {
	data = data || null
	buildStaticAssets(modules, data)
  var parent = (data.doctype === 'pdf') ? document :
    document.getElementById(sidebarId).contentDocument
	React.renderComponent(
		App(sampleData),
		parent.getElementById('react')
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
