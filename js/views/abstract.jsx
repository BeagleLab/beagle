var React = require('react');

var Abstract = React.createClass({
    displayName: 'Abstract',
    render: function () {
        return (
            <div class="abstract">{this.props.data}</div>
        );
    }
});

module.exports = Abstract;
