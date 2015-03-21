var React = require('react')
var _ = require('lodash')

var ContactForm = React.createClass({

  displayName: 'ContactForm',

  getDefaultProps: function () {
    return {
      tweet: null
    }
  },

  getInitialState: function () {
    return {errors: {}}
  },

  getFormData: function () {
    var data = {}
    this.props.forEach(function (prop) {
      data.prop = this.refs[prop].getDOMNode().value
    })
    return data
  },

  isValid: function () {
    var fields = []
    var errors = {}

    this.props.forEach(function (prop) {
      fields.push(prop)
    })

    fields.forEach(function (field) {
      var value = trim(this.refs[field].getDOMNode().value)
      if (!value) {
        errors[field] = 'This field is required'
      }
    }.bind(this))
    this.setState({errors: errors})

    var isValid = true
    for (var error in errors) {
      isValid = false
      break
    }

    return isValid
  },

 render: function () {
    var propKeys = _.keys(this.props)
    var rows = []
    propKeys.forEach(function (prop) {
      if (this.props[prop] && this.props[prop].renderType === 'renderTextarea') {
        rows.push(this.renderTextarea(this.props[prop].propKey, this.props[prop].placeholder))
      }
      if (this.props[prop] && this.props[prop].renderType === 'renderTextInput') {
        rows.push(this.renderTextInput(this.props[prop].propKey, this.props[prop].placeholder))
      }
    })


    return (
      <div className="form-horizontal">
        {rows}
      </div>
    )
  },
        /*
          To be used when attaching PDFs is an option.
        {this.renderRadioInlines('currentCustomer', 'Are you currently a ' + this.props.company + ' Customer?', {
          values: ['Yes', 'No']
        , defaultCheckedValue: 'No'
        })} */

  renderTextInput: function (id, label) {
    return this.renderField(id, label,
      <input type="text" className="form-control" id={id} ref={id}/>
    )
  },

  renderTextarea: function (id, label) {
    return this.renderField(id, label,
      <textarea className="form-control" id={id} ref={id}/>
    )
  },

  renderSelect: function (id, label, values) {
    var options = values.map(function (value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(id, label,
      <select className="form-control" id={id} ref={id}>
        {options}
      </select>
    )
  }

  /* , renderRadioInlines: function(id, label, kwargs) {
    var radios = kwargs.values.map(function(value) {
      var defaultChecked = (value == kwargs.defaultCheckedValue)
      return <label className="radio-inline">
        <input type="radio" ref={id + value} name={id} value={value} defaultChecked={defaultChecked}/>
        {value}
      </label>
    })
    return this.renderField(id, label, radios)
  }

, renderField: function(id, label, field) {
    return <div className={$c('form-group', {'has-error': id in this.state.errors})}>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className="col-sm-6">
        {field}
      </div>
    </div>
  } */
})

var trim = (function () {
  var TRIM_RE = /^\s+|\s+$/g
  return function trim (string) {
    return string.replace(TRIM_RE, '')
  }
})()

module.exports = exports = ContactForm
