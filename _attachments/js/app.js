$.couch.app(function(app) {  
  // those lines give us a user object in $$("#profile").profile
  $("#profile").evently("profile", app);
  $("#account").evently("account", app);
  $.evently.connect($("#account"), $("#profile"), ["loggedIn", "loggedOut"]);
});
