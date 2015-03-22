'use strict'

var React = require('react')
var rangy = require('rangy')({'alertOnFail': false})
var level = require('level-browserify')
var PouchDB = require('pouchdb');
var db = level('./mydb')
var crypto = require('crypto')
var url = require('../lib/url-checks')
var pdfjs = require('beagle-pdf')
var cesc = require('chrome-ext-screen-capture')

var Highlight = React.createClass({
  displayName: 'Highlight',
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
      var pdfCoords = pdfjs.getHightlightCoords()
      pdfjs.showHighlight(pdfCoords)
    }

    var selection = {
      //  Should probably be called 'selection', not 'text'
      'text': text,

      // Store both coordinates for later
      'pdfCoords': (this.props.location) ? pdfCoords : null,
      'htmlCoords': htmlCoords,

      // We could also use the text as a hash, too.
      'id': (this.props.fingerprint) ? this.props.fingerprint : crypto.randomBytes(20).toString('hex'),

      // This is the url for the PDF itself, in case other people use it
      'url': (this.props.location) ? url.getPDFURL(window.location.href) : window.location.href,

      // This is canonically the PDF id; else, just the name of the url should work.
      // TODO Hash this
      'document_id': (this.props.fingerprint) ? this.props.fingerprint : window.location.href
    }

    function saveSelection (selection) {
      console.log(selection)
      db.put(selection.id, selection, {'valueEncoding': 'json'}, function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error
        console.log('Stored ' + selection.id + ' away...')
      })
    }

    if (this.props.location) {
      pdfjs.getFingerprint(url.getPDFURL(window.location.href),
        function setDocumentId (err, fingerprint) {
          if (err) { console.log('Could not properly get PDF fingerprint') }
          // throw (new Error('Could not get the PDF fingerprint'))

          saveSelection(selection)
        }
      )
    } else {
      saveSelection(selection)
    }
  },
  render: function () {
    return (
      <button className="btn btn-success btn-block" type="button" onClick={this.handleClick}>
        Highlight
      </button>
    )
  }
})

module.exports = Highlight
