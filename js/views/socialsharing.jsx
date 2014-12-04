var React = require('react')

module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <button>
          <a href="mailto:?subject=Champion: This is an awesome Article">Champion this article</a>
        </button>
        <button>
          <a href="mailto:?subject=Nominate: Anyone else think this is great?">Nominate this article</a>
        </button>
      </div>
    )
  }
})
