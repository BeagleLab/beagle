'use strict';
/** @jsx React.DOM */
var React = require('react')
var rangy = require('rangy')

var GrabText = React.createClass({
  displayName: 'GrabText',
  getInitialState: function() {
    return {text: false}
  },
  handleClick: function(event) {
    this.setState({text: !this.state.text})
    alert(rangy.getSelection().getRangeAt(0))
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
