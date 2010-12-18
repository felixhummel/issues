function(r) {
  var doc = r.value;
  return {
    text: doc.text,
    created_at: $.prettyDate2(doc.created_at),
    id: doc._id,
    status: doc.status
  };
}
