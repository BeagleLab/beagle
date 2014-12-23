var React = require('react')
var Accordion = require('react-bootstrap').Accordion
var Panel = require('react-bootstrap').Panel

var Alert = require('./components/alert.jsx')
var Cite = require('./components/cite.jsx')
var Graph = require('./views/graph.jsx')
var Publication = require('./views/publication.jsx')
var Save = require('./components/save.jsx')
var Tags = require('./components/tags.jsx')
var Toc = require('./views/toc.jsx')
var SignOut = require('./components/signOut.jsx')

module.exports = React.createClass({

  render: function() {

    return (
      <div className="scinav sidebar">
        <div className="pane-bg glass"></div>
				<div className="pane">
					<h2 className='beagle-header'>Beagle</h2>

					<Alert data={this.props.data} />

					<Save />

					<Accordion>
						<Panel header="Publication" eventKey='1' activeKey={false}>
			        <Publication data={this.props.data.publication} />
			      </Panel>
			    </Accordion>

			    <Accordion>
						<Panel header="Table of Contents" eventKey='2'>
			        <Toc data={this.props.data.publication.toc} />
			      </Panel>
			    </Accordion>

	        <h6>Graph</h6>
	        <Graph data={this.props.data.publication} />

	        <h6>Tags</h6>
	        <Tags data={this.props.data.publication.subjects} />

	        <h6>Cite</h6>
	        <Cite />

	        <SignOut />
				</div>
      </div>
    )
  }
})
