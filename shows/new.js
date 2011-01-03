function(doc, req) {  
  var ddoc = this;
  var Mustache = require("lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);

  // create empty objects for partials
  var data = {
    scripts: {}
  };
  return Mustache.to_html(ddoc.templates.new, data, ddoc.templates.partials);
}
