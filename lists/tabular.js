function(head, req) {
  ddoc = this;
  var mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
  var root = { root: path.asset() };

  var data = {
    styles: root,
    scripts: root,
    issues: [],
    link2all: path.list('tabular', 'by_date', { descending: true }),
    link2open: path.list('tabular', 'status', {
      descending: true,
      startkey: ['open',{}],
      endkey: ['open']
    }),
    link2closed: path.list('tabular', 'status', {
      descending: true,
      startkey: ['closed',{}],
      endkey: ['closed']
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
    return mustache.to_html(ddoc.templates.tabular, data, ddoc.templates.partials);
  });
}
