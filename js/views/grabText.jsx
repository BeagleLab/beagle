'use strict';
var React = require('react')
var rangy = require('rangy')

var GrabText = React.createClass({
  displayName: 'GrabText',
  getInitialState: function() {
    return {text: false}
  },
  handleClick: function(event) {
    this.setState({text: !this.state.text})
    // Save it using the Chrome extension storage API.
    var text = rangy.getSelection().getRangeAt(0)
    chrome.storage.sync.set({'value': text.startContainer.data}, function() {
      // Notify that we saved.
      alert('Text saved: ', text.startContainer.data)
      console.log('Text saved', text.startContainer.data)
    })
  },
  render: function () {
    return (
      <button className="btn" onClick={this.handleClick}>
        test
      </button>
    );
  }
});

module.exports = GrabText;
