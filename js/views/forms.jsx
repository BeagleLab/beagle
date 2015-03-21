var React = require('react')
var db = require('level-browserify')('./mydb')
var url = require('../lib/url-checks')
var Accordion = require('react-bootstrap').Accordion
var Panel = require('react-bootstrap').Panel
var _ = require('lodash')
var ContactForm = require('../components/contactForm.jsx')

var nodemailer = require('nodemailer')
// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var mg = require('nodemailer-mailgun-transport')({
  auth: {
    api_key: 'key-7e56f671872d1e829021dd4dd39ae156',
    domain: 'sandboxc5e90e5fb9e84a9eb572c4e8c6720c67.mailgun.org'
  }
})
var nodemailerMailgun = nodemailer.createTransport(mg)

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

    var subject = {
      renderType:'renderTextInput',
      propKey: 'subject',
      placeHolder: 'Subject',
      value: this.state.subject
    }
    var message = {
      renderType: 'renderTextInput',
      propKey: 'message',
      placeHolder: 'Message',
      value: this.state.message
    }
    var email = {
      renderType: 'renderTextInput',
      propKey: 'email',
      placeHolder: 'Email',
      value: this.state.email
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
  					subject={subject}
            email={email}
            message={message}
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

		if (this.refs.contactForm.isValid()) {
			var data = this.refs.contactForm.getFormData();


      var payload = []

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

          // Todo: add in names
          var messageText = 'Hi friend,' +
            '\n\nPersonal Message:' +
            '\n\n\t' + data.message +
            '\n\nHighlights:'

          // TODO Allow user to select snippets to send.
          _.each(payload, function(annotation) {
            messageText += '\n> ' + JSON.parse(annotation.value).text + '\n'
          })

          messageText += '\n If you want to see it, go here: ' + urlHtml +
            '\n\n For Science,\n - Richard' // Todo - add in username

          console.log("Message: ", messageText)

          nodemailerMailgun.sendMail({
              from: 'richard@beagle.io',
              // cc: 'richard.littauer@gmail.com',
              to: data.email, // An array if you have multiple recipients.
              subject: data.subject || 'Notes from Beagle',
              text: messageText
          }, function (err, info) {
            if (err) {
              console.log('Error: ' + err);
            }
            else {
              console.log('Response: ' + info);
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
