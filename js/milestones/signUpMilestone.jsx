var React = require('react')
var Sidebar = require('../components/sidebar.jsx')
var SignIn = require('../components/signIn.jsx')

module.exports = React.createClass({
	displayName: 'Annotations Milestone',
  render: function() {

    return (
      <Sidebar>

				<SignIn />

				<p className='return'>Go Back</p>

      </Sidebar>
    )
  }
})
