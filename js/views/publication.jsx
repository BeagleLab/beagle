var React = require('react')

module.exports = React.createClass({
  render: function() {
    return (
        <ul>
          <li id='title'>{this.props.data.title}</li>
          <li>{this.props.data.journal}</li>
          <li>{this.props.data.doi}</li>
        </ul>
    )
 	}
})
