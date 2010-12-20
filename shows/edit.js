function(doc, req) {  
  var ddoc = this;
  var Mustache = require("lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);

  var data = {
    scripts: {},
    created_at: doc.created_at,
    status: doc.status,
    id: doc._id,
    text: doc.text,
    rev: doc._rev.split('-')[0],
    statuses:  [
      { option: 'open' },
      { option: 'closed' }
    ],
    doc: JSON.stringify(doc)
  };

  return Mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
}
