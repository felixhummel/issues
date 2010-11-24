$.couch.app(function(app) {  
  $("#profile").evently("profile", app);
  $("#account").evently("account", app);
  $.evently.connect($("#account"), $("#profile"), ["loggedIn", "loggedOut"]);
});
