var React = require('react')
var db = require('level-browserify')('./mydb')
var url = require('../lib/url-checks')
var Accordion = require('react-bootstrap').Accordion
var Panel = require('react-bootstrap').Panel
var _ = require('lodash')

var nodemailer = require('nodemailer')
// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var mg = require('nodemailer-mailgun-transport')({
  auth: {
    api_key: 'key-7e56f671872d1e829021dd4dd39ae156',
    domain: 'sandboxc5e90e5fb9e84a9eb572c4e8c6720c67.mailgun.org'
  }
})
var nodemailerMailgun = nodemailer.createTransport(mg)

var ContactForm = React.createClass({
  getDefaultProps: function() {
    return {
      subject: false
    }
  }

, getInitialState: function() {
    return {errors: {}}
  }

, isValid: function() {
    var fields = ['email', 'message']
    if (this.props.subject) fields.push('subject')

    var errors = {}
    fields.forEach(function(field) {
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
  }

, getFormData: function() {
    var data = {
      email: this.refs.email.getDOMNode().value
    , message: this.refs.message.getDOMNode().value
    }
    if (this.props.subject) data.subject = this.refs.subject.getDOMNode().value
    return data
  }

, render: function() {
    return <div className="form-horizontal">
      {this.props.subject && this.renderTextInput('subject', 'Subject', 'For science!')}
      {this.renderTextInput('email', 'Email', 'Who should this go to?')}
      {this.renderTextarea('message', 'Body', 'What do you want to say?')}
      {/*
        To be used when attaching PDFs is an option.
      {this.renderRadioInlines('currentCustomer', 'Are you currently a ' + this.props.company + ' Customer?', {
        values: ['Yes', 'No']
      , defaultCheckedValue: 'No'
      })} */}
    </div>
  }

, renderTextInput: function(id, label, placeholder) {
    return this.renderField(id, label,
      <input type="text" className="form-control" id={id} ref={id} placeholder={placeholder} />
    )
  }

, renderTextarea: function(id, label, placeholder) {
    return this.renderField(id, label,
      <textarea className="form-control" id={id} ref={id} placeholder={placeholder} />
    )
  }

, renderSelect: function(id, label, values) {
    var options = values.map(function(value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(id, label,
      <select className="form-control" id={id} ref={id}>
        {options}
      </select>
    )
  }

, renderRadioInlines: function(id, label, kwargs) {
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
  }
})

var Forms = React.createClass({
  getInitialState: function() {
    return {
      subject: true
    , submitted: null
    }
  }

, render: function() {
    var submitted
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        We have sent that email for you!
        {/* <p>ContactForm data:</p>
         <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre> */}
      </div>
      setTimeout(function () {
        submitted = null
      }, 5000)
    }

    var style = {
      color: 'green',
      textAlign: 'center'
    }

    return (
      <Accordion>
        <Panel header="Share by email" className='share-panel' eventKey='1' activeKey={true}>
          {/* <label className="checkbox-inline">
            <input type="checkbox"
              checked={this.state.subject}
              onChange={this.handleChange.bind(this, 'subject')}
            /> Subject
          </label> */}
          <p style={style} >Send an email with your highlights.</p>
          <ContactForm ref="contactForm"
            subject={this.state.subject}
          />
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>
            Send
          </button>

        {/* <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">Contact Form</h3>
            <div className="pull-right">
            </div>
          </div>
          <div className="panel-body">
          </div>
          <div className="panel-footer">
          </div>
        </div> */}
        </Panel>
        {submitted}
    </Accordion>
    )
  }

, handleChange: function(field, e) {
    var nextState = {}
    nextState[field] = e.target.checked
    this.setState(nextState)
  }

, handleSubmit: function () {
    var fingerprint = this.props.fingerprint

    if (this.refs.contactForm.isValid()) {
      var data = this.refs.contactForm.getFormData()

      var payload = []

      // Read the entire database. TODO: Change this, it is not efficient.
      db.createReadStream()
        .on('data', function (data) {
          data = JSON.parse(data.value)
          for (var key in data) {
            if (data[key]['documentId'] === fingerprint) {
              payload.push(data[key]['text'])
              console.log('payload', payload)
            }
          }
        })
        .on('close', function () {
          // Log the results for now. TODO: Send to view
          var urlHtml = url.getPDFURL(window.location.href)

          // Todo: add in names
          var messageText = 'Hi,' +
            '\n\nPersonal Message:' +
            '\n\n\t' + data.message +
            '\n\nHighlights:\n'

          // TODO Allow user to select snippets to send.
          _.each(payload, function (highlight) {
            messageText += '\n\t' + highlight + '\n'
          })

          messageText += '\n If you want to see these highlighted, use Beagle and go here: ' + urlHtml +
            '\n\n For Science,\n - Richard' // Todo - add in username

          console.log('Message: ', messageText)

          nodemailerMailgun.sendMail({
              from: 'richard@beagle.io',
              // cc: 'richard.littauer@gmail.com',
              to: data.email, // An array if you have multiple recipients.
              subject: data.subject || 'Notes from Beagle',
              text: messageText
          }, function (err, info) {
            if (err) {
              console.log('Error: ' + err)
            } else {
              console.log('Response: ' + info)
            }
          })
          console.log('Database exhausted.')
        })
      this.setState({'submitted': data})
    }
  }
})

var trim = function() {
  var TRIM_RE = /^\s+|\s+$/g
  return function trim(string) {
    return string.replace(TRIM_RE, '')
  }
}()

function $c(staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames == 'undefined') {
    conditionalClassNames = staticClassName
  }
  else {
    classNames.push(staticClassName)
  }
  for (var className in conditionalClassNames) {
    if (!!conditionalClassNames[className]) {
      classNames.push(className)
    }
  }
  return classNames.join(' ')
}

module.exports.ContactForm = exports.ContactForm = ContactForm
module.exports.Forms = exports.Forms = Forms
