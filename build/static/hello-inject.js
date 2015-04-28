var el = document.getElementById('hello-google')
el.addEventListener('click', hello('google').login(), false)

hello.init({
  google: '832850147593-mg2vg2j8j65t3djpsifme57pljgimbl9.apps.googleusercontent.com'
}, { redirect_uri: 'chrome-extension://cmanihjhjdpbdpdgjhbndmpicmkgfdga/content/web/viewer.html?file=http%3A%2F%2Fwww.pnas.org%2Fcontent%2F112%2F5%2F1265.full.pdf' })

hello.on('auth.login', function(auth){

  // Call user information, for the given network
  hello( auth.network ).api( '/me' ).then( function(r){
    // Inject it into the container
    var label = document.getElementById( 'profile_' + auth.network );
    if (!label){
      label = document.createElement('div');
      label.id = 'profile_' + auth.network;
      document.getElementById('profile').appendChild(label);
    }
    label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
  });
});
