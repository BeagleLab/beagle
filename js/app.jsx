var React = require('react')
var PDFJS = require('beagle-pdf')

// var Accordion = require('react-bootstrap').Accordion
// var Panel = require('react-bootstrap').Panel
var EmailForm = require('./components/emailForm.jsx')
var Publication = require('./components/publication.jsx')
var Sidebar = require('./components/sidebar.jsx')
var PDFUrlLink = require('./components/pdfUrlLink.jsx')
var Slack = require('./components/slack.jsx').SendSlack
var Toolbar = require('./components/toolbar.jsx')
var Navbar = require('./components/navbar.jsx')
// var Comment = require('./components/comment.jsx')
// var Conversation = require('./components/conversationChain.jsx')

// var Highlight = require('./components/highlight.jsx')
// var Screenshot = require('./components/screenshot.jsx')
// var Cite = require('./components/cite.jsx')
// var Graph = require('./components/graph.jsx')
// var RetrieveValue = require('./components/retrieveValue.jsx')
// var Save = require('./components/save.jsx')
// var Tags = require('./components/tags.jsx')
// var Toc = require('./components/toc.jsx')

var Conversation = require('./components/conversation.jsx')
// var note = require('./data/schema.js').note

// var account = require('./data/schema.js').account
// var publication = require('./data/schema.js').mediaPublication

module.exports = React.createClass({
  displayName: 'App',
  propTypes: {
    staticPath: React.PropTypes.object,
    pdfLocation: React.PropTypes.object,
    fingerprint: React.PropTypes.object,
    docType: React.PropTypes.string,
    modules: React.PropTypes.object
  },

  // TODO Add in loading state so dummy data isn't needed here.
  getInitialState: function () {
    return {
      'publication': null,
      'showConversation': null
    }
  },

  showConversation: function () {
    this.setState({
      'showConversation': !this.state.showConversation
    })
  },

  componentWillMount: function () {
    if (this.props.pdfLocation) {
      PDFJS.readPDFText(this.props.pdfLocation, {'modules': this.props.modules}, function (err, data) {
        if (err === 'Failed to find a DOI.') {
          console.log('This document does not have a DOI.')
        } else if (err !== null) {
          console.log('Could not read the PDF')
        }

        if (data) {
          // TODO Get metadata about shares as well as authors from an external API
          this.setState({publication: data})
        }
      }.bind(this))
    }
  },

  render: function () {

    var conversationComp = null

    if (this.state.showConversation) {
      conversationComp = <Conversation />
    }

    return (
			<Sidebar >

        <Navbar staticPath={this.props.staticPath} />

        <Toolbar location={this.props.pdfLocation} fingerprint={this.props.fingerprint} showConversation={this.showConversation} />

        <Publication eventKey='1' data={this.state.publication} />

        <br />
        <br />

        {conversationComp}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <EmailForm fingerprint={this.props.fingerprint} />
        <Slack fingerprint={this.props.fingerprint} />

        {/* <Accordion>
          <Panel header="Snippets">
            <RetrieveValue fingerprint={this.props.fingerprint} data={this.props.data} />
          </Panel>
        </Accordion>

        <Accordion>
          <Panel header='Publication' activeKey='1'>
          </Panel>
        </Accordion>}

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

        <Save /> */}

        <PDFUrlLink location={this.props.pdfLocation} />
			</Sidebar>
		)
  }
})
