var React = require('react')
var db = require('level-browserify')('./mydb')
var url = require('../lib/url-checks')
var Accordion = require('react-bootstrap').Accordion
var Panel = require('react-bootstrap').Panel
var _ = require('lodash')
var request = require('request')
request.debug = true

// var nodemailer = require('nodemailer')
// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
// var mg = require('nodemailer-mailgun-transport')({
//   auth: {
//     api_key: 'key-7e56f671872d1e829021dd4dd39ae156',
//     domain: 'sandboxc5e90e5fb9e84a9eb572c4e8c6720c67.mailgun.org'
//   }
// })
//
// var nodemailerMailgun = nodemailer.createTransport(mg)

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
      {this.props.subject && this.renderTextInput('subject', 'Subject', 'llamas')}
      {this.renderTextInput('email', 'Email', 'richard.littauer@gmail.com')}
      {this.renderTextInput('message', 'Message', 'This is a standard llama message llama')}
      {/*
				To be used when attaching PDFs is an option.
      {this.renderRadioInlines('currentCustomer', 'Are you currently a ' + this.props.company + ' Customer?', {
        values: ['Yes', 'No']
      , defaultCheckedValue: 'No'
      })} */}
    </div>
  }

, renderTextInput: function(id, label, value) {
    return this.renderField(id, label,
      <input type="text" className="form-control" id={id} ref={id} value={value} />,
       value // optional value for dev
    )
  }

, renderTextarea: function(id, label) {
    return this.renderField(id, label,
      <textarea className="form-control" id={id} ref={id}/>
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

, renderField: function(id, label, field, value) {
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
				<p>ContactForm data:</p>
				<pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
			</div>
		}

		return (
      <Accordion>
        <Panel header="Share by email" eventKey='1' activeKey={true}>
					{/* <label className="checkbox-inline">
						<input type="checkbox"
							checked={this.state.subject}
							onChange={this.handleChange.bind(this, 'subject')}
						/> Subject
					</label> */}
  				<ContactForm ref="contactForm"
  					subject={this.state.subject}
  				/>
					<button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>
            Submit
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

, handleSubmit: function() {
    var fingerprint = this.props.fingerprint

    // Set this late
    var config = {
      "sendImg": true
    }

		if (this.refs.contactForm.isValid()) {
			var data = this.refs.contactForm.getFormData()
      , payload = []
      , imageURL

      // Read the entire database. TODO: Change this, it is not efficient.
      db.createReadStream()
        .on('data', function(data){
          // If a comment is attached to the PDF you're looking at, get it
          if (JSON.parse(data.value).document_id === fingerprint) {
            payload.push(data)
          }
        })
        .on('close', function(){
          // Log the results for now. TODO: Send to view
          var urlHtml = url.getPDFURL(window.location.href)

          var messageText = 'Hi Richard.' +
            '\n\nI was feeding this cat and then I thought this:' +
            '\n\n\t' + data.message +
            '\n\n Here are the purrs that happened:'

          // TODO Allow user to select snippets to send.
          _.each(payload, function(annotation) {
            annotation = JSON.parse(annotation.value)
            if (config.sendImg && annotation.id ) {
              chrome.storage.sync.get(annotation.id, function(items) {
                imageURL = items.value
              })
            }
            messageText += '\n> ' + annotation.text + '\n'
          })

          messageText += '\n If you want to see it, go here: ' + urlHtml

          if (imageURL) {
            messageText += '\n <img src="cid:' + imageURL + '" /> '
          }

          messageText += '\n Well, hope that helped with the sciencing.' +
            '\n\n For great good,\n - Richard'

          console.log("Message: ", messageText)

          var mailingUrl = 'http://localhost:5000/message'

          var req = request.post(mailingUrl, {
              from: 'richard@beagle.io',
              // cc: 'richard.littauer@gmail.com',
              to: data.email, // An array if you have multiple recipients.
              subject: data.subject || 'Hey you, awesome!',
              text: messageText,
              inline: imageURL
          }, function (err, res, body) {
            if (err != null) {
              console.error(err)
              process.exit(-1)
            }

            console.log(body)
          })
            // Old callbak
            // function (err, info) {
              // if (err) {
              //   console.log('Error: ' + err);
              // }
              // else {
              //   console.log('Response: ' + info);
              // }
            // }

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
