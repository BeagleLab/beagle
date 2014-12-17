var React = require('react')

var ListItemWrapper = React.createClass({
  render: function() {
  	return (
  		<a href="#tags" role="button" className="alert alert-info" data-toggle="tooltip" data-placement="top" title="View tag">
		  	<i className="fa fa-tag"></i> {this.props.data}
		  </a>
		)
  }
});

module.exports = React.createClass({

	render: function() {
		return (
			<div>
				{this.props.data.map(function(tag){
			    return <ListItemWrapper key={tag.id} data={tag} />
        })}
			</div>
		)
	}
})
