/** @jsx React.DOM */
var React = require('react');

var Contact = React.createClass({
    displayName: 'Contact',
    render: function () {
    		var mailto = 'mailto:' + this.props.data.author.email;
        return (
          <div id="contact-btns" className="btn-group">
		        <a href={mailto} className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Email"><i className="fa fa-envelope-o"></i></a>
		        <a href={this.props.data.author.website} className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Homepage"><i className="fa fa-home"></i></a>
		      </div>
        );
    }
});

module.exports = Contact;
