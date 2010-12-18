#!/bin/bash

echo "Deleting DB"
curl -X DELETE http://admin:admin@127.0.0.1:5984/issues

echo "Creating DB"
curl -X PUT http://admin:admin@127.0.0.1:5984/issues

curl -X PUT http://admin:admin@127.0.0.1:5984/issues/foo -d '{"text": "foo", "status": "open", "assigned_to": "user", "type":"issue"}'
curl -X PUT http://admin:admin@127.0.0.1:5984/issues/bar -d '{"text": "bar", "status": "open", "assigned_to": "user", "type":"issue"}'
curl -X PUT http://admin:admin@127.0.0.1:5984/issues/baz -d '{"text": "baz", "status": "open", "assigned_to": "user", "type":"issue"}'
