var React = require('react')
var PermissionsDropdown = require('./permissionsDropdown.jsx')
var UserBar = require('./userBar.jsx')

var Sharing = React.createClass({
  displayName: 'Sharing',
  propTypes: {
    'account': React.PropTypes.object,
    'shares': React.PropTypes.object,
    'addShares': React.PropTypes.function
  },
  getInitialState: function () {
    return {}
  },
  onClick: function () {
    // TODO Add in db.put() call here
  },
  handleShares: function (event) {
    this.setState({shareInput: event.target.value})
  },

  render: function () {
    var conversationStyle = {
      padding: '10px 0px'
      // borderTop: '2px solid #AE8DC7',
      // borderBottom: '2px solid #AE8DC7'
    }

    var submitButtonStyle = {
      float: 'right',
      margin: '5px 10px'
    }

    var inputStyle = {
      display: 'block',
      width: '95%',
      padding: '5px 3px',
      margin: '5px',
      border: '1px solid cornflowerblue',
      fontSize: '14px'
    }

    return (
      <div style={conversationStyle}>

        <input type='text' style={inputStyle} placeholder='Share with...' onChange={this.handleShares} />

        <PermissionsDropdown shares={this.props.shares} shareInput={this.state.shareInput} addShares={this.props.addShares} />

        <button className='btn btn-primary' style={submitButtonStyle} onClick={this.onClick}>
          <i className='fa fa-plus'></i> Add
        </button>

        <UserBar secondaryText='email' account={this.props.account} />

      </div>
    )
  }
})

module.exports = exports = Sharing
