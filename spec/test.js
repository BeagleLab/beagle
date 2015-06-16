/*globals describe, it, expect */

var schema = require('../js/data/schema.js')
var galapagos = require('../js/utilities/galapagos.js')

describe('The galapagos validator', function () {
  describe('tests entities', function () {
    it('expects a non-empty object', function () {
      expect(function () {galapagos.isEntity() }).toThrow(new TypeError('Entity is not an object'))
      expect(function () {galapagos.isEntity({}) }).toThrow(new Error('Entity does not have an id'))
    })
    it('expects an id', function () {
      expect(galapagos.isEntity({id: 'id'})).toBe(true)
    })
    it('expects the id to be a string', function () {
      expect(galapagos.isEntity({id: 'id'})).toBe(true)
      expect(function () {galapagos.isEntity({id: 1})}).toThrow(new TypeError('Entity id is not a string'))
      expect(function () {galapagos.isEntity({id: false}) }).toThrow(new Error('Entity does not have an id'))
    })
  })

  describe('tests permissions', function () {
    it('expects a permision as argument', function () {
      expect(galapagos.isPermission()).toBe(false)
    })

    it('expects a string', function () {
      expect(galapagos.isPermission(12)).toBe(false)
    })

    it('expects a valid permission name', function () {
      expect(galapagos.isPermission('see')).toBe(false)
      expect(galapagos.isPermission('read')).toBe(true)
    })
  })
})

describe('The schema', function () {
  describe('has a function called newID', function () {
    it('returns a string', function () {
      expect(typeof (schema.newID()) === 'string').toBe(true)
    })
  })

  describe('has a method signUp', function () {
    it('expects a name, password, and email', function () {
      expect(function () {
        schema.signUp({name: 'Mittens'})
      }).toThrowError('Name, password, and email fields are mandatory')
    })

    it('expects a callback', function () {
      expect(function () {
        schema.signUp({
          name: 'Mittens',
          password: 'kittehs',
          email: 'cat@cat.com'
        })
      }).toThrowError('Callback not provided')

      expect(function () {
        schema.signUp({
          name: 'Mittens',
          password: 'kittehs',
          email: 'cat@cat.com'
        }, function () {})
      }).not.toThrow()
    })

    it('will check if email is valid', function () {
      expect(function () {
        schema.signUp({
          name: 'User',
          password: 'password',
          email: 'testtest.com'
        }, function () {}
      )}).toThrowError('Email not provided or not valid')
    })

    // Will check if email exists
    // Will check if name exists
    // Will not create a new account if a user exists
    // Will create a new account if a user does not exist
  })
})

