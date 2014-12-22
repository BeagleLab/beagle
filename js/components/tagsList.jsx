var React = require('react')
var TagsListWrapper = require('../components/tagsListWrapper.jsx')

module.exports = React.createClass({
	displayName: 'Tags List',
  render: function() {
  	var className = this.props.className;
  	return (
  		<div>
			  {this.props.data.map(function(tag){
			    return <TagsListWrapper className={className} key={tag.id} data={tag} />
			  })}
  		</div>
		)
  }
});
