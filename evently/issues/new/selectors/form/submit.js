function() {
  var form = $(this);
  var fdoc = form.serializeObject();
  fdoc.created_at = new Date();
  fdoc.profile = $$("#profile").profile;
  fdoc.type = 'issue';
  fdoc.status = 'open';
  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
      form[0].reset();
    }
  });
  $.pathbinder.go("/");
  return false;
}
