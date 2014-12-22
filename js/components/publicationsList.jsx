var React = require('react')
var PublicationsListWrapper = require('../components/publicationsListWrapper.jsx')

module.exports = React.createClass({
	displayName: 'Publications List',
	render: function() {

		var list = this.props.data;

		return (
			<ul>
			  {this.props.data.map(function(publication){
			    return <PublicationsListWrapper key={list.indexOf(publication)} data={publication} />
			  })}
			</ul>
		)
	}
})
