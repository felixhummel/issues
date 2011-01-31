AUTOPUSH_DELAY = 1 # seconds

default: autopush

autopush: push
	couchapp autopush --update-delay $(AUTOPUSH_DELAY) . default

push:
	couchapp push . default

pub:
	couchapp push . pub

example:
	./bin/create_examples.sh

clean:
	echo "Deleting DB"
	curl -X DELETE http://admin:admin@127.0.0.1:5984/issues
	echo "Creating DB"
	curl -X PUT http://admin:admin@127.0.0.1:5984/issues

first_run: clean example push
