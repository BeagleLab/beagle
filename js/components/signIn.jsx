var React = require('react')
var Button = require('react-bootstrap').Button

module.exports = React.createClass({
	displayName: 'Sign In',
	render: function () {
    var wellStyles = {maxWidth: 400, margin: '10px auto'}

    return (
      <div className="well" style={wellStyles}>
        <Button bsStyle="primary" bsSize="large" block>Sign In</Button>
        <Button bsSize="large" block>Sign Up</Button>
      </div>
    )
  }
})
