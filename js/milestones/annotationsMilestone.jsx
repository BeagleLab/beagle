var React = require('react')
var Champion = require('../components/champion.jsx')
var Altmetrics = require('../views/altmetrics.jsx')
var Alert = require('../components/alert.jsx')
var Save = require('../components/save.jsx')
var Cite = require('../components/cite.jsx')
var Annotations = require('../views/annotations.jsx')

module.exports = React.createClass({

  render: function() {

    return (
      <div className="scinav sidebar">
        <div className="pane-bg glass"></div>
				<div className="pane">
					<h2 className='beagle-header'>Beagle</h2>

					<Alert data={this.props.data} />

					<Save />

					<Altmetrics data={this.props.data.altmetrics} />

					<h6>Annotations</h6>
	        <Annotations data={this.props.data.annotations} />

	        <h6>Champion</h6>
	        <Champion />

	        <h6>Cite</h6>
	        <Cite />
				</div>
      </div>
    )
  }
})
