var React = require('react')
var Conversation = require('./conversation.jsx')
var Comment = require('./comment.jsx')

// I've currently got a different component (conversation) for the initial comment.
// That should probably be changed or refined, to allow editing the title.
// Here, I show the first conversation, and then subsequent comments from this.props.conversation
// Which ought to be an array of notes that can then be displayed in the sidebar. The thing is,
// I'm not sure how to get these notes without building out an API for the in schema.js

module.exports = React.createClass({
  displayName: 'Conversation',
  propTypes: {
    conversation: React.PropTypes.object
  },

  render: function () {
    var list = this.props.conversation

    return (
      <div>
        <Conversation />
        {this.props.conversation.map(function (comment) {
          return <Comment account={comment.account} key={list.indexOf(comment)} text={comment.text} />
        })}
      </div>
    )
  }
})
