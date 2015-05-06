var React = require('react')

var Accordion = require('react-bootstrap').Accordion
var Forms = require('./views/forms.jsx').Forms
var Highlight = require('./views/highlight.jsx')
var Login = require('./views/login.jsx')
var Panel = require('react-bootstrap').Panel
var Publication = require('./views/publication.jsx')
var Screenshot = require('./views/screenshot.jsx')
var Sidebar = require('./components/sidebar.jsx')
var PDFUrlLink = require('./views/pdfUrlLink.jsx')
var Slack = require('./views/slack.jsx').SendSlack

// var Cite = require('./components/cite.jsx')
// var Graph = require('./views/graph.jsx')
// var RetrieveValue = require('./views/retrieveValue.jsx')
// var Save = require('./components/save.jsx')
// var SignOut = require('./components/signOut.jsx')
// var Tags = require('./components/tags.jsx')
// var Toc = require('./views/toc.jsx')

module.exports = React.createClass({

  render: function () {
    return (
			<Sidebar staticPath={this.props.staticPath} >

        <Login />

        <Highlight location={this.props.location} fingerprint={this.props.fingerprint} />

        <Screenshot fingerprint={this.props.fingerprint} location={this.props.location} />

        <Forms fingerprint={this.props.fingerprint} />

        <Accordion>
          <Panel header="Publication" activeKey='1'>
            <Publication data={this.props.data.publication} eventKey='1' />
          </Panel>
        </Accordion>

        <Slack fingerprint={this.props.fingerprint} />

        {/* <Accordion>
          <Panel header="Snippets">
            <RetrieveValue fingerprint={this.props.fingerprint} data={this.props.data} />
          </Panel>
        </Accordion>

        <Accordion>
          <Panel header="Table of Contents" eventKey='3'>
            <Toc data={this.props.data.publication.toc} />
          </Panel>
        </Accordion>

        <h6>Graph</h6>
        <Graph data={this.props.data.publication} />

        <h6>Tags</h6>
        <Tags data={this.props.data.publication.subjects} />

        <h6>Cite</h6>
        <Cite />

        <Save />

        <SignOut /> */}
        <PDFUrlLink location={this.props.location} />
			</Sidebar>
		)
  }
})
