var React = require('react')
var Alert = require('./alert.jsx')

module.exports = React.createClass({
  displayName: 'Sidebar',
  propTypes: {
    data: React.PropTypes.object
  },

  render: function () {
    return (
      <div className='scinav sidebar'>
        <div className='pane-bg glass'></div>
        <div className='pane'>
          <Alert data={this.props.data} />
          {this.props.children}
        </div>
      </div>
    )
  }
})
