var React = require('react')

var ListItemWrapper = React.createClass({
  render: function() {
  	return <a className="tag"><i className="fa fa-tag"></i> {this.props.data}</a>
  }
});

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h6>Publication</h6>
        <ul>
          <li id='title'>{this.props.data.title}</li>
          <li>{this.props.data.journal}</li>
          <li>{this.props.data.doi}</li>
        </ul>

        <h6>Graph</h6>
        <a className='alert alert-info' data-placement='top' title='' data-original-title='View citations'>
          <i className='fa fa-share-alt'></i> Tweets: {this.props.data.cited_by_tweeters_count}
        </a>

        <h6>Tags</h6>
        {this.props.data.subjects.map(function(subject){
          return <ListItemWrapper key={subject.id} data={subject} />
        })}
      </div>
    )
  }
})
