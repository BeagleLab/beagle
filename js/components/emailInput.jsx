var React = require('react')

module.exports = React.createClass({

	getInitialState: function() {
		return {value: 'Hello!'};
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
	},
	render: function() {
    var submitted

    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p>ContactForm data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }

		var value = this.state.value;
		return <input type="text" value={value} onChange={this.handleChange} />;
	}

})
