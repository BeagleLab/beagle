var React = require('react')
var Alert = require('./alert.jsx')

module.exports = React.createClass({
	displayName: 'Sidebar',
	render: function() {
		return (
			<div className="scinav sidebar">
        <div className="pane-bg glass"></div>
				<div className="pane">
					<h2 className='beagle-header'>Beagle</h2>

					<Alert data={this.props.data} />
					{this.props.children}
	      </div>
	    </div>
		)
	}
})
