var React = require('react')
var Alert = require('../components/alert.jsx')
var SignIn = require('../components/signIn.jsx')

module.exports = React.createClass({
	displayName: 'Annotations Milestone',
  render: function() {

    return (
      <div className="scinav sidebar">
        <div className="pane-bg glass"></div>
				<div className="pane">
					<h2 className='beagle-header'>Beagle</h2>

					<Alert data={this.props.data} />

					<SignIn />

					<p className='return'>Go Back</p>

				</div>
      </div>
    )
  }
})
