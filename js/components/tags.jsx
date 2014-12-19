var React = require('react')
var TagsListWrapper = require('../components/tagsListWrapper.jsx')

module.exports = React.createClass({

	render: function() {
		return (
			<div>
				{this.props.data.map(function(tag){
			    return <TagsListWrapper className={'alert alert-info'} key={tag.id} data={tag} />
        })}
			</div>
		)
	}
})
