var React = require('react')
var Modal = require('../components/modal.jsx')

module.exports = React.createClass({
	displayName: 'Journal Modal',
	render: function() {
		return (
			<Modal>
				<h6>{this.props.data.journal.name}</h6>
				<p>About:</p> {this.props.data.journal.about}
				<p>Impact Factor {this.props.data.journal.impact_factor}</p>

				<h6>Current Paper:</h6> {this.props.data.publication.title}
				<h6>Issue: {this.props.data.publication.issue}</h6>

			</Modal>
		)
	}
})

