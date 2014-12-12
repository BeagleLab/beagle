var React = require('react')
var App = require('./app.jsx')
var altmetrics = require('./views/altmetrics.jsx')
var socialsharing = require('./views/socialsharing.jsx')

// put dummy data here:
var data = {}

data.altmetrics = {
  title: "Rapid prototyping of 3D DNA-origami shapes with caDNAno",
  journal: "Nucleic acids research 37 (15), 5001",
  doi: "10.1093/nar/gkp436",
  cited_by_tweeters_count: "9001",
  subjects: [],
}

data.app = {
  altmetrics: data.altmetrics,
}

module.exports = React.createClass({
  render: function() {

    // add the view here:
    return (
      <div class="pane-bg glass">
        <h1>All Views</h1>
        <p>This is a listing of all views, so we can quickly see how they all render.</p>

        <h2>views/altmetrics.jsx</h2>
        <altmetrics data={data.altmetrics} />

        <h2>views/socialsharing.jsx</h2>
        <socialsharing />

        <h2>app.jsx</h2>
        <App data={data.app} />
      </div>
    )
  }
})
