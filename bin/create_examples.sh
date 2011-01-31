#!/bin/bash

curl -X PUT http://admin:admin@127.0.0.1:5984/issues/example1 -d '{"text": "open/user1",
                                                                   "status": "open",
                                                                   "assigned_to": "user1",
                                                                   "type":"issue",
                                                                   "created_at": "2010-11-18T14:51:00.000Z"
                                                                  }'
curl -X PUT http://admin:admin@127.0.0.1:5984/issues/example2 -d '{"text": "closed/user1",
                                                                   "status": "closed",
                                                                   "assigned_to": "user1",
                                                                   "type":"issue",
                                                                   "created_at": "2010-11-19T14:51:00.000Z"
                                                             }'
curl -X PUT http://admin:admin@127.0.0.1:5984/issues/example3 -d '{"text": "open/user2",
                                                                   "status": "open",
                                                                   "assigned_to": "user2",
                                                                   "type":"issue",
                                                                   "created_at": "2010-11-20T14:51:00.000Z"
                                                                  }'
