/** @jsx React.DOM */
var React = require('react');

var ListWrapper = React.createClass({
  render: function() {
  	return <li><a href="#{this.props.data.anchor}" title={this.props.data.name}>{this.props.data.name}</a></li>
  }
});

var TableOfContents = React.createClass({
    displayName: 'TableOfContents',
    render: function () {
        return (
            <ul className="toc">
            	{this.props.data.map(function(section){
						    return <ListWrapper key={section.id} data={section} />
						  })}
            </ul>
        );
    }
});

module.exports = TableOfContents;
