'use strict'

var React = require('react')
var pdfjs = require('beagle-pdf')
var cesc = require('chrome-ext-screen-capture')

var Screenshot = React.createClass({
  displayName: 'Screenshot',
  handleClick: function (event) {
    try {
      // Get coordinates based on type of document
      var coordinates =
        document.getSelection().getRangeAt(0).getBoundingClientRect()

      // Take a screenshot
      cesc.takeScreenshot(function (canvas) {
        var imgURL = cesc.renderPreview(coordinates, canvas, {padding: 20})
          .toDataURL('image/png')
        console.log('Check this out', imgURL)
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
      <button
        className="btn btn-success btn-block"
        onClick={this.handleClick}
        type="button"
      >
        Log Screenshot
      </button>
    )
  }
})

module.exports = Screenshot
