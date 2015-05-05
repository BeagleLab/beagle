/*global hello */

var el = document.getElementById('hello-google')
el.addEventListener('click', function () {
  hello('google').login().then(function () {
    alert("You're logged in!")
  })
}, false)

hello.init({
  google: '832850147593-mg2vg2j8j65t3djpsifme57pljgimbl9.apps.googleusercontent.com'
}, {redirect_uri: 'http://www.google.com/robots.txt'})

setInterval(function () {
  var gl = hello('google').getAuthResponse()
  console.log('gl', gl)
}, 3000)

// hello.on('auth.login', function(auth){

//   console.log('Auth', auth)

//   // Call user information, for the given network
//   hello( auth.network ).api( '/me' ).then( function(r){
//     // Inject it into the container
//     var label = document.getElementById( 'profile_' + auth.network );
//     if (!label){
//       label = document.createElement('div');
//       label.id = 'profile_' + auth.network;
//       document.getElementById('profile').appendChild(label);
//     }
//     label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
//   });
// });
