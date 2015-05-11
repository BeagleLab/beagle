var React = require('react')
// var db = require('level-browserify')('./mydb')
var Accordion = require('react-bootstrap').Accordion
var Panel = require('react-bootstrap').Panel

var Slack = require('browser-node-slack')
var slack = new Slack('https://hooks.slack.com/services/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')

var ContactForm = React.createClass({
  displayName: 'ContactForm',

  getDefaultProps: function () {
    return {
      text: false,
      channel: '#general'
    }
  },

  getFormData: function () {
    return {
      text: this.refs.text.getDOMNode().value,
      channel: this.refs.channel.getDOMNode().value
    }
  },

  getInitialState: function () {
    return {errors: {}}
  },

  isValid: function () {
    var fields = ['text', 'channel']
    var errors = {}

    fields.forEach(function (field) {
      var value = trim(this.refs[field].getDOMNode().value)
      if (!value) {
        errors[field] = 'This field is required'
      }
      if (field === 'channel' && value[0] !== '#') {
        errors[field] = 'The channel must start with a hashtag!'
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
    return (
      <div className="form-horizontal">
      {this.renderTextinput}
        {this.renderTextarea('text', 'Message', 'What do you want to say?')}
        {this.renderTextInput('channel', 'Channel', '#general')}
      </div>
    )
  },

  renderTextarea: function (id, label, placeholder) {
    return this.renderField(id, label,
      <textarea className="form-control" id={id} ref={id} placeholder={placeholder} />
    )
  },

  renderTextInput: function (id, label, placeholder) {
    return this.renderField(id, label,
      <input type="text" className="form-control" id={id} ref={id} placeholder={placeholder}/>
    )
  },

  renderField: function (id, label, field) {
    return (
      <div className={$c('form-group', {'has-error': id in this.state.errors})}>
        <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
        <div className="col-sm-6">
          {field}
        </div>
      </div>
    )
  }
})

var SendSlack = React.createClass({
  getInitialState: function () {
    return {
      submitted: null
    }
  },

  render: function () {
    var submitted
    if (this.state.submitted !== null) {
      submitted = (
        <div className="alert alert-success email-sent">
          Sent to Slack!
        </div>
      )
    }

    var style = {
      color: 'green',
      textAlign: 'center'
    }

    return (
      <Accordion>
        <Panel header="Send to Slack" className='share-panel' eventKey='1' activeKey={true}>
          <p style={style} >Send a note to slack with your highlights.</p>
          <ContactForm ref="contactForm" text={this.state.text} channel={this.state.channel} />
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>
            Send
          </button>
        {submitted}
        </Panel>
    </Accordion>
    )
  },

  handleSubmit: function () {
    // var fingerprint = this.props.fingerprint

    console.log('Submit')

    if (this.refs.contactForm.isValid()) {
      var data = this.refs.contactForm.getFormData()

      slack.send({
          text: data.text,
          channel: data.channel,
          username: 'bot'
      })

      this.setState({'submitted': data})
    }
  }
})

var trim = (function () {
  var TRIM_RE = /^\s+|\s+$/g
  return function trim (string) {
    return string.replace(TRIM_RE, '')
  }
})()

function $c (staticClassName, conditionalClassNames) {
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

module.exports.ContactForm = exports.ContactForm = ContactForm
module.exports.SendSlack = exports.SendSlack = SendSlack
