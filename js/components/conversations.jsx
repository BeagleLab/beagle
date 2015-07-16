var React = require('react/addons')
var PouchDBUrl = require('../env.js').PouchDBUrl
var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))
var db = new PouchDB(PouchDBUrl)
var _ = require('lodash')

// TODO: On Load:
// Get the conversations needed -- Pass these through to the component
// Get the date of the first (or last?) note in each conversation
// Sort conversations by date last interacted with

module.exports = exports = React.createClass({
  displayName: 'Conversations',
  propTypes: {
    conversations: React.PropTypes.array,
    showConversation: React.PropTypes.bool,
    setConversation: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      conversations: [],
      showConversation: null
    }
  },
  componentWillMount: function () {
    this.getAvatars(this.props.conversations)
  },
  componentWillReceiveProps: function (nextProps) {
    // console.log('next', nextProps.conversations)
    if (nextProps.conversations) {
      this.getAvatars(nextProps.conversations)
    }
    if (nextProps.showConversation) {
      this.setState({showConversation: nextProps.showConversation})
    }
  },
  // componentDidUpdate: function () {
  //   console.log('State updated', this.state.conversations)
  // },
  handleClick: function (conversation) {
    this.props.setConversation(conversation)
  },
  getAvatars: function (props) {
    let dummyImage = 'http://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg'
    let userPromises = []
    let clone
    if (props) {
      clone = _.each(props.slice(), function (conversation) {
        conversation.avatars = []

        _.each(conversation.notes, function (note) {
          let getAvatar = db.get(note).then(function (response) {
            return _.each(_.keys(response.participants), function (key) {
              if (response.participants.hasOwnProperty(key)) {
                return key
              }
            })
          }).then(function (keys) {
            // Suggestion: Only show avatars for participants who have actively contributed to conversation
            return _.each(keys, function (key) {
              db.getUser(key).then(function (res) {
                // TODO Add in popovers with the user name if they have one, and link to a profile section
                // console.log('key', res)
                if (res.avatar) {
                  conversation.avatars.push(res.avatar)
                  return
                }
              }).catch(function (err) {
                if (err.status === 404) {
                  if (conversation.avatars.indexOf(dummyImage) === -1) {
                    conversation.avatars.push(dummyImage)
                  }
                  return
                } else {
                  console.log(err)
                }
              })
            })
          })
          userPromises.push(getAvatar)
        })

      })
    }

    Promise.all(userPromises).then(function () {
      this.setState({conversations: clone})
    }.bind(this)).catch(function (err) {
      console.log('Catch promise err', err)
    })
  },
  render: function () {
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

    // console.log('conversations', this.state.conversations)

    var ConversationList

    if (!this.state.showConversation && this.state.conversations) {
      var _this = this
      ConversationList = (
        <div>
          {this.state.conversations.map(function (conversation) {
            return (
              <div style={listingStyle} onClick={_this.handleClick.bind(this, conversation)} >
                <p style={titleStyle}>{conversation.title}</p>
                <div style={imageWrapperStyle}>
                {/* TODO For some reason, the avatars aren't loading console.log(conversation) */}
                  {
                    conversation.avatars.slice(0, 5).map(function (avatar) {
                    return (
                      <img style={imgStyle} key={conversation.avatars.indexOf(avatar)} src={avatar} />
                    )
                  }) }
                </div>
                <span style={dateStyle}>Updated {conversation.date} ago</span>
                <div style={commentStyle}>
                  <i className='fa fa-comment'></i> {(conversation.notes) ? conversation.notes.length : 0}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div>
        {ConversationList}
      </div>
    )
  }

})
