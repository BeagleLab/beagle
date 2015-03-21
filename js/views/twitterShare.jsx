/** @jsx React.DOM */
var React = require('react')
var ContactForm = require('../components/contactForm.jsx')
// var socialshare = require('socialshare')
// var googleSS = socialshare('http://google.com', function (ss) {
//   console.log(ss.url)
//   console.log(ss.hatebu.value, ss.twitter.value, ss.facebook.value)
// })

var TwitterShare = React.createClass({
  displayName: 'TwitterShare',
  handleClick: function (event) {

  },
  render: function () {
    var tweeturl = 'https://twitter.com/intent/tweet?text=' +
      'helloworld' + encodeURI('#beagle #') // + {this.props.data.doi}

    var tweet = {
      renderType: 'renderTextarea',
      propKey: 'message',
      placeholder: 'Write your message here!',
      value: this.state.tweet
    }

    return (
      <button className="btn btn-success" src={tweeturl} type="button">
        Share on Twitter
        <ContactForm tweet={tweet} />
      </button>
    )
  }
})

module.exports = TwitterShare
