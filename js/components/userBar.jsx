var React = require('react')
var _ = require('lodash')
var schema = require('../data/schema.js')

var conversation = {
  date: '10 minutes ago'
}

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
  color: 'gray'
}

var UserBar = React.createClass({
  displayName: 'User Bar',
  propTypes: {
   account: React.PropTypes.object,
   secondaryText: React.PropTypes.string,
   conversation: React.PropTypes.participants
  },
  shimObjectToArray: function (object) {
    var arr = []
    if (object) {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          // TODO This is stateful. Factor out.
          if (key !== this.props.account.email) {
            arr.push([key, object[key]])
          }
        }
      }
    }
    return arr
  },
  render: function () {

    var secondaryText

    if (this.props.secondaryText === 'date') {
      secondaryText = (<p style={secondaryTextStyle} >
        {conversation.date}
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

    return (
      <div>
        <div className={{}}>
          <img src={this.props.account.avatar} style={imgStyle} />

          <p style={nameStyle} >{this.props.account.name} <i style={iconStyle} className='fa fa-bolt'></i> Author:</p>
          {secondaryText}
        </div>
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
