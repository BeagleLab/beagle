var React = require('react')
var renderField = require('./renderField.jsx')

var renderTextInput = function (id, label) {
  return (
    <RenderField(id, label,
      <input type="text" className="form-control" id={id} ref={id}/>
    ) />
  )
}

module.exports = exports = renderTextInput
