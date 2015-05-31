var React = require('react')
var Alert = require('./alert.jsx')
var staticPath = require('../utilities/staticPath.js')

module.exports = React.createClass({
  displayName: 'Sidebar',
  propTypes: {
    staticPath: React.PropTypes.string,
    data: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      'staticPath': staticPath(this.props.staticPath, 'images/noun_11582.png')
    }
  },

  render: function () {
    return (
      <div className='scinav sidebar'>
        <div className='pane-bg glass'></div>
        <div className='pane'>
          <img src={this.state.staticPath} alt='HMS Beagle' className='beagle-icon' />
          <h2 className='beagle-header'>Beagle</h2>

          <Alert data={this.props.data} />
          {this.props.children}
        </div>
      </div>
    )
  }
})
