var React = require('react')

module.exports = React.createClass({
	displayName: 'Tags List Wrapper',
  render: function () {
    return (
      <a href="#tags" role="button" className={this.props.className} data-toggle="tooltip" data-placement="top" title="View tag">
        <i className="fa fa-tag"></i> {this.props.data}
      </a>
		)
  }
})
