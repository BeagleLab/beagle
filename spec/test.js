/*globals describe, it, expect */

var schema = require('../js/data/schema.js')

describe('The schema', function () {
  it('has a function called newID, which returns a string', function () {
    expect(typeof (schema.newID()) === 'string').toBe(true)
  })
})
