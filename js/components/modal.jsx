var React = require('react')

module.exports = React.createClass({
	displayName: 'Modal',
	render: function () {
    return (
      <div className="panel-body">
        {this.props.children}
      </div>
    )
  }
})
