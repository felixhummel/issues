AUTOPUSH_DELAY = 1 # seconds

default: autopush

autopush: push
	couchapp autopush --update-delay $(AUTOPUSH_DELAY) . default

push:
	couchapp push . default

pub:
	couchapp push . pub

