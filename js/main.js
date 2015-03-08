'use strict'

var fs = require('fs')
var _ = require('lodash')
var pp = require('protocol-parser')
var domready = require('domready')
var style = require('beagle-style')
var React = require('react')
var App = React.createFactory(require('./app.jsx'))
var linkHandler = require('./linkhandler.js')
var sampleData = require('../lib/sampleData.js')
var url = require('./lib/url-checks')
var PDFJS = require('beagle-pdf')
var sidebarOpen = false
var sidebarId = 'beagle-sidebar'

// console.log('Main.js is being called from inside bundle.min.js')

function getModules (requestModules, cb) {
  // Get the current list of used modules
  chrome.storage.sync.get('modules', function (result) {
    var options = {}

    // If the extension has specified new modules to load
    if (requestModules) {
      result.dependencies = (result.dependencies) ? result.dependencies : []
      _.each(requestModules, function (module) {
        result.dependencies.push(module)
      })
      // If there is a change, set it.
      chrome.storage.sync.set(result)
    }

    _.each(result.dependencies, function (module) {
      options[module] = true
    })

    // Options and modules are essentially the same - options comes from local
    // storage, while modules should come from the background page.
    // So, we just return the options module.
    // TODO Test this, may not work in all envs.
    // console.log('options', options)
    if (cb) {
      return cb(options)
    } else {
      return options
    }
  })
}

// Handle requests from background.html
function handleRequest (request, sender, sendResponse) {
  var el

  if (request.callFunction === 'toggleSidebar') {
    if (!sidebarOpen) {
      // Get modules from background script and local storage,
      // Go on to build the sidebar
      parsePDF({'modules': getModules(request.modules)})
    } else {
      // Remove the sidebar
      el = document.getElementById('beagle-sidebar')
      el.parentNode.removeChild(el)
      sidebarOpen = null
    }
  }

  sendResponse()
}

// TODO Rename. isDocumentPDFOrHTML is better.
function parsePDF (options) {
  function getPdfDocumentLocation () {
    if (document.querySelector("body>embed[type='application/pdf']")) {
      return window.location.href
    } else if (document.querySelector("iframe[type='application/pdf']")) {
      return document.querySelector("iframe[type='application/pdf']").contentDocument
    } else {
      return false
    }
  }

  try {
    if (!navigator.onLine) {
      throw (new Error('You are offline!'))
    } else if (!PDFJS) {
      throw (new Error('PDFJS not being loaded in main.js'))
    } else if (getPdfDocumentLocation()) {
      options.doctype = 'pdf'
      options.pdfLocation = getPdfDocumentLocation()
      buildView(options)
    } else {
      console.log('Not a pdf.')

      options.doctype = 'html'
      options.protocols = pp.parse(window, ['twitter', 'og', 'citation', 'dc'])

      buildView(options)
    }
  } catch (e) {
    console.log(e.name, e.message)
  }
}

// TODO Enable Static Assets to go to other Views besides SideBar
function buildStaticAssets (options) {
  var sidebar, iframeCSS

  if (options.doctype === 'pdf') {
    sidebar = document.createElement('div')
    sidebar.id = sidebarId
    document.body.appendChild(sidebar)
  } else {
    // If !doctype === 'viewer'
    if (options.doctype === 'html') {
      if (document.getElementById(sidebarId)) {
        throw (new Error('id:' + sidebarId + 'taken. Use another id!'))
      }
      sidebar = document.createElement('iframe')
      sidebar.id = sidebarId
      document.body.appendChild(sidebar)
    }

    // Get the CSS that is inject into the main page if it is HTML.
    if (document.head) {
      iframeCSS = document.createElement('style')
      iframeCSS.innerHTML = fs.readFileSync(__dirname + '/../build/iframe.min.css', 'utf8')
      document.head.appendChild(iframeCSS)
    } else {
      throw (new Error('There is no head for this document!'))
    }
  }

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
  if (options.doctype === 'pdf') {
    sidebar.appendChild(concatCSS)
    sidebar.appendChild(outerPane)
  } else {
    document.getElementById(sidebarId).contentDocument.head.appendChild(concatCSS)
    document.getElementById(sidebarId).contentDocument.body.appendChild(outerPane)
  }
}

function buildView (options) {
  buildStaticAssets(options)

  // TODO Where should data from modules be routed?
  // This is unrelated code to the main point of this function and shouldn't be here.
  if (options.doctype === 'html' && !_.every(_.forOwn(options.protocols, function (protocol) { return !_.isEmpty(protocol) })))
    console.log(options.protocols, !_.isEmpty(options.protocols))

  var parent = (options.doctype === 'pdf') ? document :
    document.getElementById(sidebarId).contentDocument

  // Get Data
  // // PDFJS will not execute the callback a second time. I've no idea why. There
  // // isn't an error or a change in getPdfDocumentLocation() or options, it just
  // // doesn't fire the callback.
  if (options.pdfLocation) {
    console.log('pdf location', options)

    PDFJS.getFingerprint(options.pdfLocation, function (err, fingerprint) {
      if (err) {
        throw (new Error('Could not get the PDF fingerprint'))
      }
      var val = { 'fingerprint': fingerprint }

      PDFJS.readPDFText(options.pdfLocation, options, function (err, data) {
        if (err === 'Failed to find a DOI.') {
          console.log('Failed to find a DOI.')
        } else if (err !== null) {
          throw (new Error('Could not read the PDF'))
        }

        val.data = (data) ? {'publication': data} : sampleData.data

        console.log('PDF data and fingerprint', val)

        React.render(
          App(val),
          parent.getElementById('react')
        )
      })
    })
  } else {
    React.render(
      App(sampleData),
      parent.getElementById('react')
    )
  }

  linkHandler()

  if (options.doctype !== 'viewer') {
    sidebarOpen = true
  }
}

// If we're loading Beagle in viewer.html
if (window.location.pathname === '/content/web/viewer.html') {
  console.log('In the PDF.js viewer')

  domready(function () {
    getModules(['altmetrics'], function (modules) {
      buildView({
        'modules': modules,
        'doctype': 'viewer',
        'pdfLocation': url.getPDFURL(window.location.href)
      })
    })
  })

// If we're injecting the sidebar
} else if (chrome && chrome.runtime && chrome.runtime.onMessage) {
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
    Toc: Toc
  }
}
