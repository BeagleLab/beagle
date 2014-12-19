var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div className="btn-group">
        <a href="mailto:?subject=Champion: This is an awesome Article" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Champion this article"><i className="fa fa-shield"></i> Champion</a>
        <a href="mailto:?subject=Nominate: Anyone else think this is great?" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Nominate this article"><i className="fa fa-flag"></i> Nominate</a>
      </div>
    )
  }
})
