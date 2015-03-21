var React = require('react')

var renderTextarea = function (id, label) {
  return this.renderField(id, label,
    <textarea className="form-control" id={id} ref={id}/>
  )
}

module.exports = exports = renderTextarea
