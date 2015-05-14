var React = require('react')
// var UserBar = require('./userBar.jsx')

var Conversation = React.createClass({
  displayName: 'Conversation',
  getInitialState: function () {
    return {
      submitted: false,
      text: null,
      title: null
    }
  },
  onClick: function () {
    // TODO Add in db.put() call here. Perhaps on handleChange, too.

    this.setState({ submitted: !this.state.submitted })
  },
  handleTitle: function (event) {
    this.setState({ title: event.target.value })
  },

  handleText: function (event) {
    this.setState({ text: event.target.value })
  },

  render: function () {
    var conversationStyle = {
      margin: '5px 0px',
      border: '1px solid #999',
      borderLeft: '3px solid #AE8DC7',
      borderRadius: '2px',
      paddingBottom: '50px'
    }

    var textStyle = {
      padding: '5px'
    }

    var inputTitleStyle = {
      width: '90%',
      margin: '10px'
    }

    var titleStyle = {
      padding: '5px',
      fontSize: '15px'
    }

    var submitButtonStyle = {
      backgroundColor: '#4DAE4A',
      color: 'white',
      float: 'right',
      margin: '10px'
    }

    var text = this.state.text
    var title = this.state.title

    return (
      <div style={conversationStyle}>

        { this.state.submitted ?
          <p style={titleStyle}>{title}</p> :
          <input type="input" style={inputTitleStyle} placeholder="Conversation Title" onChange={this.handleTitle} defaultValue={title} />
        }

        { this.state.submitted ?
          <p style={textStyle}>{text}</p> :
          <textarea type="input" style={inputTitleStyle} placeholder="Share an insight" onChange={this.handleText} defaultValue={text} />
        }

        {/* TODO Add share component here */}
        {/* <UserBar user={this.props.user} /> */}

        <button className="btn btn-default" style={submitButtonStyle} onClick={this.onClick}>Start new conversation</button>

      </div>
    )
  }
})

module.exports = exports = Conversation
