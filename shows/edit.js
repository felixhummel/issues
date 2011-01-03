function(doc, req) {
  var ddoc = this;
  var Mustache = require("lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);

  // create empty objects for partials
  var data = {
    scripts: {},
    issue: {}
  };
  if (doc) {
    // remove _revisions - we don't need them and would get update conflicts
    doc._revisions && delete doc._revisions;
    // simply stringify the whole document
    data.doc = JSON.stringify(doc);
    return Mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
  } else {
    data = {
      id: req.id
    }
    return Mustache.to_html(ddoc.templates.err404, data);
  }
}

