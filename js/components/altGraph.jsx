var React = require('react')

module.exports = React.createClass({
	displayName: 'Alt Graph',
  propTypes: {
    data: React.PropTypes.object
  },
  render: function () {
    return (
      <div>
        <a className='alert alert-info' data-placement='top' title='' data-original-title='View citations'>
          <i className='fa fa-share-alt'></i> Tweets: {this.props.data.cited_by_tweeters_count}
        </a>
      </div>
    )
  }
})
