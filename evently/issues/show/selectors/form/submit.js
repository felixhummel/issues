function() {
  var form = $(this);
  var formdata = form.serializeObject();
  var done_handler = function() {
    form[0].reset();
    $.log('done');
  };

  // save new reply
  if (formdata.reply != "") {
    var doc = {
      reply : formdata.reply,
      created_at : new Date(),
      profile : $$("#profile").profile,
      type : 'reply',
      issue : $('#id').text()
    };
    $$(this).app.db.saveDoc(doc, {
      success: done_handler
    });
  }

  // update status on doc
  var current = $$("#content").current;
  if (current.status != formdata.status) {
    current.status = formdata.status;
    $$(this).app.db.saveDoc(current, {
      success: function() {
        form[0].reset();
        $("#status").text(current.status);
      }
    });
  }

  return false;
}
