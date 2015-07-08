'use strict'

var React = require('react')
var rangy = require('rangy')
var PouchDB = require('pouchdb')
var PouchDBUrl = require('../env.js').PouchDBUrl
var db = new PouchDB(PouchDBUrl)

var crypto = require('crypto')
var url = require('../lib/url-checks')
var PDFJS = require('beagle-pdf')
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

    function saveSelection (selection) {
      db.allDocs({include_docs: true, key: documentId}, function (err, value) {
        if (err && err.name !== 'not_found') {
          return console.log('Failed to get ' + documentId + 'from db', err)
        } else if (err) {
          return console.log(err)
        }

        var row = value.rows[0]

        /* Instantiate the object if it doesn't exist yet */
        var doc = row.doc || {}
        doc._id = documentId
        if (row.value && row.value.rev) {
          doc._rev = row.value.rev
        }

        /* Add in the selection to the selections array */
        doc.selections = doc.selections || []
        doc.selections.push(selection)

        /* Get rid of prototypes so we can put this to the database */
        doc = JSON.parse(JSON.stringify(doc))

        db.put(doc, function (err, response) {
          if (err) {
            console.log('Failed to save selection', err)
          } else {
            console.log('Stored ' + response.id + ' away...', response)
          }
        })
      })
    }

    if (this.props.location) {
      PDFJS.getFingerprint(url.getPDFURL(window.location.href),
        function setDocumentId (err, fingerprint) {
          if (err) { console.log('Could not properly get PDF fingerprint') }

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
