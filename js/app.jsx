var React = require('react')
var Socialsharing = require('./views/socialsharing.jsx')
var Altmetrics = require('./views/altmetrics.jsx')

module.exports = React.createClass({
  render: function() {

    var alert;

    if (typeof this.props == 'string') {
      alert = '<button type="button" class="btn btn-warning btn-full">' +
        this.props + '</button>'
    } else
    // Ideally, this would actually be part of the submodule conversation, above.
    if (this.props !== null) {
      alert = '<div id="react"></div>';
    }

    return (
      <div className="scinav">
        <div className="pane-bg glass"></div>
        <div className="pane">
          <h2 className='beagle-header'>Beagle</h2>
          {alert}
        </div>

        <Altmetrics data={this.props} />
        <Socialsharing />
      </div>
    )
  }
})
