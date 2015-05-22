/** @jsx React.DOM */
var React = require('react')

var conversation = {
  date: '10 minutes ago'
}

var imgStyle = {
  margin: '10px 10px 5px 10px',
  float: 'left',
  width: '40px',
  height: '40px'
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
   secondaryText: React.PropTypes.string
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

    return (
      <div>
        <img src={this.props.account.avatar} style={imgStyle} />

        <p style={nameStyle} >{this.props.account.name} <i style={iconStyle} className='fa fa-bolt'></i></p>
        {secondaryText}
      </div>
    )
  }
})

module.exports = exports = UserBar
