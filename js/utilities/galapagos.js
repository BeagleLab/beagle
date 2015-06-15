// Galapagos is the Beagle validator.
// expect("Did the HMS Beagle go to the Galapagos?").toBe(true)

var _ = require('lodash')

module.exports = exports = {
  isEntity: function (e) {
    if (e === null || typeof e !== 'object') throw new TypeError('Entity is not an object')
    if (e !== null && !e.id) throw new Error('Entity does not have an id')
    if (e !== null && typeof e.id !== 'string') throw new TypeError('Entity id is not a string')
    return true
  },
  isAuthor: function (author) {
    // TODO Add a db call
    if (!author) throw new Error('Author is null')
    if (!author.id) throw new Error('Author is not a db object')
    return true
  },
  isConversation: function (conversation) {
    // TODO Add in db check for conversation
    if (!conversation) throw new Error('Conversation is null')
    if (!conversation.id) throw new Error('Conversation does not exist')
    if (!conversation.title || !conversation.owner) {
      throw new Error('Conversation is not valid')
    }
    return true
  },
  isPermission: function (a) {
    var permissions = ['read', 'write', 'share']
    if (!a || typeof a !== 'string') return false
    if (!_.includes(permissions, a)) return false
    return true
  }
}
