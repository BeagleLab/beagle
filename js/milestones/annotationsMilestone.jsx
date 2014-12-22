var React = require('react')
var Alert = require('../components/alert.jsx')
var Annotations = require('../views/annotations.jsx')
var Cite = require('../components/cite.jsx')
var Graph = require('../views/graph.jsx')
var Publication = require('../views/publication.jsx')
var Save = require('../components/save.jsx')
var Tags = require('../components/tags.jsx')

module.exports = React.createClass({

  render: function() {

    return (
      <div className="scinav sidebar">
        <div className="pane-bg glass"></div>
				<div className="pane">
					<h2 className='beagle-header'>Beagle</h2>

					<Alert data={this.props.data} />

					<Save />

					<h6>Publication</h6>
	        <Publication data={this.props.data.publication} />

	        <h6>Graph</h6>
	        <Graph data={this.props.data.publication} />

	        <h6>Tags</h6>
	        <Tags data={this.props.data.publication.subjects} />

					<h6>Annotations</h6>
	        <Annotations data={this.props.data.annotations} />

	        <h6>Cite</h6>
	        <Cite />
				</div>
      </div>
    )
  }
})
