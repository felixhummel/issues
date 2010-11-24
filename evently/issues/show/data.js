function(resp, cb, params) {
  var doc = resp.rows[0].value;
  doc = $.extend(doc, {
    author: doc.profile && doc.profile.nickname || ""
  });
  return doc;
}
