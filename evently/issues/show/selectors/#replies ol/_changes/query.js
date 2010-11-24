function(e, params) {
  var id = $("#id").text();
  return {
    view : "replies",
    startkey : [id, {}],
    endkey : [id],
    descending: true,
    type : "newRows"
  };
}
