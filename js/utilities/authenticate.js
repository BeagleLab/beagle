/*globals OAuth */
'use strict'

module.exports.google = exports.google = function () {
  // OAauth Code goes here.
  OAuth.initialize('IHLK6uDxpnuH1S71dCwbf30bjBM')
  // Using popup
  OAuth.popup('google').done(function (result) {
    console.log(result)
    result.me().done(function (me) {
      console.log('Me', me)

      if (me.email) {
        result.get('https://www.google.com/m8/feeds/contacts/' + me.email + '/full?alt=json&max-results=5000').done(function (contacts) {
          window.contacts = contacts
        })
      }

    })
  })
}
