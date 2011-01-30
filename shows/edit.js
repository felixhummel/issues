function(doc, req) {
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var root = { root: path.asset() };

  var data = {
    styles: root,
    scripts: root,
    issue: {}
  };
  if (doc) {
    // remove _revisions - we don't need them and would get update conflicts
    doc._revisions && delete doc._revisions;
    // simply stringify the whole document
    data.doc = JSON.stringify(doc);
    return mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
  } else {
    data = {
      id: req.id
    }
    return mustache.to_html(ddoc.templates.err404, data);
  }
}

