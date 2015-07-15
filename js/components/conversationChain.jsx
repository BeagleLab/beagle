var React = require('react')
var Conversation = require('./conversation.jsx')
var Note = require('./note.jsx')

// Note: The props here need to be sent normally when this component is called.
// Here, I have loaded them directly. See getInitialState for where the props should
// come from.

// TODO Change naming scheme. Conversation should refer to all notes together, while
// the initial note should have the title. This is a difficult naming area. Bring up with team.
var initialNote = require('../data/schema.js').conversation

// I've currently got a different component (conversation) for the initial note.
// That should probably be changed or refined, to allow editing the title.
// Here, I show the first conversation, and then subsequent notes from this.props.conversation
// Which ought to be an array of notes that can then be displayed in the sidebar. The thing is,
// I'm not sure how to get these notes without building out an API for the in schema.js

module.exports = React.createClass({
  displayName: 'Conversation Chain',
  propTypes: {
    conversations: React.PropTypes.array
  },
  getInitialState: function () {
    return {
      conversations: this.props.conversations
    }
  },

  render: function () {
    // Helper def. Ignore.
    var list = this.state.conversations

    function getAccountFromNote (author) {
      // TODO Get the authors account here
      return require('../data/schema.js').account
    }

    // That little grey thing.
    var joiner = {
      height: '10px',
      color: 'black',
      width: '0px',
      marginTop: '-5px',
      marginBottom: '-6px',
      border: '0',
      borderLeft: '3px solid #eee'
    }

    console.log('conversations', this.state.conversations)

    return (
      <div>
        <Conversation conversation={initialNote} />
        {this.state.conversations.map(function (note) {
          return (
            <span>
              <hr style={joiner} />
              <Note account={getAccountFromNote(note.author)} key={list.indexOf(note)} text={note.text} />
            </span>
          )
        })}
      </div>
    )
  }
})
