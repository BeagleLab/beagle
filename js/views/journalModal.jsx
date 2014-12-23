var React = require('react')

// Example Data
// {
//   'data': {
//     'journal': {
//       'name': 'PLOS',
//       'about': 'Public Library of Science',
//       'impact_factor': '2.1'
//     },
//     'publication': {
//       'title': 'This is a paper title',
//       'issue': '2.1'
//     }
//   }
// }


module.exports = React.createClass({
	displayName: 'Journal Modal',
	render: function() {
		return (
			<div className="panel-body">
				<h6>{this.props.data.journal.name}</h6>
				<p>About:</p> {this.props.data.journal.about}
				<p>Impact Factor {this.props.data.journal.impact_factor}</p>

				<h6>Current Paper:</h6> {this.props.data.publication.title}
				<h6>Issue: {this.props.data.publication.issue}</h6>

			</div>
		)
	}
})

