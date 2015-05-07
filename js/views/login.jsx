/*globals OAuth */
'use strict'

var React = require('react')
var r = require('jquery')

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
      OAuth.initialize('IHLK6uDxpnuH1S71dCwbf30bjBM')
      OAuth.popup('twitter', function (e, r) {
        // to use r.get etc. you need to have jquery included at this point
        r.get('/1.1/account/verify_credentials.json').done(function (data) {
          console.log('Data', data)
        })
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
