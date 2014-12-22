var React = require('react')
var TagsList = require('../components/tagsList.jsx')

module.exports = React.createClass({
	displayName: 'Tags Modal',
	render: function() {
		return (
			<div className="panel-body">

	      <h4 className="gray">Tags</h4>
	      <p className="lead">{this.props.data.title}</p>

	      <h5>Your Tags:</h5>
	      <TagsList className={'alert alert-success'} data={this.props.data.tags.your_tags} />

	      <h5>Your Colleagues Tags:</h5>
	      <TagsList className={'alert alert-info'} data={this.props.data.tags.group_tags} />

	      <h5>All Other Public Tags:</h5>
	      <TagsList className={'alert alert-warning'} data={this.props.data.tags.public_tags} />

      </div>
		)
	}
})
