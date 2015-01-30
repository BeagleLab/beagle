'use strict';
var React = require('react')
var rangy = require('rangy')
var level = require('level-browserify')
var db = level('./mydb')

var GetValue = React.createClass({
  displayName: 'GetValue',
  getInitialState: function() {
    return {text: false}
  },
  handleClick: function(event) {
    this.setState({text: !this.state.text})
    db.get('text', function (err, value) {
      if (err) return console.log('Ooops!', err) // likely the key was not found

      console.log('text=' + value)
    })
  },
  render: function () {
    return (
      <button className="btn btn-primary" type="button" onClick={this.handleClick}>
        Get Saved Value
      </button>
    );
  }
});

module.exports = GetValue;
