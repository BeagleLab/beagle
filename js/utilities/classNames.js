'use strict'

function c (staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames === 'undefined') {
    conditionalClassNames = staticClassName
  } else {
    classNames.push(staticClassName)
  }
  for (var className in conditionalClassNames) {
    if (!!conditionalClassNames[className]) {
      classNames.push(className)
    }
  }
  return classNames.join(' ')
}

module.exports = exports = c
