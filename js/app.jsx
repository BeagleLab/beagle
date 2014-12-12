var React = require('react')
var socialsharing = require('./views/socialsharing.jsx')
var altmetrics = require('./views/altmetrics.jsx')

module.exports = React.createClass({
  render: function() {

    return (
      <div>
        <altmetrics data={this.props.data.altmetrics} />
        <socialsharing />
      </div>
    )
  }
})
