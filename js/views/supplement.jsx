/** @jsx React.DOM */
var React = require('react');

var ListWrapper = React.createClass({
  render: function() {
  	return (
  		<div className="supplement-info">
	  		<a className="supplement-link" href={this.props.data.link}>{this.props.data.name} <i className='fa fa-external-link'></i></a>
	  		<p><span className='description'>{this.props.data.description}</span>.<br /> {this.props.data.doi} ({this.props.data.type})</p>
	  	</div>
		)
  }
});


var Supplement = React.createClass({
    displayName: 'Supplement',
    render: function () {
        return (
            <div className="supplement">
						  {this.props.data.map(function(supplement){
						    return <ListWrapper key={supplement.id} data={supplement} />
						  })}
            </div>
        );
    }
});

module.exports = Supplement;
