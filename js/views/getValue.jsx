'use strict';
var fs = require('fs')
var React = require('react')
var rangy = require('rangy')
var level = require('level-browserify')
var db = level('./mydb')

// var Mailgun = require('mailgun').Mailgun;
// var mg = new Mailgun('key-7e56f671872d1e829021dd4dd39ae156');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: 'key-7e56f671872d1e829021dd4dd39ae156',
    domain: 'sandboxc5e90e5fb9e84a9eb572c4e8c6720c67.mailgun.org'
  }
}

var nodemailer = require('nodemailer')
var mg = require('nodemailer-mailgun-transport')(auth)
var nodemailerMailgun = nodemailer.createTransport(mg)

var GetValue = React.createClass({
  displayName: 'GetValue',
  getInitialState: function() {
    return {text: false}
  },
  handleClick: function(event) {
    this.setState({text: !this.state.text})
    db.get('text', function (err, value) {
      if (err) return console.log('Ooops!', err) // likely the key was not found

      console.log('text=' + value)

    	nodemailerMailgun.sendMail({
			  from: 'richard@beagle.io',
			  to: 'richard.littauer@gmail.com', // An array if you have multiple recipients.
			  subject: 'Hey you, awesome!',
			  text: 'Hi Adam. I thought you might appreciate this text from a PDF he was reading:\n\n' +
         value + '\n\n Well, hope that helped with the sciencing.\n\n For great good,\n - Richard',
        'attachments': [{
         	fileName: 'PDF',
	        path: window.location.href
		    }]
			}, function (err, info) {
			  if (err) {
			    console.log('Error: ' + err);
			  }
			  else {
			    console.log('Response: ' + info);
			  }
			});

	    // mg.sendText('richard@beagle.io',
     //     ['richard.littauer@gmail.com'],


	    //    ]},
     //     function(err) { err && console.log('Email failed', err) });

    })
  },
  render: function () {
    return (
      <button className="btn btn-primary" type="button" onClick={this.handleClick}>
        Retrieve value
      </button>
    );
  }
});

module.exports = GetValue;
