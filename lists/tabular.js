function(head, req) {
  ddoc = this;
  var Mustache = require("lib/mustache");
  var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);

  var data = {
    issues: [],
    all: path.list('tabular', 'by_date', { descending: true }),
    open: path.list('tabular', 'status', {
      descending: true,
      startkey: ['open',{}],
      endkey: ['open']
    })
  };
  provides("html", function() {
    start({
      "headers": {
        "Content-Type": "text/html"
      }
    });
    while(row = getRow()) {
      data.issues.push(row.value);
    }
    return Mustache.to_html(ddoc.templates.tabular, data);
  });
}
