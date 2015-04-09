'use strict'

var React = require('react')
var rangy = require('rangy')({'alertOnFail': false})
// var level = require('level-browserify')
// var db = level('http://54.164.111.240:5984/test')
// var db = new PouchDB('http://54.164.111.240:5984/test')
var PouchDB = require('pouchdb')
var db = new PouchDB('test')

var crypto = require('crypto')
var url = require('../lib/url-checks')
var pdfjs = require('beagle-pdf')
var cesc = require('chrome-ext-screen-capture')

function saveSelection (documentId, selection) {
  db.get(documentId, function (err, value) {
    if (err && err.name !== 'not_found') {
      return console.log('Failed to get ' + documentId + 'from db', err)
    }
    /* Instantiate the object if it doesn't exist yet */
    value = value || {}
    value._id = documentId

    /* Add in the selection to the selections array */
    value.selections = value.selections || []
    value.selections.push(selection)

    /* Get rid of prototypes so we can put this to the database */
    value = JSON.parse(JSON.stringify(value))

    db.put(value, function (err, response) {
      if (err) { console.log('Failed to save selection', err) }
      console.log('Stored ' + response.id + ' away...', response)

      PouchDB.sync('test', 'http://54.164.111.240:5984/test')

    })
  })
}

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

    // Define local vars
    var location = this.props.location || null
    var fingerprint = this.props.fingerprint || null

    try {
      var htmlCoords = document.getSelection().getRangeAt(0).getBoundingClientRect()
      var pdfCoords = (location) ? pdfjs.getHightlightCoords() : null

      // Take a screenshot
      cesc.takeScreenshot(null, function (canvas) {
        var imgURL = cesc.renderPreview(htmlCoords, canvas, {padding: 20}).toDataURL('image/png')
        console.log('Check this out', imgURL)

        // Get the PDF coordinates and highlight, if exists
        if (location) pdfjs.showHighlight(pdfCoords)

        var documentId = fingerprint || window.location.href

        var selection = {
          //  Should probably be called 'selection', not 'text'
          'text': text,

          // Store both coordinates for later
          'pdfCoords': pdfCoords,
          'htmlCoords': htmlCoords,

          // We could also use the text as a hash, too.
          'id': crypto.randomBytes(20).toString('hex'),

          // This is the url for the PDF itself, in case other people use it
          'url': (location) ? url.getPDFURL(window.location.href) : window.location.href,

          // This is canonically the PDF id; else, just the name of the url should work.
          // TODO Hash this
          'documentId': documentId,

          // Screenshot
          'screenshot': imgURL
        }

        if (location) {
          pdfjs.getFingerprint(url.getPDFURL(window.location.href),
            function setDocumentId (err, fingerprint) {
              if (err) { console.log('Could not properly get PDF fingerprint') }

              saveSelection(documentId, selection)
            }
          )
        } else {
          saveSelection(documentId, selection)
        }
      })
    } catch (e) {
      console.log('It looks like you are traversing an embedded PDF.')
      console.log('These are currently not selectable. Please report this.')
      console.log(e.name, e.message)
      return
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
