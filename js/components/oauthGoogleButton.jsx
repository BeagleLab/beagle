'use strict'

var React = require('react')
var authenticate = require('../utilities/authenticate.js')

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

      authenticate.google()

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
