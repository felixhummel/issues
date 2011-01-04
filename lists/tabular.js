function(head, req) {
  ddoc = this;
  var Mustache = require("lib/mustache");
  var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);

  var data = {
    issues: [],
    link2all: path.list('tabular', 'by_date', { descending: true }),
    link2open: path.list('tabular', 'status', {
      descending: true,
      startkey: ['open',{}],
      endkey: ['open']
    }),
    link2new: path.show('new')
  };
  provides("html", function() {
    start({
      "headers": {
        "Content-Type": "text/html"
      }
    });
    while(row = getRow()) {
      var issue = row.value;
      issue.edit_link = path.show('edit', issue._id);
      data.issues.push(issue);
    }
    return Mustache.to_html(ddoc.templates.tabular, data);
  });
}
