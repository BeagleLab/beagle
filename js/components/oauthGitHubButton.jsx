/*globals OAuth */

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
      OAuth.initialize('IHLK6uDxpnuH1S71dCwbf30bjBM')
      // Using popup
      OAuth.popup('github')
          .done(function (result) {
            console.log('GitHub', result)
            // use result.access_token in your API request
            // or use result.get|post|put|del|patch|me methods (see below)
          })
          .fail(function (err) {
            console.log('GitHub failed', err)
            // handle error with err
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
      backgroundColor: 'CornflowerBlue',
      margin: '5px',
      float: 'left'
    }
    return (
      <div>
        <button
          className="btn btn-success screenshot-button"
          onClick={this.handleClick}
          type="button"
          style={style}
        >
          <i className="fa fa-github-square"></i>
        </button>
        {this.state.success}
      </div>
    )
  }
})

module.exports = Login
