var React = require('react')
var PublicationsListWrapper = require('../components/publicationsListWrapper.jsx')

module.exports = React.createClass({
	displayName: 'Publciations List',
	render: function() {
		return (
			<ul>
			  {this.props.data.map(function(publication){
			    return <PublicationsListWrapper key={publication.id} data={publication} />
			  })}
			</ul>
		)
	}
})
