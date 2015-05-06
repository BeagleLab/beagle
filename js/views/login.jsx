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
      hello('google').login().then(function () {
        console.log("You're logged in!")
      })

      hello.init({
        google: '832850147593-mg2vg2j8j65t3djpsifme57pljgimbl9.apps.googleusercontent.com'
      }, {redirect_uri: 'http://www.google.com/robots.txt'})

      // setInterval(function () {
      //   var gl = hello('google').getAuthResponse()
      //   console.log('gl', gl)
      // }, 3000)

      // hello.on('auth.login', function(auth){

      //   console.log('Auth', auth)

      //   // Call user information, for the given network
      //   hello( auth.network ).api( '/me' ).then( function(r){
      //     // Inject it into the container
      //     var label = document.getElementById( 'profile_' + auth.network );
      //     if (!label){
      //       label = document.createElement('div');
      //       label.id = 'profile_' + auth.network;
      //       document.getElementById('profile').appendChild(label);
      //     }
      //     label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
      //   });
      // });

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
