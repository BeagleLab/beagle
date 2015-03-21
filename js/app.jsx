var React = require('react')

var Accordion = require('react-bootstrap').Accordion
var Forms = require('./views/forms.jsx').Forms
var Highlight = require('./views/highlight.jsx')
var Panel = require('react-bootstrap').Panel
var Publication = require('./views/publication.jsx')
var RetrieveValue = require('./views/retrieveValue.jsx')
var Screenshot = require('./views/screenshot.jsx')
var Sidebar = require('./components/sidebar.jsx')
var TwitterShare = require('./views/TwitterShare.jsx')

// var Cite = require('./components/cite.jsx')
// var Graph = require('./views/graph.jsx')
// var Save = require('./components/save.jsx')
// var SignOut = require('./components/signOut.jsx')
// var Tags = require('./components/tags.jsx')
// var Toc = require('./views/toc.jsx')

module.exports = React.createClass({

  render: function() {
    return (
			<Sidebar staticPath={this.props.staticPath} >

				{/* <Save /> */}

				<Highlight location={this.props.location} fingerprint={this.props.fingerprint} />

        <Screenshot fingerprint={this.props.fingerprint} location={this.props.location} />

        <TwitterShare data={this.props.data.publication} />

				<Forms fingerprint={this.props.fingerprint} />

				<Accordion>
					<Panel header="Publication Details" eventKey='2' activeKey={false}>
						<Publication data={this.props.data.publication} />
					</Panel>
				</Accordion>

				<Accordion>
					<Panel header="Snippets">
						<RetrieveValue fingerprint={this.props.fingerprint} data={this.props.data} />
					</Panel>
				</Accordion>


				{/* <Accordion>
					<Panel header="Table of Contents" eventKey='3'>
						<Toc data={this.props.data.publication.toc} />
					</Panel>
				</Accordion> */}

				{/* <h6>Graph</h6>
				<Graph data={this.props.data.publication} /> */}

				{/* <h6>Tags</h6>
				<Tags data={this.props.data.publication.subjects} />

				<h6>Cite</h6>
				<Cite /> */}

				{/* <SignOut /> */}
			</Sidebar>
		)
  }
})
