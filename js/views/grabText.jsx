'use strict'
var React = require('react')
var rangy = require('rangy')
var level = require('level-browserify')
var db = level('./mydb')
var crypto = require('crypto')
var url = require('../lib/url-checks')
var pdfjs = require('beagle-pdf')

var GrabText = React.createClass({
  displayName: 'GrabText',
  getInitialState: function () {
    return {text: false}
  },
  handleClick: function (event) {
    this.setState({text: !this.state.text})
    var text = rangy.getSelection().getRangeAt(0)

    pdfjs.getFingerprint(url.getPDFURL(window.location.href),
      function setDocumentId(err, fingerprint) {
        if (err) {
          console.log('Could not properly get PDF fingerprint')
          // throw (new Error('Could not get the PDF fingerprint'))
        }

        var selection = {
          //  Should probably be called 'selection', not 'text'
          'text': text,

          // We could also use the text as a hash, too.
          'id': crypto.randomBytes(20).toString('hex'),

          'url': url.getPDFURL(window.location.href),

          // This is canonically the PDF id; else, just the name of the url should work.
          'document_id': (fingerprint) ? fingerprint : url.getPDFURL(window.location.href)
        }
      }
    )

    db.put(selection.id, selection, function (err) {
      if (err) return console.log('Ooops!', err) // some kind of I/O error
      console.log(selection)
    })
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
    );
  }
})

module.exports = GrabText
