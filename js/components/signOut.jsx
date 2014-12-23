/** @jsx React.DOM */
var React = require('react');
var Button = require('react-bootstrap').Button

var SignOut = React.createClass({
  displayName: 'Sign Out',
  render: function () {
    return <Button bsSize="xsmall" className='sign-out'>Sign out</Button>
  }
});

module.exports = SignOut;
