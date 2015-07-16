var React = require('react')
var ReactBootstrap = require('react-bootstrap')
var ButtonToolbar = ReactBootstrap.ButtonToolbar
var Button = ReactBootstrap.Button

var Highlight = require('./highlight.jsx')
var Screenshot = require('./screenshot.jsx')

var Toolbar = React.createClass({
  displayName: 'Toolbar',
  propTypes: {
    location: React.PropTypes.object,
    fingerprint: React.PropTypes.object,
    showConversation: React.PropTypes.func
    // notate: React.PropTypes.boolean,
    // highlight: React.PropTypes.boolean,
    // screenshot: React.PropTypes.boolean,
    // flag: React.PropTypes.boolean
  },
  // TODO Disable actions if not logged in
  render: function () {
    return (
      <ButtonToolbar>
        <Button onClick={this.props.showConversation} >
          Note
        </Button>
        <Button>
          <Highlight location={this.props.location} fingerprint={this.props.fingerprint} />
        </Button>
        <Button>
          <Screenshot fingerprint={this.props.fingerprint} location={this.props.location} />
        </Button>
        {/*
          // TODO Add in Flag functionality
          <Button>Flag</Button>
        */}
      </ButtonToolbar>
    )
  }
})

module.exports = exports = Toolbar
