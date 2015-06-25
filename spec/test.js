/*globals describe, it */

var schema = require('../js/data/schema.js')
var galapagos = require('../js/utilities/galapagos.js')
var assert = require('assert')

describe('The galapagos validator', function () {
  describe('tests entities', function () {
    it('expects a non-empty object', function () {
      assert.throws(galapagos.isEntity, TypeError, 'Entity is not an object')
      assert.throws(function () {galapagos.isEntity({}) }, Error, 'Entity does not have an id')
    })
    it('expects an id', function () {
      assert.equal(galapagos.isEntity({id: 'id'}), true)
    })
    it('expects the id to be a string', function () {
      assert.equal(galapagos.isEntity({id: 'id'}), true)
      assert.throws(function () {galapagos.isEntity({id: 1})}, TypeError, 'Entity id is not a string')
      assert.throws(function () {galapagos.isEntity({id: false}) }, Error, 'Entity does not have an id')
    })
  })

  describe('tests permissions', function () {
    it('expects a permision as argument', function () {
      assert.equal(galapagos.isPermission(), false)
    })

    it('expects a string', function () {
      assert.equal(galapagos.isPermission(12), false)
    })

    it('expects a valid permission name', function () {
      assert.equal(galapagos.isPermission('see'), false)
      assert.equal(galapagos.isPermission('read'), true)
    })
  })
})

describe('The schema', function () {
  describe('has a function called newID', function () {
    it('returns a string', function () {
      assert.equal(typeof (schema.newID()) === 'string', true)
    })
  })

  describe('has a method called newUser', function () {
    it('returns an object', function () {
      assert.equal(typeof (schema.newUser('test')) === 'object', true)
    })

    it('with an id', function () {
      assert.equal(typeof (schema.newUser('test').id) === 'string', true)
    })

    it('with an array of oauth tokens', function () {
      assert.equal(schema.newUser('test').oauthTokens[0] === 'test', true)
    })

    it('which is a valid user', function () {
      assert.equal(galapagos.isUser(schema.newUser('test')), true)
    })
  })

  describe('has a method newConversation', function () {
    describe('which requires an options object', function () {
      it('with an author as a valid entity', function () {
        assert.throws(function () {
          schema.newConversation({author: {id: 2, name: 'Abraham'}})
        }, TypeError, 'Entity id is not a string')
      })

      // TODO Expects the author to be in the database

      it('with a title', function () {
        assert.equal(schema.newConversation({author: schema.account}, function (err) { if (err) return err}), 'Title is not valid')
      })
      it('with a title as a string', function () {
        assert.equal(schema.newConversation({author: schema.account, title: 1012}, function (err) {
          if (err) {
            return err
          }
        }), 'Title is not valid')
      })
    })

    it('which requires a callback', function () {
      assert.throws(function () {schema.newConversation({author: schema.account, title: 'Title'})}, TypeError, 'undefined is not a function')
    })

    // TODO Check this. I'm not sure it works.
    it('which saves a conversation', function (done) {
      schema.newConversation({author: schema.account, title: 'Title'}, done)
    })
  })

  describe('has a method newNote', function () {
    describe('which requires an options object', function () {
      it('with an author as a valid entity', function () {
        assert.throws(function () {
          schema.newNote({author: {id: 2, name: 'Abraham'}})
        }, TypeError, 'Entity id is not a string')
      })

      // TODO Expects the author to be in the database

      it('with a conversation', function () {
        assert.throws(function () {
          schema.newNote({author: schema.account}, function (err) { if (err) return err})
        }, Error, 'Conversation is null')

        assert.equal(schema.newNote({author: schema.account, conversation: schema.conversation}, function (err) {
          if (err) {
            return err
          }
          return true
        }), 'Text is not valid')
      })

      it('with a text field', function () {
        assert.equal(schema.newNote({
          author: schema.account,
          conversation: schema.conversation,
          title: null
        }, function (err) {
          if (err) {
            return err
          }
        }), 'Text is not valid')
      })
    })

    it('which requires a callback', function () {
      assert.throws(function () {
        schema.newNote({
          author: schema.account,
          conversation: schema.conversation,
          text: 'Text'
        })
      }, Error, 'Callback is not defined')
    })

    it('which saves a note', function (done) {
      schema.newNote({
        author: schema.account,
        conversation: schema.conversation,
        text: 'text'
      }, done)
    })
  })

  describe('has a method startBlankConversation', function () {
    it('which requires an options object with author', function () {
      assert.throws(function () { schema.startBlankConversation({}, function () {})}, Error, 'Author was not provided!')
    })
    it('which requires an options object with title', function () {
      assert.throws(function () { schema.startBlankConversation({author: 'Abraham'}, function () {})}, Error, 'Title was not provided!')
    })
    it('which requires an options object with text', function () {
      assert.throws(function () { schema.startBlankConversation({author: 'Abraham', title: 'Gettysburg Address'}, function () {})}, Error, 'Text was not provided')
    })

    // Broken
    it('which saves a conversation', function (done) {
      schema.startBlankConversation({
        author: schema.account,
        title: 'Example',
        text: 'Text'
      }, done)
    })
  })

  describe('has a method signUp', function () {
    it('expects a name, password, and email', function () {
      assert.throws(function () {
        schema.signUp({name: 'Mittens'})
      }, Error, 'Name, password, and email fields are mandatory')
    })

    it('expects a callback', function () {
      assert.throws(function () {
        schema.signUp({
          name: 'Mittens',
          password: 'kittehs',
          email: 'cat@cat.com'
        })
      }, Error, 'Callback not provided')
    })

    it('will check if email is valid', function () {
      assert.throws(function () {
        schema.signUp({
          name: 'User',
          password: 'password',
          email: 'testtest.com'
        }, function () {}
      )}, Error, 'Email not provided or not valid')
    })

    // it('will sign up a user', function(done) {
    //   schema.signUp({
    //     name: 'Mittens',
    //     password: 'kittehs',
    //     email: 'cat@cat.com'
    //   }, done)
    // })

    // Will check if email exists
    // Will check if name exists
    // Will not create a new account if a user exists
    // Will create a new account if a user does not exist
  })
})

