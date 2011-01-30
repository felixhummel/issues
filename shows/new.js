function(doc, req) {  
  var ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  // create empty objects for partials
  var root = { root: path.asset() };
  var data = {
    styles: root,
    scripts: root,
    css: root
  };
  return mustache.to_html(ddoc.templates.new, data, ddoc.templates.partials);
}
