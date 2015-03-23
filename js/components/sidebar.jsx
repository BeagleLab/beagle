var React = require('react')
var Alert = require('./alert.jsx')

module.exports = React.createClass({
  displayName: 'Sidebar',
  getInitialState: function () {
    var staticPath
    if (this.props.staticPath) {
      staticPath = this.props.staticPath + 'images/noun_11582.png'
    } else if (chrome && chrome.extension) {
      staticPath = chrome.extension.getURL('images/noun_11582.png')
    } else {
      staticPath = 'images/noun_11582.png'
    }

    return {
      'staticPath': staticPath
    }
  },

  render: function () {
    return (
      <div className="scinav sidebar">
        <div className="pane-bg glass"></div>
        <div className="pane">
          <img src={this.state.staticPath} alt='HMS Beagle' className='beagle-icon' />
          <h2 className='beagle-header'>Beagle</h2>

          <Alert data={this.props.data} />
          {this.props.children}
        </div>
      </div>
    )
  }
})
