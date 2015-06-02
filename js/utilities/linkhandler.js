var Router = require('react-router')
var $ = require('jquery')
module.exports = linkHandler

function linkHandler () {

  var external = /^(https?:)?\/\//i
  // static is reserved
  var staticPath = /^\/static\//i

  $(document.body).on('click', 'a', function (event) {

    var href = $(this).attr('href')

    // pass through if external or static
    if (external.test(href) || staticPath.test(href)) {
      return
    }

    // bail if already defaultPrevented
    if (event.defaultPrevented) {
      return
    }

    Router.transitionTo(href)
    event.preventDefault()
    return false
  })
}
