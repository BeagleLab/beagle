var React = require('react')
var DropdownButton = require('react-bootstrap').DropdownButton
var MenuItem = require('react-bootstrap').MenuItem

var PermissionsDropdown = React.createClass({
  displayName: 'PermissionsDropdown',
  getInitialState: function () {
    return {
    }
  },
  onClick: function () {
    // TODO Change the permissions of the user being selected
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
        <MenuItem eventKey={1}><i className='fa fa-eye'></i> Readers can view</MenuItem>
        <MenuItem eventKey={2}><i className='fa fa-pencil'></i> Writers can add content</MenuItem>
        <MenuItem eventKey={3}><i className='fa fa-user'></i> Sharers can invite others</MenuItem>
      </DropdownButton>
    )
  }
})

module.exports = exports = PermissionsDropdown
