default: help
new:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))

build-entry:
	node build/bin/build-entry.js

deploy:
	./deploy.sh
