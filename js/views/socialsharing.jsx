var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <button>
          <a href="mailto:?subject=Champion: This is an awesome Article"><i className="fa fa-shield"></i> Champion</a>
        </button>
        <button>
          <a href="mailto:?subject=Nominate: Anyone else think this is great?"><i className="fa fa-flag"></i> Nominate</a>
        </button>
      </div>
    )
  }
})
