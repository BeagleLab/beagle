/*globals OAuth2 */

'use strict'

var React = require('react')

var Login = React.createClass({
  displayName: 'Login',
  getInitialState: function () {
    return { success: null }
  },
  handleClick: function (event) {
    var style = {
      padding: '5px 10px',
      textAlign: 'center'
    }

    try {
      // OAauth Code goes here.
      // console.log('No logic currently on click.')

      var googleAuth = new OAuth2('google', {
        client_id: '832850147593-mg2vg2j8j65t3djpsifme57pljgimbl9.apps.googleusercontent.com',
        client_secret: 'mU0P3j2ooRYMHOTT185g2f-b',
        api_scope: 'https://www.googleapis.com/auth/tasks'
      })

      console.log('Google auth')
      console.log('token1', googleAuth.getAccessToken())

      googleAuth.authorize(function () {
        console.log('token outside', googleAuth.getAccessToken())
      })

      // style.color = 'green'
      // this.setState({success: <p style={style}>You are now logged in!</p>})
    } catch (e) {
      style.color = 'red'
      this.setState({success: <p style={style}>There was an error.</p>})
      // console.log('It looks like you are traversing an embedded PDF.')
      // console.log('These are currently not selectable. Please report this.')
      // console.log(e.name, e.message)
      return
    }
  },
  render: function () {
    var style = {
      margin: '20px 0px',
      backgroundColor: 'CornflowerBlue'
    }
    return (
      <div>
        <button
          className="btn btn-success btn-block screenshot-button"
          onClick={this.handleClick}
          type="button"
          style={style}
        >
          Login
        </button>
        {this.state.succes}
      </div>
    )
  }
})

module.exports = Login
