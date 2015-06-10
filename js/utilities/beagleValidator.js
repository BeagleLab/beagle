// This is a validator for the schema.

module.exports.beagleValidator = exports.beagleValidator = {
  author: function (author) {
    // TODO Add a db call
    if (!author) throw new Error('Author is null')
    if (!author.id) throw new Error('Author is not a db object')
    return true
  },
  conversation: function (conversation) {
    // TODO Add in db check for conversation
    if (!conversation) throw new Error('Conversation is null')
    if (!conversation.id) throw new Error('Conversation does not exist')
    if (!conversation.title || !conversation.owner) {
      throw new Error('Conversation is not valid')
    }
    return true
  }
}
