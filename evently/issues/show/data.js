function(resp, cb, params) {
  var doc = resp.rows[0].value;
  doc.created_at = $.prettyDate(doc.created_at);
  doc = $.extend(doc, {
    author: doc.profile && doc.profile.nickname || ""
  });
  return doc;
}
