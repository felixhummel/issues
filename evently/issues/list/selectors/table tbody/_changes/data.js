function(r) {
  var v = r.value;
  return {
    title: v.title,
    created_at: $.prettyDate2(v.created_at),
    id: v._id
  };
}
