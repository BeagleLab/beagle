var React = require('react');

var Abstract = React.createClass({
  displayName: 'Abstract',
  render: function () {
    return (
      <div className="abstract">{this.props.data}</div>
    );
  }
});

module.exports = Abstract;
