var React = require('react')
var Alert = require('./alert.jsx')

module.exports = React.createClass({
	displayName: 'Sidebar',
  getInitialState: function() {
    return {
      staticPath: (this.props.staticPath) ? this.props.staticPath + 'images/noun_11582.png' :
        chrome.extension.getURL("images/noun_11582.png")
    }
  },
	render: function() {
		return (
			<div className="scinav sidebar">
        <div className="pane-bg glass"></div>
				<div className="pane">
          <img src={this.state.staticPath} alt='HMS Beagle' className='beagle-icon' />
					<h2 className='beagle-header'>Beagle</h2>

					<Alert data={this.props.data} />
					{this.props.children}
	      </div>
	    </div>
		)
	}
})
