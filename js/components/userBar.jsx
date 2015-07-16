var React = require('react')
var _ = require('lodash')
var schema = require('../data/schema.js')

var UserBar = React.createClass({
  displayName: 'User Bar',
  propTypes: {
   account: React.PropTypes.object,
   secondaryText: React.PropTypes.string,
   conversation: React.PropTypes.participants
  },
  componentWillMount: function () {
    if (this.props.conversation.author === this.props.account.userId) {
      this.setState({author: this.props.account.userId})
    }
    // TODO Get users who exist from DB
    // _.each(this.props.participants, function (participant) {
    //   schema.getUserDetails(participant).then(function (response) {
    //     console.log('response', response)
    //   }).catch(function (err) {
    //     console.log('err', err)
    //   })
    // })
  },
  shimObjectToArray: function (object) {
    var arr = []
    if (object) {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          // TODO This is stateful. Factor out.
          if (key !== this.props.conversation.author) {
            arr.push([key, object[key]])
          }
        }
      }
    }
    return arr
  },
  render: function () {

    var secondaryText
    var imgStyle = {
      margin: '10px 10px 5px 10px',
      float: 'left',
      width: 32,
      height: 32
    }

    var nameStyle = {
      paddingTop: '7px',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '3px'
    }

    var secondaryTextStyle = {
      color: 'gray',
      textDecoration: 'underline'
    }

    var iconStyle = {
      // float: 'right'
      color: 'gray',
      paddingLeft: 5
    }

    if (this.props.secondaryText === 'date' && this.props.conversation) {
      secondaryText = (<p style={secondaryTextStyle} >
        {this.props.conversation.date}
      </p>)
    } else if (this.props.secondaryText === 'email') {
      secondaryText = (<p style={secondaryTextStyle} >
        {this.props.account.email}
      </p>)
    }

    function permIcons (permission) {
      if (permission === 'write') {
        return (<i className='fa fa-pencil' title='write'></i>)
      } else if (permission === 'read') {
        return (<i className='fa fa-eye' title='read'></i>)
      } else if (permission === 'share') {
        return (<i className='fa fa-user' title='share'></i>)
      }
    }

    let authorDiv

    if (this.props.conversation.author === this.props.account.userId) {
      authorDiv = (
        <div className={{}}>
          {
            (this.props.account.avatar) ?
            <img src={this.props.account.avatar} style={imgStyle} /> :
            null
          }

          <p style={nameStyle} >{this.props.account.name} <i style={iconStyle} className='fa fa-bolt'></i> Author:</p>
          {secondaryText}
        </div>
      )
    } else {
      authorDiv = (
        <div className={{}}>
          <p style={nameStyle} ><i style={iconStyle} className='fa fa-bolt'></i> Author: {this.props.conversation.author}</p>
          {secondaryText}
        </div>
      )
    }

    return (
      <div>
        {authorDiv}
        {this.shimObjectToArray(this.props.conversation.participants).map(function (participant) {
          return (
            <p style={{padding: '0px 5px'}}>{permIcons(participant[1])} {participant[0]}</p>
          )
        })}
      </div>
    )
  }
})

module.exports = exports = UserBar
