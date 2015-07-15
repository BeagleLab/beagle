var React = require('react')

// TODO: On Load:
// Get the conversations needed
// Get the date of the first (or last?) note in each conversation
// Sort conversations by date last interacted with
// Get the account details for each participant in a conversation
// Make an array of the account avatars

module.exports = exports = React.createClass({
  displayName: 'Conversations',
  propTypes: {
    conversations: React.PropTypes.array
  },
  getInitialState: function () {
    return {
      conversations: this.props.conversations
    }
  },
  render: function () {
    console.log('state', this.props.conversations, this.state.conversations)

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

    return (
      <div>
        {
          this.state.conversations.map(function (conversation) {
            var avatars = conversation.avatars

            return (
              <div style={listingStyle}>
                <p style={titleStyle}>{conversation.title}</p>
                <div style={imageWrapperStyle}>
                  {conversation.avatars.slice(0, 5).map(function (avatar) {
                    return <img style={imgStyle} key={avatars.indexOf(avatar)} src={avatar} />
                  })}
                </div>
                <span style={dateStyle}>Updated {conversation.date} ago</span>
                <div style={commentStyle}>
                  <i className='fa fa-comment'></i> {conversation.notes.length}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

})
