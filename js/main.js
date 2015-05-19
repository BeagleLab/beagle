'use strict'

var fs = require('fs')
var _ = require('lodash')
var pp = require('protocol-parser')
var domready = require('domready')
var style = require('beagle-style')
var React = require('react')
var App = React.createFactory(require('./app.jsx'))
var linkHandler = require('./utilities/linkhandler.js')
var sampleData = require('./data/sampleData.js').data
var url = require('./lib/url-checks')
var PDFJS = require('beagle-pdf')
var sidebarOpen = false
var sidebarId = 'beagle-sidebar'

// var level = require('level-browserify')
var PouchDB = require('pouchdb')
var db = new PouchDB('test')

PouchDB.sync('test', 'http://54.164.111.240:5984/test')

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
      getModules(request.modules, function(data) {
        parsePDF({'modules': data})
      })
    } else {
      // Remove the sidebar
      el = document.getElementById('beagle-sidebar')
      el.parentNode.removeChild(el)
      sidebarOpen = null
    }
    sendResponse()
  }
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
      console.log('Not a global pdf.')

      options.doctype = 'html'
      options.protocols = pp.parse(window, ['twitter', 'og', 'citation', 'dc'])

      buildView(options)
    }
  } catch (e) {
    console.trace()
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
  concatCSS.innerHTML += fs.readFileSync(__dirname + '/../build/main.min.css', 'utf8')

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
  var protocolsFound = !_.every(_.forOwn(options.protocols, function (protocol) { return !_.isEmpty(protocol) }))
  if (options.doctype === 'html' && protocolsFound) {
    console.log(options.protocols, !_.isEmpty(options.protocols))
  }

  var parent = (options.doctype === 'pdf') ? document :
    document.getElementById(sidebarId).contentDocument

  // Get Data
  // // PDFJS will not execute the callback a second time. I've no idea why. There
  // // isn't an error or a change in getPdfDocumentLocation() or options, it just
  // // doesn't fire the callback.
  if (options.pdfLocation) {
    // console.log('pdf location', options)

    PDFJS.getFingerprint(options.pdfLocation, function (err, fingerprint) {
      if (err) { throw (new Error('Could not get the PDF fingerprint')) }

      var val = {
        'fingerprint': fingerprint,
        'staticPath': '../../',
        'location': options.pdfLocation
      }

      window.beagle = {
        'pdf': val
      }

      var displayHighlights = function () {
        db.get(fingerprint, function (err, response) {
          if (err) { return console.log('Fingerprint not found in db', err) }
          // console.log('Fingerprint found in db', fingerprint, response)

          // TODO Remove highlights so that we don't get them every time,
          // and so that once rendered, they aren't rendered again.
          if (!window.beagle.highlights) {
            window.beagle.highlights = response.selections
          }

          _.forEach(window.beagle.highlights, function (selection, i) {
            // TODO Load in HTMLCoord highlights, too
            if (selection.pdfCoords && !selection.rendered) {
              PDFJS.showHighlight(selection.pdfCoords, function () {
                selection.rendered = true
              })
            }
          })
        })
      }

      // Called on initial load
      window.addEventListener('scalechange', displayHighlights(), true)

      // Called on scroll, repeatedly
      window.watchScroll(window.PDFViewerApplication.pdfViewer.container, function () {
        displayHighlights()
      })

      PDFJS.readPDFText(options.pdfLocation, options, function (err, data) {
        if (err === 'Failed to find a DOI.') {
          console.log('Failed to find a DOI.')
        } else if (err !== null) {
          throw (new Error('Could not read the PDF'))
        }

        val.data = (data) ? {'publication': data} : sampleData.data

        // console.log('PDF data and fingerprint', val)

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
if (window.location.pathname === '/pdfjs/web/viewer.html') {
  // console.log('In the PDF.js viewer')

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
}
