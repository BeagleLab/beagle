var React = require('react')

// Dummy Data
var conversationData = require('../data/schema.js').conversation
// TODO: Create this programmatically from account data
conversationData.avatars = [
  'http://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg',
  'http://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg'
]
// TODO Add date to the conversation schema
conversationData.date = '9 minutes'
// TODO Get programmatically
conversationData.commentNumber = '234'

var ConversationListing = React.createClass({
  displayName: 'Conversation Listing',
  propTypes: {
    conversation: React.PropTypes.object
  },

  // TODO: On Load:
  // Get the conversations needed
  // Get all notes from a conversation, make them commentNumber
  // Get the date of the first (or last?) note in each conversation
  // Sort conversations by date last interacted with
  // Get the account details for each participant in a conversation
  // Make an array of the account avatars

  render: function () {

    // STYLES
    var listingStyle = {},
    titleStyle = {
      fontWeight: '600',
      fontSize: '14px',
      margin: '10px 0px 0px 0px'
    },
    imageWrapperStyle = {
      width: '40%',
      display: 'inline-block'
    },
    imgStyle = {
      maxHeight: '30px',
      padding: '3px 3px 5px 3px'
    },
    dateStyle = {
      color: 'gray'
    },
    commentStyle = {
      float: 'right',
      color: 'gray',
      margin: '7px 0px'
    }

    var avatars = this.props.conversation.avatars

    return (
      <div style={listingStyle}>
        <p style={titleStyle}>{this.props.conversation.title}</p>
        <div style={imageWrapperStyle}>
          {/* Todo: Limit to 8 or so avatars */}
          {this.props.conversation.avatars.map(function (avatar) {
            return <img style={imgStyle} key={avatars.indexOf(avatar)} src={avatar} />
          })}
        </div>
        <span style={dateStyle}>Updated {this.props.conversation.date} ago</span>
        <div style={commentStyle}>
          <i className='fa fa-comment'></i>{this.props.conversation.commentNumber}
        </div>
      </div>
    )
  }
})

module.exports = exports = React.createClass({
  displayName: 'Conversations',

  render: function () {
    return (
      <div>
        <ConversationListing conversation={conversationData} />
        <ConversationListing conversation={conversationData} />
      </div>
    )
  }

})
