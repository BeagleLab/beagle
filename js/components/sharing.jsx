var React = require('react')
var PermissionsDropdown = require('./permissionsDropdown.jsx')
var UserBar = require('./userBar.jsx')
var authenticate = require('../utilities/authenticate.js')

var account = require('../data/schema.js').account
var InstaType = require('instatype')

var Sharing = React.createClass({
  displayName: 'Sharing',
  getInitialState: function () {
    return {
    }
  },
  onClick: function () {
    // TODO Add in db.put() call here
  },

  // Customize this function to reformat the data returned by your endpoint
  requestHandler: function (query, limit, callback) {
    // var endpoint = 'https://api.instagram.com/v1/users/search';
    // var requestParams = {
    //   client_id: window.instagramClientId,
    //   q: query,
    //   count: limit
    // };

    // On type, get all emails from the user
    // var associates = require('../data/schema.js').associates

    // console.log('query', query)
    // Search for emails that come from the user, and for the Google Contacts API results
    // Search for relevant emails in the user object
    // Search for relevant emails from the Google Contacts API
    // Display the top 10
    // Repeat on type

    var endpoint, requestParams

    var wrappedCallback = function (data) {

      // You must set an 'image' and 'name' key for each result
      var renamedData = data.data.map(function (result) {
        result.image = result['profile_picture']
        result.name = result['username']
        return result
      })

      callback(renamedData)
    }

    this.request(endpoint, requestParams, wrappedCallback)
  },

  // Customize this function to do something when a result is selected
  selectedHandler: function (result) {
    // var endpoint, requestParams
    // request(endpoint, requestParams, function (data) {
    //   // Render
    // })
  },

  // Customize this function to use your favorite JSONP library
  request: function (endpoint, requestParams, callback) {

    // Tiny JSONP Library: https://github.com/OscarGodson/JSONP
    // JSONP(endpoint, requestParams, callback)

    /*
    // JQuery
    $.ajax({
      url: endpoint,
      data: requestParams,
      dataType: 'jsonp',
      success: function(data) {
        callback(data);
      }
    });*/
  },

  throttle: function (fn, threshhold, scope) {
    threshhold || (threshhold = 250)
    var last,
        deferTimer
    return function () {
      var context = scope || this

      var now = +new Date(),
          args = arguments
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, threshhold)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  },

  render: function () {
    var conversationStyle = {
      padding: '10px 0px'
      // borderTop: '2px solid #AE8DC7',
      // borderBottom: '2px solid #AE8DC7'
    }

    var submitButtonStyle = {
      float: 'right',
      margin: '5px 10px'
    }

    var inputStyle = {
      display: 'block',
      width: '95%',
      padding: '5px 3px',
      margin: '5px',
      border: '1px solid cornflowerblue',
      fontSize: '14px'
    }

    return (
      <div style={conversationStyle}>

         <InstaType
          placeholder='Share with...'
          style={inputStyle}
          type='text'
          requestHandler={this.requestHandler}
          selectedHandler={this.selectedHandler}
          loadingIcon='../../images/loading.gif'
          limit={6} />

        {/* <input type='text' style={inputStyle} placeholder='Share with...' /> */}

        <PermissionsDropdown />

        <button className='btn btn-primary' style={submitButtonStyle} onClick={this.onClick}>
          <i className='fa fa-plus'></i> Add
        </button>

        <UserBar secondaryText='email' account={account} />

      </div>
    )
  }
})

module.exports = exports = Sharing
