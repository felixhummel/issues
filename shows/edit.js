function(doc, req) {  
  var ddoc = this;
  var Mustache = require("lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);

  var data = {
    scripts: {},
    issue: {}
  };
  if (!doc) {
  } else {
    data.doc = JSON.stringify(doc);
    return Mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
  }

}
