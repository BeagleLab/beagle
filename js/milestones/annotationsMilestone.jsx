var React = require('react')
var Sidebar = require('../components/sidebar.jsx')
var Annotations = require('../components/annotations.jsx')
var Cite = require('../components/cite.jsx')
var Graph = require('../components/graph.jsx')
var Publication = require('../components/publication.jsx')
var Save = require('../components/save.jsx')
var Tags = require('../components/tags.jsx')

module.exports = React.createClass({
	displayName: 'Annotations Milestone',
  render: function() {

    return (
      <Sidebar>
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
      </Sidebar>
    )
  }
})
