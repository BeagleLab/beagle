var React = require('react');

var NotificationBar = React.createClass({
    displayName: 'NotificationBar',
    render: function () {
        return (
            <div className="notification-banner">{this.props.data}</div>
        );
    }
});

module.exports = NotificationBar;
