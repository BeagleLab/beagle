var React = require('react')
var socialsharing = require('./views/socialsharing.jsx')

module.exports = React.createClass({
  render: function() {

    return (
      <div>
        <p>I like ships, <i>and I used to be a sailor</i></p>
        <socialsharing />
      </div>
    )
  }
})
