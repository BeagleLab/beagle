var React = require('React')
var Login = require('./login.jsx')
var staticPath = require('../utilities/staticPath.js')

var Navbar = React.createClass({
  displayName: 'Navbar',
  propTypes: {
    staticPath: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      'staticPath': staticPath(this.props.staticPath, 'images/noun_11582.png')
    }
  },
  render: function () {

    var style = {
      'z-index': '100',
      'position': 'fixed',
      'width': '100%',
      'height': '32px',
      'top': '0',
      'left': '0',
      'right': '0',
      'background-image': 'linear-gradient(rgba(81, 81, 81, 0.992157), rgba(69, 69, 69, 0.952941))',
      'border-left': '1px solid rgba(230, 230, 230, 0.5)',
      'padding-left': '11px',
      'justify-content': 'space-between',
      'color': 'white'
    }

    var title = {
          'float': 'left'
    }

    var imgStyle = {
      'height': 30,
      'display': 'inline-block',
      'margin-right': 5
    }

    return (
      <div style={style}>
        <div style={title} >
          <img src={this.state.staticPath} alt='HMS Beagle' style={imgStyle} />
          Beagle
        </div>
        <Login />
      </div>
    )
  }
})

module.exports = exports = Navbar
