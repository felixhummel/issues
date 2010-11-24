$.couch.app(function(app) {  
  $("#content").evently("issues", app);
  $("#account").evently("account", app);
  $.pathbinder.onChange(function(path) {
    $("#current-path").text(path);
  });
  $.pathbinder.begin("/");
});
