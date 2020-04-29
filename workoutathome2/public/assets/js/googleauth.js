var currUser;

function start() {
    window.gapi.auth2.init({
      client_id: "27295779158-sdqaicgo9l8qmlo8mr0f42um84ve8gkd.apps.googleusercontent.com",
    //   client_id: "774842210033-lb3hs94vv7mtefrsret85gil9lq9j4fs.apps.googleusercontent.com"
    }).then(() => {
      console.log('signed in', window.gapi.auth2.getAuthInstance().isSignedIn.get());
      console.log('current user ', window.gapi.auth2.getAuthInstance().currentUser.get());
      var signIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
      currUser = window.gapi.auth2.getAuthInstance().currentUser.get()
      window.gapi.auth2.getAuthInstance().isSignedIn.listen((signedIn) => {

      });

      window.gapi.auth2.getAuthInstance().currentUser.listen((user) => {
        console.log(user);
        currUser = user;
      });
    });
}
  function signInCallback(authResult) {
    if (authResult["code"]) {
      const userName = window.gapi.auth2.getAuthInstance().currentUser
        .get()
        .getBasicProfile()
        .getName();

      const userId = window.gapi.auth2.getAuthInstance().currentUser.get().getId();
      const userEmail = window.gapi.auth2.getAuthInstance().currentUser
        .get()
        .getBasicProfile()
        .getEmail()

      const userObj = {
        userId,
        userName,
        userEmail
      }

      $.post('/user', userObj, function (response) {
        console.log(JSON.parse(response))
      }, 'application/json')
      window.open("./add_video.html", '_blank');

    }
  }

  function getGoogleUser(){
    return window.gapi.auth2.getAuthInstance().currentUser.get()
  }
$(document).ready(function(){
  start();
  $('#signinButton').click(function(){
    if(!window.gapi.auth2.getAuthInstance()) start();
    else{
      console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
      if(window.gapi.auth2.getAuthInstance().isSignedIn.get()){
        window.open("./add_video.html", '_blank');
      }else{
        window.gapi.auth2.getAuthInstance().grantOfflineAccess().then(signInCallback)

      }
    }
  })
})