$.couch.app(function(app) {  
  $("#content").evently("issues", app);
  $.pathbinder.onChange(function(path) {
    $("#current-path").text(path);
  });
  $.pathbinder.begin("/list");
});
