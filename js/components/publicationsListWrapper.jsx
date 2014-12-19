var React = require('react')

module.exports = React.createClass({
  render: function() {
  	return <li><a className="tag" href="#">{this.props.data}</a></li>
  }
});
