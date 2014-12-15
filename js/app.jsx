var React = require('react')
var Socialsharing = require('./views/socialsharing.jsx')
var Altmetrics = require('./views/altmetrics.jsx')

module.exports = React.createClass({
  render: function() {

	  {/* Conditionally load an alert */}
  	var alert;
  	if (typeof this.props.data == 'string') {
			alert = <button type="button" className="btn btn-warning btn-full">{this.props}</button>
		}

    return (
      <div className="scinav">
        <div className="pane-bg glass"></div>
				<div className="pane">
					<h2 className='beagle-header'>Beagle</h2>

					{alert}

	        <Altmetrics data={this.props} />
	        <Socialsharing />
				</div>
      </div>
    )
  }
})
