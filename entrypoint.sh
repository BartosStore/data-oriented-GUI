#!/bin/sh

if [[ -z "$API_URL" || -z "$KEYCLOAK_URL" ]]; then
  echo "ERROR: Some ENV variable(s) not defined! See entrypoint.sh"
  exit 1
fi

sed " \
    s|%api-url-placeholder%|${API_URL}|g; \
    s|%keycloak-url-placeholder%|${KEYCLOAK_URL}|g; \
  " -i /var/www/html/*.js

exec "$@"
