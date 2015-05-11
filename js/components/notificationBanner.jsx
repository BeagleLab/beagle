var React = require('react')

var NotificationBar = React.createClass({
  displayName: 'Notification Bar',
  render: function () {
    return (
      <div className="notification-banner">{this.props.data}</div>
    )
  }
})

module.exports = NotificationBar
