# Couchapp with Issues

couchapp with issues, i.e. a minimalistic [Spolsky style](http://www.joelonsoftware.com/articles/fog0000000029.html) issue tracker as a couchapp.

Get it
======
You need [CouchDB](http://couchdb.apache.org/) and the [couchapp command line tool](http://couchapp.org/page/installing). As root:

    apt-get install python-setuptools  # if you need easy_install
    easy_install pip  # if you do not have pip installed
    pip install couchapp

Clone this repository

    git clone git://github.com/felixhummel/issues.git
    cd issues

Run it
======
Start your local CouchDB and push this app (defaults to ``issues`` db)

    couchapp push

Try it
======
Follow those links to see it in action:

Sorted by date:
    http://localhost:5984/issues/_design/issues/_list/tabular/by_date
Sorted by date in a certain period of time:
    http://localhost:5984/issues/_design/issues/_list/tabular/by_date?startkey=%222010-11-16T14:51:00.000Z%22&endkey=%222010-11-19T18:00:00.000Z%22
Only those assigned to user1:
    http://localhost:5984/issues/_design/issues/_list/tabular/assigned_to?key=%22user1%22
Open issues:
    http://localhost:5984/issues/_design/issues/_list/tabular/status?key=%22open%22

