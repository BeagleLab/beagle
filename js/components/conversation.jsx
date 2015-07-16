var React = require('react/addons')
var Sharing = require('./sharing.jsx')
var schema = require('../data/schema.js')

var Conversation = React.createClass({
  displayName: 'Conversation',
  propTypes: {
    conversation: React.PropTypes.object,
    account: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      submitted: (this.props.conversation),
      conversation: this.props.conversation || {title: null, text: null},
      hideButton: false,
      shares: {} // Used for the participants object
    }
  },
  getConversationPosts: function (conversation) {
    if (conversation) {
      schema.getConversationPosts(conversation).then(function (response) {
        console.log('Posts', response)
        if (response.length === 1) {
          conversation.text = response[0].text
          this.setState({conversation: conversation})
        } else {
          // TODO make notes show
          console.log('TODO Make notes show')
        }
      }.bind(this)).catch(function (err) {
        console.log('err', err)
      })
    }
  },
  componentWillMount: function () {
    this.getConversationPosts(this.state.conversation)
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.conversation) {
      this.setState({conversation: nextProps.conversation})
      this.getConversationPosts(this.state.conversation)
    }
  },
  onClick: function () {
    // TODO Make sure that userId and id should be the same
    // Shim the author ID.
    if (!this.props.account) {
      // TODO Log in the user programmatically automatically
      throw new Error('You must log in before saving a conversation')
    }

    var that = this

    // Save the conversation
    schema.startBlankConversation({
      'title': this.state.conversation.title,
      'text': this.state.conversation.text,
      'author': this.props.account,
      'participants': this.state.shares
    }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
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
    this.setState({conversation: React.addons.update(this.state.conversation, {title: {$set: event.target.value}})})
  },

  handleText: function (event) {
    this.setState({conversation: React.addons.update(this.state.conversation, {text: {$set: event.target.value}})})
  },

  addShares: function (shares) {
    this.setState({
      'shares': shares
    })
  },

  render: function () {

    var conversationStyle = {
      margin: '5px 0px',
      border: '1px solid #999',
      borderLeft: '3px solid #AE8DC7',
      borderRadius: '2px'
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

    var conversationComp

    if (this.state.submitted) {
      conversationComp = (
        <div>
            <p style={titleStyle}>{this.state.conversation.title}</p>
            <p style={textStyle}>{this.state.conversation.text}</p>
            <Sharing conversation={this.state.conversation} account={this.props.account} shares={this.state.shares} addShares={this.addShares} />
        </div>
      )
    } else {
      conversationComp = (
        <div>
            <input type='input' style={inputTitleStyle} placeholder='Conversation Title' onChange={this.handleTitle} defaultValue={this.state.conversation.title} />
            <textarea type='input' style={inputTitleStyle} placeholder='Share an insight' onChange={this.handleText} defaultValue={this.state.conversation.text} />
            <Sharing conversation={this.state.conversation} account={this.props.account} shares={this.state.shares} addShares={this.addShares} />
            <button className='btn btn-default' style={submitButtonStyle} showForm={this.showForm} onClick={this.onClick}>Start new conversation</button>
            <div style={{clear: 'both'}}></div>
        </div>
      )
    }

    return (
      <div style={conversationStyle}>
        {conversationComp}
      </div>
    )
  }
})

module.exports = exports = Conversation
