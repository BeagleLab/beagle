// Everything is an "entity". it has an ID.
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
//   Email  string // email associated with account
// }

var account = {
  "_id": "hash1234",
  "name": "Richard Feynman",
  "avatar": "url",
  "email": "richard.feynamn@caltech.com"
}

// User is an individual user, a Person.
// type User struct {
//   Account // it is an account.
//   OAuthTokens []string
// }

var user = {
  "account": "hash1234",
  "oauthTokens": [
    "lksjfsa;djl",
    "sdlkfjlsjss"
  ]
}

// Group is a group of people, an organization.
// type Group struct {
//   Account // it is an account.
//   Owner   []AccountID
//   Members Membership
// }

// TODO Should members be IDs?
var group = {
  "_id": "hash5678",
  "owner": "hash1234",
  "members": [
    "Richard Feynman",
    "Noam Chompsky"
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

var conversation = {
  "_id": "1234hash",
  "title": "Surely you're joking!",
  "owner": [
    "hash1234"
  ],
  "participants": [
    "Richard Feynman",
    "Noam Chompsky"
  ]
}


// A Note is a piece of text related to a conversation.
// type Note struct {
//   ID Entity

//   Text string
//   Owner []AccountID
//   Participants Membership
// }

var note = {
  "_id": "hash4567",
  "text": "Ever since I was little, I have always loved the sound of my own voice.",
  "owner": [
    "Richard Feynman"
  ],
  "participants": [
    "Richard Feynman",
    "Noam Chompsky"
  ]
}


// Type of permission.
// type PermType int

// var (
//   ReadPerm PermType = iota
//   WritePerm
//   SharePerm
// )

// This is read
var permission = 1

// Membership is a group of users that belong to an entity,
// with associated permissions. For example, the participants
// of a conversation, or the members of a group.
// type Membership map[AccountID]Permission

// these are like tables
// var (
//   EntityPermissions map[AccountID][EntityID]PermType
// )


module.exports.account = exports.account = account
module.exports.user = exports.user = user
module.exports.group = exports.group = group
module.exports.conversation = exports.conversation = conversation
module.exports.note = exports.note = note
module.exports.permission = exports.permission = permission
