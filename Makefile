install-deps:
	npm ci

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8
