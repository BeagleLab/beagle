'use strict'

var React = require('react')
var cesc = require('chrome-ext-screen-capture')

var Screenshot = React.createClass({
  displayName: 'Screenshot',
  getInitialState: function () {
    return { noSelection: null }
  },
  handleClick: function (event) {
    try {
      // Get coordinates based on type of document
      var coordinates =
        document.getSelection().getRangeAt(0).getBoundingClientRect()

      // Take a screenshot
      cesc.takeScreenshot(function (canvas) {
        var imgUrl = cesc.renderPreview(coordinates, canvas, {padding: 20})
          .toDataURL('image/png')
        chrome.tabs.create({ url: imgUrl })
      })

      this.setState({noSelection: null})
    } catch (e) {
      var style = {
        color: 'red',
        padding: '5px 10px',
        textAlign: 'center'
      }

      this.setState({noSelection: <p style={style}>You need to select text first!</p>})
      // console.log('It looks like you are traversing an embedded PDF.')
      // console.log('These are currently not selectable. Please report this.')
      // console.log(e.name, e.message)
      return
    }
  },
  render: function () {
    return (
      <div>
        <button
          className="btn btn-success btn-block screenshot-button"
          onClick={this.handleClick}
          type="button"
        >
          Take a Screenshot
        </button>
        {this.state.noSelection}
      </div>
    )
  }
})

module.exports = Screenshot
