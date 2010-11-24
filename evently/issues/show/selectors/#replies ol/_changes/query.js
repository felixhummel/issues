function(e, params) {
  var id = $("#id").text();
  return {
    view : "replies",
    key : id,
    type : "newRows"
  };
}
