var React = require('react')
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem

var PermissionsDropdown = React.createClass({
  displayName: 'PermissionsDropdown',
  propTypes: {
    'shares': React.PropTypes.object,
    'addShares': React.PropTypes.function,
    'shareInput': React.PropTypes.object
  },
  getInitialState: function () {
    return {
    }
  },
  setShares: function (type) {
    let shares = {
      [this.props.shareInput]: type
    }
    this.props.addShares(shares)
  },
  // Sending vars through the handlers seems to break things.
  handleRead: function () {
    this.setShares('read')
  },
  handleWrite: function () {
    this.setShares('write')
  },

  handleShare: function () {
    this.setShares('share')
  },

  render: function () {

    // TODO Enable passing in html to {title}
    // var title = '<i className='fa fa-user-plus'></i> Share'
    var title = 'Share'

    var style = {
      margin: '5px 10px 5px 5px'
    }

    // TODO Change the z-index so it doesn't get snipped

    return (
      <DropdownButton title={title} style={style}>
        <MenuItem eventKey={1} onSelect={this.handleRead}><i className='fa fa-eye'></i> Readers can view</MenuItem>
        <MenuItem eventKey={2} onSelect={this.handleWrite}><i className='fa fa-pencil'></i> Writers can add content</MenuItem>
        <MenuItem eventKey={3} onSelect={this.handleShare}><i className='fa fa-user'></i> Sharers can invite others</MenuItem>
      </DropdownButton>
    )
  }
})

module.exports = exports = PermissionsDropdown
