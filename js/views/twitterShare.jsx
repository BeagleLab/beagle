/** @jsx React.DOM */
var React = require('react')
// var socialshare = require('socialshare')
// var googleSS = socialshare('http://google.com', function (ss) {
//   console.log(ss.url)
//   console.log(ss.hatebu.value, ss.twitter.value, ss.facebook.value)
// })

var ContactForm = React.createClass({

  displayName: 'ContactForm',

  getDefaultProps: function () {
    return {
      message: ''
    }
  },

  getInitialState: function () {
    return {errors: {}}
  },

  getFormData: function () {
    return { message: this.refs.message.getDOMNode().value }
  },

 render: function () {
    return (
      <div className="form-horizontal">
        {this.renderTextarea('message', 'message')}
      </div>
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
})

var TwitterShare = React.createClass({
  displayName: 'TwitterShare',
  handleClick: function (event) {

  },
  render: function () {
    var tweeturl = 'https://twitter.com/intent/tweet?text=' +
      'helloworld' + encodeURI('#beagle #') // + {this.props.data.doi}

    return (
      <button className="btn btn-success" src={tweeturl} type="button">
        Share on Twitter
      </button>
    )
  }
})

module.exports = TwitterShare
