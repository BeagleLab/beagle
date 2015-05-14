/** @jsx React.DOM */
var React = require('react')

var conversation = {
  date: '10 minutes ago'
}

var UserBar = React.createClass({
  displayName: 'UserBar',
  propTypes: {
   data: React.PropTypes.object
  },
  render: function () {
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

    var dateStamp = {
      color: 'gray',
      textDecoration: 'underline'
    }

    return (
      <div>
        <img src={this.props.user.photo} style={imgStyle} />
        <p style={nameStyle} >{this.props.user.name}</p>
        <p style={dateStamp} >{conversation.date}</p>
      </div>
    )
  }
})

module.exports = UserBar
