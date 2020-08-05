.PHONY: init

REGISTRY?=registry
IMAGE?=${REGISTRY}/data-gui
TEST_IMAGE?=${REGISTRY}/data-gui-test
TAG?=dev
NORMALIZE_TAG=$(shell echo ${TAG} | sed -e "s|/|-|g")

.env:
	@sed -e "s|sometning||g" \
		.env.dist > .env

init: .env
	docker-compose up -d --force-recreate

docker-build:
	docker build --build-arg FROM=node:12-alpine -t ${IMAGE}:${NORMALIZE_TAG} .
	docker push ${IMAGE}:${NORMALIZE_TAG}

docker-clear:
	docker image rm ${IMAGE}:${NORMALIZE_TAG} || true

docker-build-test:
	docker pull ${TEST_IMAGE}:${NORMALIZE_TAG} || true
	docker build -f Dockerfile.test --build-arg FROM=node:12 -t ${TEST_IMAGE}:${NORMALIZE_TAG} .
	docker push ${TEST_IMAGE}:${NORMALIZE_TAG}

docker-test: docker-build-test
	docker run --rm --name=app-ui-test${ID} -v $$(pwd):/var/app -w /var/app ${TEST_IMAGE}:${NORMALIZE_TAG} sh -c 'npm i && npm run lint && npm run test-ci'

docker-test-clear:
	docker image rm ${TEST_IMAGE}:${NORMALIZE_TAG} || true

test:
	npm install
	npm run lint
	npm run test-ci
