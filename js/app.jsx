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
        <link href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" />
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="pane-bg glass"></div>
        <div className="pane">
          <h2 style="text-align: center;">Beagle</h2>
          {alert}
        </div>

        <Altmetrics data={this.props} />
        <Socialsharing />
      </div>
    )
  }
})
