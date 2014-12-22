/** @jsx React.DOM */
var React = require('react');

var LinkOut = React.createClass({
    displayName: 'LinkOut',
    render: function () {
        return (
            <a href={this.props.data.href} title={this.props.data.title}><i className="fa fa-external-link"></i></a>
        );
    }
});

module.exports = LinkOut;
