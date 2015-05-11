var React = require('react');

var Figs = React.createClass({
  displayName: 'Figs',
  render: function () {
    return (
      <div className='figs-wrapper'>
	    	<img className='figs' src={this.props.data} />
      </div>
    );
  }
});

module.exports = Figs;
