var React = require('react')

var ListItemWrapper = React.createClass({
  render: function() {
  	return <a className="tag"><i className="fa fa-tag"></i> {this.props.data}</a>
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
