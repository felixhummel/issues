function(head, req) {
  ddoc = this;
  var Mustache = require("lib/mustache");
  var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);

  var issues = [];
  provides("html", function() {
    start({
      "headers": {
        "Content-Type": "text/html"
      }
    });
    while(row = getRow()) {
      issues.push(row.value);
    }
    return Mustache.to_html(ddoc.templates.tabular, {issues: issues});
  });
}
