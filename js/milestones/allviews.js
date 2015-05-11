var React = require('react')
var domready = require('domready')
var $ = require('jquery')

// var data = require('../data/sampleData.js')

var App = require('../app.jsx')

// React modules
// var AnnotationsMilestone = require('../milestones/annotationsMilestone.jsx')
var AuthorModal = require('../components/authorModal.jsx')
var CiteModal = require('../components/citeModal.jsx')
var GraphModal = require('../components/graphModal.jsx')
var JournalModal = require('../components/journalModal.jsx')
var NoteModal = require('../components/noteModal.jsx')
var NotificationBanner = require('../components/notificationBanner.jsx')
var PaperModal = require('../components/paperModal.jsx')
var SavedPapersModal = require('../components/savedPapersModal.jsx')
var SignUpMilestone = require('../milestones/signUpMilestone.jsx')
var TagsModal = require('../components/tagsModal.jsx')
// var Abstract = require('../components/abstract.jsx')
// var Alert = require('../components/alert.jsx')
// var AltGraph = require('../components/altGraph.jsx')
// var Annotations = require('../components/annotations.jsx')
// var Champion = require('../components/champion.jsx')
// var Cite = require('../components/cite.jsx')
// var Contact = require('../components/contact.jsx')
// var Figs = require('../components/figs.jsx')
// var Highlght = require('../components/highlight.jsx')
// var Graph = require('../components/graph.jsx')
// var LinkOut = require('../components/linkOut.jsx')
// var Publication = require('../components/publication.jsx')
// var PublicationsList = require('../components/publicationsList.jsx')
// var PublicationsListWrapper = require('../components/publicationsListWrapper.jsx')
// var Save = require('../components/save.jsx')
// var SignIn = require('../components/signIn.jsx')
// var SignOut = require('../components/signOut.jsx')
// var Supplement = require('../components/supplement.jsx')
// var Tags = require('../components/tags.jsx')
// var TagsList = require('../components/tagsList.jsx')
// var TagsListWrapper = require('../components/tagsListWrapper.jsx')
// var Toc = require('../components/toc.jsx')

function inject (id) {
  var c = $('#inject-' + id).contents()
  $('.inject-' + id).append(c)
}

domready(function () {
  inject("main-panel")
  inject("margin")
  // $('[data-toggle=tooltip]').tooltip()
  $('img#paper').attr('src', 'https://www.evernote.com/shard/s198/sh/568f644d-9363-4727-8294-20de7680bbc4/b324078ee29bfbff11dadb243383cf27/deep/0/jbenet.static.s3.amazonaws.com-0525f90-ipfs-the-permanent-web.pdf.png')

  // Dummy Data
  var data = {
    'data': {
      title: 'This is an example title',
      publication: {
        id: '136172',
        author: [
          {
            'email': 'test@gmail.com',
            'department': 'Physics',
            'graph': 'images/graph.png',
            'name': 'Richard Feynman',
            'photo': 'http://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg',
            'publications': [
              'Lectures on Physics 1',
              'Lectures on Physics 2',
              'Lectures on Physics 3'
            ],
            'university': 'CIT',
            'website': '#website',
          },
          {
            'email': 'test@gmail.com',
            'department': 'Linguistics',
            'graph': 'images/graph.png',
            'name': 'Noam Chomsky',
            'photo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chomsky.jpg/460px-Chomsky.jpg'  ,
            'publications': [
              'Lectures on Physics 1',
              'Lectures on Physics 2',
              'Lectures on Physics 3'
            ],
            'university': 'CIT',
            'website': '#website',
          }
        ],
        title: "Rapid prototyping of 3D DNA-origami shapes with caDNAno",
        journal: "Nucleic acids research 37 (15), 5001",
        issue: "2.1",
        doi: "10.1093/nar/gkp436",
        toc: [
          {
            'id': 1,
            'name': 'Introduction',
            'anchor': '#intro'
          },
          {
            'id': 2,
            'name': '1st Section',
            'anchor': '#section1'
          },
          {
            'id': 3,
            'name': 'Conclusion',
            'anchor': '#conclusion'
          }
        ],
        cited_by: [
          'Lectures on Physics 1',
          'Lectures on Physics 2',
          'Lectures on Physics 3'
        ],
        cites: [
          'Lectures on Physics 4',
          'Lectures on Physics 5',
          'Lectures on Physics 6'
        ],
        related: [
          'Lectures on Physics 7',
          'Lectures on Physics 8',
          'Lectures on Physics 9'
        ],
        cited_by_tweeters_count: "9001",
        subjects: ['tag1', 'tag2'],
      }
    }
  }

  // Milestone 1: Sidebar
  // Bundle it up
  React.render(
    App(data),
    document.getElementById('m1')
  )

  // Milestone 2: Hidden Sidebar
  // Should be hidden, but should show notations in margin, with some
  // UI to open the margin
  // React.render(
  //  App(data),
  //  document.getElementById('m2')
  // )
  React.render(
    <NotificationBanner data='This is a notification!' />,
    document.getElementById('notification')
  )

  // Milestone 3: Author Profile

  React.render(
    <App data={data} />,
    document.getElementById('m3')
  )
  React.render(
    <AuthorModal data={data.data} />,
    document.getElementById('m3.1')
  )

  // Milestone 4: Publication Graph
  React.render(
    <App data={data} />,
    document.getElementById('m4')
  )
  React.render(
    <GraphModal data={data.data} />,
    document.getElementById('m4.1')
  )

  // Milestone 5: Tags
  data.data.tags = {
    your_tags: [ 'Arxteryx', 'Diplodocus', 'Kiwi'],
    group_tags: ['Platypus', 'Bear'],
    public_tags: ['Earth', 'Air', 'Wind', 'Fire']
  }
  React.render(
    <App data={data} />,
    document.getElementById('m5')
  )
  React.render(
    <TagsModal data={data.data} />,
    document.getElementById('m5.1')
  )

  // Milestone 6: BibTex
  React.render(
    <App data={data} />,
    document.getElementById('m6')
  )
  React.render(
    <CiteModal data={data.data} />,
    document.getElementById('m6.1')
  )

  // Milestone 7: BibTex
  React.render(
    <App data={data} />,
    document.getElementById('m7')
  )
  React.render(
    <SavedPapersModal />,
    document.getElementById('m7.1')
  )

  // Milestone 8: Annotations
  data.data.annotations = {
    innacuracy_count: 6,
    interesting_count: 3,
    notes_count: 27,
    your_notes_count: 2
  }

  // React.render(
  //   <AnnotationsMilestone data={data.data} />,
  //   document.getElementById('m8')
  // )

  // Milestone 9: journal
  data.data.journal = {
    'name': 'PLOS',
    'about': 'Public Library of Science',
    'impact_factor': '2.1'
  }

  React.render(
    <App data={data} />,
    document.getElementById('m9')
  )
  React.render(
    <JournalModal data={data} />,
    document.getElementById('m9.1')
  )

  // Milestone 10: Authentication
  var unAuthError = 'You are not authenticated!'

  React.render(
    <SignUpMilestone unAuthError={unAuthError} />,
    document.getElementById('m10')
  )

  // Milestone 11: Paper
  data.data.journal = {
    'name': 'PLOS',
    'about': 'Public Library of Science',
    'impact_factor': '2.1'
  }

  React.render(
    <App data={data} />,
    document.getElementById('m11')
  )
  React.render(
    <PaperModal data={data} />,
    document.getElementById('m11.1')
  )

  // Milestone 12: Save a note on the paper
  React.render(
    <App data={data} />,
    document.getElementById('m12')
  )
  React.render(
    <NoteModal />,
    document.getElementById('m12.1')
  )
})
