var React = require('react')
var Sharing = require('./sharing.jsx')

var Conversation = React.createClass({
  displayName: 'Conversation',
  propTypes: {
    conversation: React.PropTypes.object
  },
  // TODO It seems to me that the title should be tied to the first note.
  // As we have it, a conversation object has a title, but no text, just an array of notes
  // I'm not sure this is right.
  getInitialState: function () {
    return {
      submitted: true,
      text: this.props.conversation.text || 'Error: Text not found',
      title: this.props.conversation.title || 'No Title'
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
          <input type='input' style={inputTitleStyle} placeholder='Conversation Title' onChange={this.handleTitle} defaultValue={title} />
        }

        { this.state.submitted ?
          <p style={textStyle}>{text}</p> :
          <textarea type='input' style={inputTitleStyle} placeholder='Share an insight' onChange={this.handleText} defaultValue={text} />
        }

        <Sharing />

        <button className='btn btn-default' style={submitButtonStyle} onClick={this.onClick}>Start new conversation</button>

      </div>
    )
  }
})

module.exports = exports = Conversation
