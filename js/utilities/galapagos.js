// Galapagos is the Beagle validator.
// expect("Did the HMS Beagle go to the Galapagos?").toBe(true)

var _ = require('lodash')
var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))
var PouchDBUrl = require('../env.js').PouchDBUrl
var db = new PouchDB(PouchDBUrl)
// var db = new PouchDB('local_db')

module.exports = exports = {
  isEntity: function (e) {
    if (e === null || typeof e !== 'object') throw new TypeError('Entity is not an object')
    if (e !== null && !e.id) throw new Error('Entity does not have an id')
    if (e !== null && typeof e.id !== 'string') throw new TypeError('Entity id is not a string')
    return true
  },
  isUser: function (author) {
    if (!this.isEntity(author)) {
      throw new Error('Author not a valid entity')
    }

    return true
    // return db.getUser(author.name, function (err, response) {
    //   if (err) {
    //     if (err.name === 'not_found') {
    //       return false
    //     } else {
    //       return false
    //     }
    //   } else {
    //     return true
    //   }
    // })
  },
  isConversation: function (conversation) {
    // TODO Add in db check for conversation
    if (!conversation) throw new Error('Conversation is null')
    if (!conversation._id) throw new Error('Conversation does not exist')
    if (!conversation.title || !conversation.author) {
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
