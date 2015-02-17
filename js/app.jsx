var React = require('react')
var Sidebar = require('./components/sidebar.jsx')
var Accordion = require('react-bootstrap').Accordion
var Panel = require('react-bootstrap').Panel

var Cite = require('./components/cite.jsx')
var Graph = require('./views/graph.jsx')
var Publication = require('./views/publication.jsx')
var Save = require('./components/save.jsx')
var Tags = require('./components/tags.jsx')
var Toc = require('./views/toc.jsx')
var SignOut = require('./components/signOut.jsx')
var GrabText = require('./views/grabText.jsx')
var GetValue = require('./views/getValue.jsx')

module.exports = React.createClass({

  render: function() {

    return (
     	<Sidebar>

				<Save />

				<br />
        <br />
        <GrabText />
        <br/>
        <GetValue />
        <br />
        <br />

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
      </Sidebar>
    )
  }
})
