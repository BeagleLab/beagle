'use strict'

var React = require('react')
var Google = require('./oauthGoogleButton.jsx')
// TODO Add GitHub API
// var GitHub = require('./oauthGitHubButton.jsx')

var Login = React.createClass({
  displayName: 'Login',
  propTypes: {
    setAvatar: React.PropTypes.func
  },
  render: function () {
    var style = {
      margin: '20px 0px'
    }

    return (
      <div className={style}>
        {/* <GitHub /> */}
        <Google setAvatar={this.props.setAvatar} />
      </div>
    )
  }
})

module.exports = Login
