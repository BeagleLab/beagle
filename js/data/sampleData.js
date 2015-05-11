var data = {}

data.data = {
  title: 'This is an example title',
  publication: {
    id: '000000',
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
        'website': '#website'
      },
      {
        'email': 'test@gmail.com',
        'department': 'Linguistics',
        'graph': 'images/graph.png',
        'name': 'Noam Chomsky',
        'photo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chomsky.jpg/460px-Chomsky.jpg',
        'publications': [
          'Lectures on Physics 1',
          'Lectures on Physics 2',
          'Lectures on Physics 3'
        ],
        'university': 'CIT',
        'website': '#website'
      }
    ],
    title: 'Rapid prototyping of 3D DNA-origami shapes with caDNAno',
    journal: 'Nucleic acids research 37 (15), 5001',
    issue: '2.1',
    doi: '10.1093/nar/gkp436',
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
    cited_by_tweeters_count: '9001',
    subjects: ['tag1', 'tag2']
  }
}

module.exports = data
