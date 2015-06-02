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
      OAuth.popup('google').done(function (result) {
        console.log(result)
        result.me().done(function (me) {
          console.log('Me', me)

          if (me.email) {
            result.get('https://www.google.com/m8/feeds/contacts/' + me.email + '/full?alt=json&max-results=5000').done(function (contacts) {
              console.log('Contacts!', contacts)
            })
          }

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
      backgroundColor: 'CornflowerBlue',
      margin: '5px',
      float: 'left'
    }
    return (
      <div>
        <button
          className='btn btn-success screenshot-button'
          type='button'
          onClick={this.handleClick}
          style={style}
        >
          <i className='fa fa-google'></i>
        </button>
        {this.state.success}
      </div>
    )
  }
})

module.exports = Login
