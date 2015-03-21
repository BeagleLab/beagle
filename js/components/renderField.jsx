var React = require('react')

var renderField = function (id, label, field) {
  return (
    <div className={$c('form-group', {'has-error': id in this.state.errors})}>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className="col-sm-6">
        {field}
      </div>
    </div>
  )
}

function $c (staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames === 'undefined') {
    conditionalClassNames = staticClassName
  } else {
    classNames.push(staticClassName)
  }

  for (var className in conditionalClassNames) {
    if (conditionalClassNames[className]) {
      classNames.push(className)
    }
  }
  return classNames.join(' ')
}

module.exports = exports = renderField
