test:
	grunt test

init-testing:
	git submodule add https://github.com/pivotal/jasmine.git spec/vendor/jasmine
	git submodule init
	npm install

update-testing:
	git submodule update
	npm install