var React = require('react')

module.exports = React.createClass({
	displayName: 'Graph',
  render: function() {
    return (
      <div>
        <a href="#publication-graph" role="button" className="alert alert-info" data-toggle="tooltip" data-placement="top" title="View citations">
          <i className='fa fa-share-alt'></i> Cited By: {this.props.data.cited_by.length}
        </a>
        <a href="#publication-graph" role="button" className="alert alert-info" data-toggle="tooltip" data-placement="top" title="View references">
          <i className='fa fa-share-alt'></i> Cites: {this.props.data.cites.length}
	      </a>
        <a href="#publication-graph" role="button" className="alert alert-info" data-toggle="tooltip" data-placement="top" title="View closely related papers">
          <i className='fa fa-share-alt'></i> Related to: {this.props.data.related.length}
        </a>
      </div>
    )
  }
})
