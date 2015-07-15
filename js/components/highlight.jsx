'use strict'

var React = require('react')
var rangy = require('rangy')
var schema = require('../data/schema.js')

var crypto = require('crypto')
var url = require('../lib/url-checks')
var PDFJS = require('beagle-pdf')
var cesc = require('chrome-ext-screen-capture')

var Highlight = React.createClass({
  displayName: 'Highlight',
  propTypes: {
    location: React.PropTypes.object,
    fingerprint: React.PropTypes.object
  },
  getInitialState: function () {
    return {text: false}
  },
  handleClick: function (event) {
    // In case we end up using it in the view (not currently)
    this.setState({text: !this.state.text})

    // Get the coordinates we need and the text itself
    var text = rangy.getSelection().toString()

    try {
      var htmlCoords = document.getSelection().getRangeAt(0).getBoundingClientRect()

      // Take a screenshot
      cesc.takeScreenshot(function (canvas) {
        var imgURL = cesc.renderPreview(htmlCoords, canvas, {padding: 20}).toDataURL('image/png')
        console.log('Check this out', imgURL)
      })
    } catch (e) {
      console.log('It looks like you are traversing an embedded PDF.')
      console.log('These are currently not selectable. Please report this.')
      console.log(e.name, e.message)
      return
    }

    // Get the PDF coordinates and highlight, if exists
    if (this.props.location) {
      var pdfCoords = PDFJS.getHightlightCoords()
      PDFJS.showHighlight(pdfCoords)
    }

    var documentId = (this.props.fingerprint) ? this.props.fingerprint : window.location.href

    var selection = {
      //  Should probably be called 'selection', not 'text'
      'text': text,

      // Store both coordinates for later
      'pdfCoords': (this.props.location) ? pdfCoords : null,
      'htmlCoords': htmlCoords,

      // We could also use the text as a hash, too.
      'id': crypto.randomBytes(20).toString('hex'),

      // This is the url for the PDF itself, in case other people use it
      'url': (this.props.location) ? url.getPDFURL(window.location.href) : window.location.href,

      // This is canonically the PDF id; else, just the name of the url should work.
      // TODO Hash this
      'documentId': documentId
    }

    if (this.props.location) {
      PDFJS.getFingerprint(url.getPDFURL(window.location.href),
        function setDocumentId (err, fingerprint) {
          if (err) { console.log('Could not properly get PDF fingerprint') }

          schema.saveSelection(selection, documentId)
        }
      )
    } else {
      schema.saveSelection(selection, documentId)
    }
  },
  render: function () {
    return (
      <div onClick={this.handleClick}>
        Highlight
      </div>
    )
  }
})

module.exports = Highlight
