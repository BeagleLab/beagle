'use strict'

var React = require('react')
var GitHub = require('./oauthGitHubButton.jsx')
var Google = require('./oauthGoogleButton.jsx')

var Login = React.createClass({
  displayName: 'Login',
  render: function () {
    var style = {
      margin: '20px 0px',
      backgroundColor: 'Grey'
    }
    return (
      <div className={style}>
        <GitHub />
        <Google />
      </div>
    )
  }
})

module.exports = Login
