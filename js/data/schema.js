/*globals emit */

var crypto = require('crypto')
var validator = require('validator')
var PouchDB = require('pouchdb')
var db = new PouchDB('test')
var _ = require('lodash')

// Everything is an 'entity'. it has an ID.
// type Entity struct {
  // ID EntityID
// }

// EntityIDs are just strings.
// (will be a UUID or something like it)
// type EntityID string

// An AccountID is just an EntityID.
// type AccountID EntityID

// Account is an object representing a User or a Group.
// (i.e. a person or an organization). this is here
// because permissions need something common
// type Account struct {
//   ID     AccountID
//   Name   string // full name of the account
//   Avatar string // a square picture for the account
//   PrimaryEmail string // email associated with account
//   Emails  []string // other email accounts (should include "primary email")
// }

module.exports.account = exports.account = {
  '_id': 'hash1234',
  'name': 'Richard Feynman',
  'avatar': 'http://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg',
  'primaryEmail': 'richard.feynman@caltech.edu',
  'emails': [
    'richard.feynman@caltech.edu',
    'richard.is.the.best@gmail.com'
  ]
}

// User is an individual user, a Person.
// type User struct {
//   Account // it is an account. (this is "embedded here", Go uses composition instead of inheritance)
//   OAuthTokens []string
// }

module.exports.user = exports.user = {
  'account': 'hash1234',
  'oauthTokens': [
    'lksjfsa;djl',
    'sdlkfjlsjss'
  ]
}

// Group is a group of people, an organization.
// type Group struct {
//   Account // it is an account.
//   Owner   []AccountID
//   Members Membership
// }

// TODO Should members be IDs?
module.exports.group = exports.group = {
  '_id': 'hash5678',
  'owner': 'hash1234',
  'members': [
    'Richard Feynman',
    'Noam Chompsky'
  ]
}

// Conversation is a semantic grouping of entities,
// users/groups discussing a topic, through messages
// and reference materials.
// type Conversation struct {
//   ID Entity

//   Title string
//   Owner []AccountID
//   Participants Membership
// }

module.exports.conversation = exports.conversation = {
  '_id': '1234hash',
  'title': "Surely you're joking!",
  'owner': [
    'hash1234'
  ],
  'participants': [
    'Richard Feynman',
    'Noam Chompsky'
  ],
  'notes': [
    'hash4567',
    'hash1234',
    'hash3244'
  ]
}

// it would be nice to leverage some "media schema" that
// already exists rather than invent our own. It's likely
// something that the Linked Data community has already
// made
// var MediaTypes = []string{
//   "publication", // paper
//   "webpage",
//   "image",
//   ...
// }

// TODO Why is this an array, and not just a string?
// TODO Should we validate this using some sort of testing?
// TODO What is this for, exactly? When is this used?

module.exports.mediaTypes = exports.mediaTypes = [
  'publication', 'webpage', 'image'
]

// // A MediaObject is a specific piece of media that's
// // able to be viewed, referenced, and linked to.
// // For example, a Paper, a webpage, or an image.
// type MediaObject struct {
//   Entity // it is an entity

//   // all media objects must have
//   Title     string
//   Type      string // one of MediaTypes
//   Authors   []string
//   SourceURL string // the source URL of the object.

//   // everything else (like DOI, etc) we can put in a big
//   // "metadata" sub-object (this just means an arbitrary json object)
//   Metadata  map[string]interface{}
//   // TODO What does map[string]interface{} mean?
// }

module.exports.mediaObject = exports.mediaObject = {
  'title': 'Boy with apple',
  'type': 'image',
  'authors': ['Johannes Van Hoyt The Younger', 'Pliny the Elder'], // ID?
  'sourceURL': 'http://www.mrtaylor.co.uk/static/images/appleboy_c.jpg',
  'metadata': {
    'bleep': 'blorp'
  }
}

// Dummy examples
module.exports.mediaImage = exports.image = exports.mediaObject
module.exports.mediaPublication = exports.publication = {
  'title': 'A Structure for Deoxyribose Nucleic Acid',
  'type': 'publication',
  'authors': ['Francis Crick', 'James Watson'],
  'sourceURL': 'http://www.nature.com/nature/dna50/watsoncrick.pdf',
  'metadata': {
    'doi': '10.1038/171737a0',
    'shareCount': '10684',
    'commentCount': '82' // TODO Get this programmatically
  }
}

// A Note is a piece of text related to a conversation.
// type Note struct {
//   ID Entity

//   Text string
//   Author []AccountID
//   Conversation EntityID // link
// }

module.exports.note = exports.note = {
  '_id': 'hash4567',
  'text': 'Ever since I was little, I have always loved the sound of my own voice.',
  'author': [
    'Richard Feynman'
  ],
  'conversation': 'asfjklsjglw'
}

// An Annotation is a piece of media affixed to another piece of media.
// type Annotaton struct {
//   Entity // it is an entity
//
//   Source EntityID // a MediaObject
//   Author AccountID // author of the annotation
// }

module.exports.annotation = exports.annotation = {
  '_id': 'ranodmhash',
  'source': 'asdfjlw',
  'author': 'lksdjfsl'
}

// Type of permission. (this could be an int but may be )
// type PermType string

// var (
//   ReadPerm PermType = "read"
//   WritePerm PermType = "write"
//   SharePerm PermType = "share"
// )

// This is read
module.exports.permission = exports.permission = 'read'

// Membership is a group of users that belong to an entity,
// with associated permissions. For example, the participants
// of a conversation, or the members of a group.
// type Membership map[AccountID]Permission

// these are like tables
// var (
//   EntityPermissions map[AccountID][EntityID]PermType
// )

// Membership is a group of users that belong to an entity,
// with associated permissions. For example, the participants
// of a conversation, or the members of a group.
// type Membership map[AccountID]Permission

// // links
// type Link struct {
//   Src  EntityID
//   Dst  EntityID
//   Type string
// }

// set of lower level functions.

// newID creates a new universal and uniformly distributed identifier.
// we can't just use the hash of the data, because we'd like to link
// to things even if the data changes.
//
// UUID is not secure: it is guessable, so since links may be used
// in "anyone with the link" type permissions, we'd like an unguessable
// identifier.
//
// So, we'll use hash functions. to preserve upgradeability, we'll use
// multihash -- https://github.com/jbenet/multihash -- and settle on using
// sha256-256 (i.e. 256 at 256 bits.
// func newID() string {

//   // we first read some cryptographically secure randomness.
//   // (node and browsers have ways to do this easily)
//   randbuf := rand.Read(256) // read 256 bits of randomness

//   // then hash that-- sometimes RNGs are owned.
//   // (see https://github.com/jbenet/node-multihashing/)
//   hash := multihashing.digest(randbuf, 'sha256')

//   // store them as base32 for printability.
//   id := base32.encode(hash)
//   return id
// }

module.exports.newID = exports.newID = function newID () {
  // See http://stackoverflow.com/a/14869745
  // TODO: Things I don't understand:
  //  - Is this base32?
  //  - Why did @jbenet hash the randomness?
  //  - Is this better? I think so, if only because of the huge amount
  //  of possibilities.
  var id = crypto.randomBytes(20).toString('hex')
  return id
}

// // newUser makes and stores a new user account.
// func newUser(name, avatar, email string) (User, error) {
//   // validate name
//   // validate avatar
//   // validate email

//   // FIRST, check another user by that email doesn't exist.
//   // WARNING: this requires consistency semantics. this is so
//   // common that couchdb probably has a way of handling it.
//   // (probably some sort of insert-or-query)
//   users := db.query({
//     Type: "User",
//     Emails: []string{email}, // has email
//   }) // check if user email in use
//   if len(users) > 0 {
//     return nil, "email already in use"
//   }

//   u := User{
//     ID: newID(),
//     Name: name,
//     Avatar: avatar, // have some sane default
//     PrimaryEmail: email,
//     Emails: []string{email},
//   }

module.exports.newAccount = exports.newAccount = function newAccount (name, email, avatar, options) {
  if (!name || typeof (name) !== 'string') {
    console.log('Name not provided, or not a string')
    return null
  }
  if (!email || !validator.isEmail(email)) {
    console.log('Email not provided or not valid')
    return null
  }
  // Avatar should be not mandatory
  // if (!avatar) return
  db.query({map: function (doc) {
    if (doc.primaryEmail) {
      emit(doc.primaryEmail, null)
    }
  }}, {key: email}).then(function (response) {
    _.each(response.rows, function (user) {
      return 'That email is already in use!'
    })
  }).catch(function () {
    console.log('Creating new user')
    var user = {
      '_id': this.newID(),
      'name': name,
      'email': email,
      'avatar': avatar || null,
      'emails': options.emails || null
    }
    // db.put(email, user)
  })
}

//   // let's talk about elsewhere how to put to the db, globals are not great,
//   // we just do it here for simplicity.
//   db.put(u) // save it.
//   return u
// }

// // newConversation makes and stores a new conversation item.
// func newConversation(author User, title string) Conversation {
//   // validate author
//   // validate title

//   c := Conversation{
//     ID: newID(),
//     Title: title,
//     Owner: []string{author.ID},
//   }

//   db.put(c) // save it.
//   return c
// }

// // newNote makes a new note and stores it.
// func newNote(author User, conv Conversation, text string) Note {
//   // validate author
//   // validate conv
//   // validate text

//   n := Note{
//     ID: newID(),
//     Text: text,
//     Author: author.ID,
//     Conversation: conv.ID,
//     Participants: Membership{
//       author.ID: SharePerm, // put the author as a participant too.
//     },
//   }
//   db.put(n)
//   return n
// }

// // StartBlankConversation is what we do when users want to start a conversation
// // from scratch, unassociated with media. that is, it's not coming from a paper,
// // or an anotation, or anything. it's just a conversation from scratch.
// //
// // we need to:
// // - user u1 provides title, and note text (we'll make a first note, too)
// // - create a new conversation c1 (with title, linked to u1)
// // - save the conversation
// // - create a new note n1 (linked to c1)
// func StartBlankConversation(author User, title string, noteText string) (Conversation) {

//   // make new conversation, linked to author and with title.
//   c := newConversation(author, title)

//   // make a new note, linked to author, linked to conversation, and with noteText.
//   n := newNote(author, conversation, noteText)

//   return c, n
// }

// // GetConversationPosts returns all the Notes, and MediaObjects related to a given conversation
// // these should be sorted chronologically
// func GetConversationPosts(c Conversation) []*Entity {

//   notes := db.query({
//     Type: "Note",
//     Conversation: c.ID,
//   })

//   // TODO: expand to include other media

//   // TODO: order logically (chronologically)

//   return notes
// }

// // GetConverationsForUser queries the database for all conversations that a user is a part of.
// // This includes conversations the user created
// func GetConversationsForUser(user User) ([]Conversation) {

//   convs := db.query({
//     Type: "Conversation",
//     Membership: {
//       author.ID: // any Perm.
//     }
//   })

//   return convs
// }

// // PostToConversation adds a note to a conversation
// // TODO: generalize to include other things to link in (papers, etc)
// func PostToConversation(author User, conv Conversation, noteText string) (Note, error) {
//   // validate author
//   // validate conv
//   // validate noteText

//   if !permHigher(conv.Participants[User.ID], "write") {
//     return nil, "no permission to post"
//   }

//   // make a new note, linked to author, linked to conversation, and with noteText.
//   n := newNote(author, conv, noteText)

//   // TODO: notifications to other participants

//   return n
// }

// func permHigher(a, b PermType) bool {
//   // check "read", "write", "share" matches.
// }
