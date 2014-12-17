var React = require('react')
var Graph = require('./graph.jsx')
var AltGraph = require('./altGraph.jsx')
var Tags = require('../components/tags.jsx')
var Publication = require('./publication.jsx')

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h6>Publication</h6>
        <Publication data={this.props.data} />

        <h6>Graph</h6>
        <Graph data={this.props.data} />

        <h6>AltGraph</h6>
        <AltGraph data={this.props.data} />

        <h6>Tags</h6>
        <Tags data={this.props.data.subjects} />
      </div>
    )
  }
})
