default: help
new:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS)) \
	node build/bin/build-entry.js

build-entry:
	node build/bin/build-entry.js

deploy:
	./deploy.sh
