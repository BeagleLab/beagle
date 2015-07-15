var React = require('react')
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
    conversations: React.PropTypes.array
  },
  getInitialState: function () {
    return {
      conversations: this.props.conversations
    }
  },
  componentWillMount: function () {
    let dummyImage = 'http://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg'
    let userPromises = []
    let clone = _.each(this.state.conversations.slice(), function (conversation) {
      conversation.avatars = []
      _.each(_.keys(conversation.participants), function (key) {
        if (conversation.participants.hasOwnProperty(key)) {
          // Suggestion: Only show avatars for participants who have actively contributed to conversation
          let getAvatar = db.getUser(key).then(function (err, res) {
            // TODO Add in popovers with the user name if they have one, and link to a profile section
            if (res.avatar) {
              conversation.avatars.push(res.avatar)
              return
            } else if (err) {
              console.log(err)
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
          userPromises.push(getAvatar)
        }
      })
    })

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

    return (
      <div>
        {this.state.conversations.map(function (conversation) {
          return (
            <div style={listingStyle}>
              <p style={titleStyle}>{conversation.title}</p>
              <div style={imageWrapperStyle}>
                { (conversation.avatars) ?
                  conversation.avatars.slice(0, 5).map(function (avatar) {
                    return <img style={imgStyle} key={conversation.avatars.indexOf(avatar)} src={avatar} />
                  }) : null
                }
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

})
