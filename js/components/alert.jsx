var React = require('react')

module.exports = React.createClass({

	render: function() {
		return (
			<div>
				{typeof this.props.data == 'string' ?
				<button type="button" className="btn btn-warning btn-full">
					{this.props.data}
				</button>
				: ''}
			</div>
		)
	}
})
