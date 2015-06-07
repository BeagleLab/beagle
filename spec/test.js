/*globals describe, it, expect */

var schema = require('../js/data/schema.js')

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
