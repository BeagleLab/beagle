var React = require('react')
var TagsListWrapper = require('../components/tagsListWrapper.jsx')

module.exports = React.createClass({
	displayName: 'Tags',
	render: function () {
    var list = this.props.data
    return (
      <div>
        {this.props.data.map(function (tag) {
          return <TagsListWrapper className={'alert alert-info'} key={list.indexOf(tag)} data={tag} />
        })}
      </div>
    )
  }
})
