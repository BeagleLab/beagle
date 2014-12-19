var React = require('react')

module.exports = React.createClass({
  render: function() {
    return (
      <div>
	    	<a href="#annotations" role="button" className="alert alert-danger" data-toggle="tooltip" data-placement="top" title="View flags"><i className="fa fa-warning"></i> {this.props.data.innacuracy_count} innacuracy flags</a>
	      <a href="#annotations" role="button" className="alert alert-success" data-toggle="tooltip" data-placement="top" title="View flags"><i className="fa fa-exclamation"></i> {this.props.data.interesting_count} interesting flags</a>
	      <a href="#annotations" role="button"className="alert alert-warning" data-toggle="tooltip" data-placement="top" title="View notes"><i className="fa fa-edit"></i> {this.props.data.notes_count} notes. {this.props.data.your_notes_count} yours</a>
      </div>
    )
  }
})

