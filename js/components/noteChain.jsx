var React = require('react')
// var Conversation = require('./conversation.jsx')
var Note = require('./note.jsx')

// TODO Change naming scheme. Conversation should refer to all notes together, while
// the initial note should have the title. This is a difficult naming area. Bring up with team.

module.exports = React.createClass({
  displayName: 'Note Chain',
  propTypes: {
    notes: React.PropTypes.array,
    account: React.PropTypes.obj
  },
  getAccountFromNote: function (author) {
    // TODO Get the authors account here
    return require('../data/schema.js').account
  },
  render: function () {
    // Helper def. Ignore.
    var list = this.props.notes

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

    this.props.notes = [
      require('../data/schema.js').note,
      require('../data/schema.js').note,
      require('../data/schema.js').note
    ]

    var _this = this

    return (
      <div>
        {/* <Conversation conversation={initialNote} /> */}
        {this.props.notes.map(function (note) {
          return (
            <span>
              <hr style={joiner} />
              <Note account={_this.getAccountFromNote(note.author)} key={list.indexOf(note)} submitted={true} text={note.text} />
            </span>
          )
        })}
        <Note account={this.props.account} submitted={false} />
      </div>
    )
  }
})
