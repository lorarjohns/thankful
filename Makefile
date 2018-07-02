build:
	npm run build

build-production:
	env PRODUCTION=true npm run build

dev:
	npm run dev

install:
	npm install

lint:
	npm run lint

lint-fix:
	npm run lint -- --fix

test:
	npm run test

typecheck:
	mypy scripts/

clean:
	git clean -n dist
	rm -v dist/**/*.{js,html} || true

package:
	cd dist/ && zip -r ../thankful.zip *

publish:
	make clean
	python3 scripts/set_version.py dist/manifest.json
	python3 scripts/set_version.py package.json
	make build-production
	make package
	# Use these to automatically publish
	# https://www.npmjs.com/package/chrome-webstore-upload-cli
	# https://www.npmjs.com/package/firefox-extension-deploy
	env MOZILLA_EXTENSION_ID='{b4bbcd8e-acc0-4044-b09b-1c15d0b66875}' \
		node scripts/publish-mozilla-addons.js
	# Doing it like this would expose keys, not acceptable
	#    webstore upload --source extension.zip --extension-id ${WEBSTORE_EXTENSION_ID} --client-id ${WEBSTORE_CLIENT_ID} --client-secret ${WEBSTORE_CLIENT_SECRET} --refresh-token ${REFRESH_TOKEN}
