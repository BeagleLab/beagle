var React = require('react')
var Sharing = require('./sharing.jsx')
var schema = require('../data/schema.js')

var Conversation = React.createClass({
  displayName: 'Conversation',
  propTypes: {
    conversation: React.PropTypes.object,
    account: React.PropTypes.object
  },
  // TODO It seems to me that the title should be tied to the first note.
  // As we have it, a conversation object has a title, but no text, just an array of notes
  // I'm not sure this is right.
  getInitialState: function () {
    return {
      submitted: false,
      text: null, // this.props.conversation && this.props.conversation.text || 'Error: Text not found',
      title: null, // this.props.conversation && this.props.conversation.title || 'No Title',
      hideButton: false,
      author: this.props.account
    }
  },
  onClick: function () {
    // Shim the author ID.
    // TODO Make sure that userId and id should be the same
    var author = {}
    if (this.state.author) {
      author.id = this.state.author.userId
    } else {
      // TODO Log in the user programmatically automatically
      throw new Error('You must log in before saving a conversation')
    }

    var that = this

    // Save the conversation
    schema.startBlankConversation({
      'title': this.state.title,
      'text': this.state.text,
      'author': author
    }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        // TODO Should we save the conversation in the view somehow?
        console.log(data)
        that.setState({conversation: data.conversation})
        that.setState({note: data.note})
      }
    })

    this.setState({ submitted: !this.state.submitted })
  },
  showForm: function () {
    this.setState({hideButton: !this.state.hideButton})
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
        { (this.state.submitted) ?
          <p style={titleStyle}>{title}</p> :
          <input type='input' style={inputTitleStyle} placeholder='Conversation Title' onChange={this.handleTitle} defaultValue={title} />
        }

        { (this.state.submitted) ?
          <p style={textStyle}>{text}</p> :
          <textarea type='input' style={inputTitleStyle} placeholder='Share an insight' onChange={this.handleText} defaultValue={text} />
        }

        <Sharing account={this.props.account} />

        <button className='btn btn-default' style={submitButtonStyle} showForm={this.showForm} onClick={this.onClick}>Start new conversation</button>
      </div>
    )
  }
})

module.exports = exports = Conversation
