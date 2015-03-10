'use strict'

var React = require('react')
var rangy = require('rangy')({'alertOnFail': false})
var level = require('level-browserify')
var db = level('./mydb')
var crypto = require('crypto')
var url = require('../lib/url-checks')
var pdfjs = require('beagle-pdf')
var cesc = require('chrome-ext-screen-capture')
var _ = require('lodash')

function getHightlightCoords () {
  var pageIndex = window.PDFViewerApplication.pdfViewer.currentPageNumber - 1
  var page = window.PDFViewerApplication.pdfViewer.pages[pageIndex]
  var pageRect = page.canvas.getClientRects()[0]
  var selectionRects = window.getSelection().getRangeAt(0).getClientRects()
  var viewport = page.viewport
  var selected = _.map(selectionRects, function (r) {
    return viewport.convertToPdfPoint(r.left - pageRect.left, r.top - pageRect.top).concat(
       viewport.convertToPdfPoint(r.right - pageRect.left, r.bottom - pageRect.top))
  })
  return {page: pageIndex, coords: selected}
}

function showHighlight (selected) {
  var pageIndex = selected.page
  var page = window.PDFViewerApplication.pdfViewer.pages[pageIndex]
  var pageElement = page.canvas.parentElement
  var viewport = page.viewport
  selected.coords.forEach(function (rect) {
    var bounds = viewport.convertToViewportRectangle(rect)
    var el = document.createElement('div')
    el.setAttribute('style', 'position: absolute; background-color: rgba(238, 170, 0, .2);' +
      'left:' + Math.min(bounds[0], bounds[2]) + 'px; top:' + Math.min(bounds[1], bounds[3]) + 'px;' +
      'width:' + Math.abs(bounds[0] - bounds[2]) + 'px; height:' + Math.abs(bounds[1] - bounds[3]) + 'px;')
    pageElement.appendChild(el)
  })
}

var GrabText = React.createClass({
  displayName: 'GrabText',
  getInitialState: function () {
    return {text: false}
  },
  handleClick: function (event) {
    // In case we end up using it in the view (not currently)
    this.setState({text: !this.state.text})

    // Get the coordinates we need and the text itself
    var pdfCoords = getHightlightCoords()
    var htmlCoords = document.getSelection().getRangeAt(0).getBoundingClientRect()
    var text = rangy.getSelection().toString()

    // Highlight the selected text
    showHighlight(pdfCoords)

    // Take a screenshot
    cesc.takeScreenshot(function (canvas) {
      var imgURL = cesc.renderPreview(htmlCoords, canvas, {padding: 20}).toDataURL('image/png')
      console.log('Check this out', imgURL)
    })

    pdfjs.getFingerprint(url.getPDFURL(window.location.href),
      function setDocumentId (err, fingerprint) {
        if (err) { console.log('Could not properly get PDF fingerprint') }
        // throw (new Error('Could not get the PDF fingerprint'))

        var selection = {
          //  Should probably be called 'selection', not 'text'
          'text': text,

          // Store both coordinates for later
          'pdfCoords': (pdfCoords) ? pdfCoords : null,
          'htmlCoords': htmlCoords,

          // We could also use the text as a hash, too.
          'id': crypto.randomBytes(20).toString('hex'),

          // This is the url for the PDF itself, in case other people use it
          'url': url.getPDFURL(window.location.href),

          // This is canonically the PDF id; else, just the name of the url should work.
          'document_id': (fingerprint) ? fingerprint : url.getPDFURL(window.location.href)
        }

        console.log(selection)
        db.put(selection.id, selection, {'valueEncoding': 'json'}, function (err) {
          if (err) return console.log('Ooops!', err) // some kind of I/O error
          console.log('Stored ' + selection.id + ' away...')
        })
      }
    )

    // chrome.storage.sync.set({'value': text.startContainer.data}, function() {
    //   // Notify that we saved.
    //   alert('Text saved: ', text.startContainer.data)
    //   console.log('Text saved', text.startContainer.data)
    // })
  },
  render: function () {
    return (
      <button className="btn btn-success" type="button" onClick={this.handleClick}>
        Save Text
      </button>
    )
  }
})

module.exports = GrabText
