var React = require('react')
var Socialsharing = require('./views/socialsharing.jsx')
var Altmetrics = require('./views/altmetrics.jsx')
var Alert = require('./components/alert.jsx')

module.exports = React.createClass({

  render: function() {

    return (
      <div className="scinav sidebar">
        <div className="pane-bg glass"></div>
				<div className="pane">
					<h2 className='beagle-header'>Beagle</h2>

					<Alert data={this.props.data} />
	        <Altmetrics data={this.props.data.altmetrics} />
	        <Socialsharing />
				</div>
      </div>
    )
  }
})
