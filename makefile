SITE_NAME: Bernadetta – Webfejlesztés
SITE_URL: https://probaprojekt.vercel.app
SITE_DESCRIPTION: Webfejlesztő portfóliója
SITE_KEYWORDS: webfejlesztés, portfólió, frontend, backend, fullstack, projekt, HTML, CSS, JavaScript, React, Node.js
EMAIL: mailto:gob0504@gmail.com
PHONE: ""

FACEBOOK:  https://www.facebook.com/garajszkiozvald
INSTAGRAM: https://www.instagram.com/garajszkiozvald/
LINKEDIN:  ""
GITHUB:    https://github.com/butus77/probaprojekt
X:         https://x.com/Bernade84920252
YOUTUBE:   ""


.PHONY: dev build start optimize check deploy

dev:
	npm run dev

build:
	npm run build

start:
	npm start

optimize:
	./optimize-photos.sh

check:
	npm run vercel-build

deploy:
	git add .
	git commit -m "chore: deploy"
	git push origin main
