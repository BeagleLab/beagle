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
  it('has a function called newID, which returns a string', function () {
    expect(typeof (schema.newID()) === 'string').toBe(true)
  })
})

describe('Schema.newAccount', function () {
  it('will check if name is valid', function () {
    expect(schema.newAccount(10, 'test@test.com')).toBe(null)
  })

  // Will check if email is valid
  // Will check if email exists
  // Will check if name exists
  // Will not create a new account if a user exists
  // Will create a new account if a user does not exist
})
