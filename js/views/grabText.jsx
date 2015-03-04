'use strict'
var React = require('react')
var rangy = require('rangy')
var level = require('level-browserify')
var db = level('./mydb')
var crypto = require('crypto')

var GrabText = React.createClass({
  displayName: 'GrabText',
  getInitialState: function () {
    return {text: false}
  },
  handleClick: function (event) {
    this.setState({text: !this.state.text})
    var text = rangy.getSelection().getRangeAt(0)
    db.put('text', text, function (err) {
      if (err) return console.log('Ooops!', err) // some kind of I/O error
      console.log('Saved', text)
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
